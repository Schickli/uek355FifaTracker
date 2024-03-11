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

  constructor() {
    const db = getFirestore(firebaseApp);
    this.playersCollection = collection(db, "players");
    this.gamesCollection = collection(db, "games");
  }

  public async getStats() {
    const playersSnapshot = await getDocs(this.playersCollection);
    const players = playersSnapshot.docs.map((doc) => doc.data());

    return this.calculateStats(players as Player[]) as AllStatistics;
  }

  private calculateStats(players: Player[]) {
    let allGames = 0;
    let allGoals = 0;
    let mostWinsPlayer = "";
    let averageGoalsPerGame = 0;

    for (const player of players) {
      // find the player with the most wins
      if (player.wins || 0 > (players.find((p) => p.full_name === mostWinsPlayer)?.wins || 0)) {
        mostWinsPlayer = player.full_name;
      }
    }

    return {
      allGames,
      allGoals,
      mostWinsPlayer,
      averageGoalsPerGame,
    } as AllStatistics;
  }
}

export default StatsService;
