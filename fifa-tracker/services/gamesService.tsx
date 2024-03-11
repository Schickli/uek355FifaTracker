import {
  Firestore,
  getFirestore,
  collection,
  getDocs,
  CollectionReference,
  DocumentData,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import firebaseApp from "../firebaseConfig";
import { Player } from "../utils/Player";
import { Game } from "../utils/Game";
import PlayersService from "./playersService";

class GamesService {
  private gamesCollection: CollectionReference<DocumentData>;
  private playersService: PlayersService;
  private statsCollection: CollectionReference<DocumentData>;

  constructor() {
    const db = getFirestore(firebaseApp);
    this.gamesCollection = collection(db, "games");
    this.statsCollection = collection(db, "stats");
    this.playersService = new PlayersService();
  }

  private async uniqueID() {
    const gamesSnapshot = await getDocs(this.gamesCollection);
    const games = gamesSnapshot.docs.map((doc) => doc.data());
    return games.length + 1;
  }

  private async postGame(game: Game) {
    await setDoc(
      doc(getFirestore(firebaseApp), "games", game.id?.toString() as string),
      game
    );

    game.members1.forEach((player) => {
      if (game.score1 > game.score2) {
        player.wins += 1;
      } else if (game.score1 < game.score2) {
        player.losses += 1;
      } else {
        player.draws += 1;
      }
    });

    game.members2.forEach((player) => {
      if (game.score2 > game.score1) {
        player.wins += 1;
      } else if (game.score2 < game.score1) {
        player.losses += 1;
      } else {
        player.draws += 1;
      }
    });

    this.updateStats(game);
  }

  public async getGames() {
    const gamesSnapshot = await getDocs(this.gamesCollection);
    const games = gamesSnapshot.docs.map((doc) => doc.data());
    return games as Game[];
  }

  private async updateStats(game: Game) {
    const statsSnapshot = await getDocs(this.statsCollection);
    const stats = statsSnapshot.docs.map((doc) => doc.data());
    const allGoals = stats[0].allGoals + game.score1 + game.score2;
    const allGames = stats[0].allGames + 1;

    if (stats.length === 0) {
      await setDoc(doc(getFirestore(firebaseApp), "stats", "1"), {
        allGoals: allGoals,
        allGames: allGames,
      });
    } else {
      const statsDoc = doc(getFirestore(firebaseApp), "stats", "1");
      await updateDoc(statsDoc, {
        allGoals: allGoals,
        allGames: allGames,
      });
    }
  }

  public async addGame(game: Game) {
    game.id = await this.uniqueID();
    return await this.postGame(game);
  }
}

export default GamesService;
