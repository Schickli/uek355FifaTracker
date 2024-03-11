import {
  getFirestore,
  collection,
  getDocs,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";

import firebaseApp from "../firebaseConfig";
import { Player } from "../utils/Player";
import { AllStatistics } from "../utils/AllStatistics";

class StatsService {
  private playersCollection: CollectionReference<DocumentData>;
  private gamesCollection: CollectionReference<DocumentData>;
  private statsCollection: CollectionReference<DocumentData>;

  constructor() {
    const db = getFirestore(firebaseApp);
    this.playersCollection = collection(db, "players");
    this.gamesCollection = collection(db, "games");
    this.statsCollection = collection(db, "stats");
  }

  public async getStats() {
    const playersSnapshot = await getDocs(this.playersCollection);
    const players = playersSnapshot.docs.map((doc) => doc.data());
    const mostWinsPlayer = this.calculateMostWinsPlayer(players as Player[]);

    const statsSnapshot = await getDocs(this.statsCollection);
    const stats = statsSnapshot.docs.map((doc) => doc.data());

    return {
      allGoals: stats[0].allGoals,
      averageGoalsPerGame: stats[0].allGoals / stats[0].allGames || 0,
      mostWinsPlayer: mostWinsPlayer,
      allGames: stats[0].allGames,
    } as AllStatistics;
  }

  private calculateMostWinsPlayer(players: Player[]) {
    if (players.length != 0) {
      let mostWinsPlayer = players[0] as Player;
      for (const player of players) {
        if (player.wins > mostWinsPlayer.wins) {
          mostWinsPlayer = player;
        }
      }
      return mostWinsPlayer.full_name;
    } else {
      let mostWinsPlayer = "";
      return mostWinsPlayer;
    }
  }
}

export default StatsService;
