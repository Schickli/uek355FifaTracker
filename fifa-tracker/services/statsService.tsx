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
      averageGoalsPerGame: stats[0].allGames / stats[0].allGoals || 0,
      mostWinsPlayer: mostWinsPlayer,
      allGames: stats[0].allGames,
    } as AllStatistics;
  }

  private calculateMostWinsPlayer(players: Player[]) {
    let mostWinsPlayer = "";

    for (const player of players) {
      // find the player with the most wins
      if (
        player.wins ||
        0 > (players.find((p) => p.full_name === mostWinsPlayer)?.wins || 0)
      ) {
        mostWinsPlayer = player.full_name;
      }
    }

    return mostWinsPlayer;
  }
}

export default StatsService;
