import {
  Firestore,
  getFirestore,
  collection,
  getDocs,
  CollectionReference,
  DocumentData,
  setDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import firebaseApp from "../firebaseConfig";
import { Game } from "../utils/Game";
import PlayersService from "./playersService";
import StatsService from "./statsService";

class GamesService {
  private gamesCollection: CollectionReference<DocumentData>;
  private playersService: PlayersService;
  private statsService: StatsService;
  private statsCollection: CollectionReference<DocumentData>;
  private static _instance: GamesService;

  constructor() {
    const db = getFirestore(firebaseApp);
    this.gamesCollection = collection(db, "games");
    this.statsCollection = collection(db, "stats");
    this.playersService = PlayersService.instance;
    this.statsService = StatsService.instance;
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new GamesService();
    }
    return this._instance;
  }

  private async postGame(game: Game) {
    let autoId = doc(this.gamesCollection).id;
    game.id = autoId;
    await setDoc(
      doc(getFirestore(firebaseApp), "games", autoId),
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
    games.sort((a, b) => (a.date > b.date ? -1 : 1));
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

  private async getGameById(id: string) {
    const gameDoc = doc(getFirestore(firebaseApp), "games", id.toString());
    const gameSnapshot = await getDocs(this.gamesCollection);
    const game = gameSnapshot.docs.map((doc) => doc.data());
    return game[0] as Game;
  }

  public async addGame(game: Game) {
    return await this.postGame(game);
  }

  public async deleteGame(id: string) {
    const gameDoc = doc(getFirestore(firebaseApp), "games", id.toString());
    const game = await this.getGameById(id);
    await this.deleteGameStats(game);
    await deleteDoc(gameDoc);
  }

  public async deleteGameStats(game: Game) {
    const statsSnapshot = await getDocs(this.statsCollection);
    const stats = statsSnapshot.docs.map((doc) => doc.data());
    const allGoals = stats[0].allGoals - game.score1 - game.score2;
    const allGames = stats[0].allGames - 1;

    const statsDoc = doc(getFirestore(firebaseApp), "stats", "1");
    await updateDoc(statsDoc, {
      allGoals: allGoals,
      allGames: allGames,
    });
  }
}

export default GamesService;
