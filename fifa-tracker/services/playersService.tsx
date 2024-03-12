import {
  Firestore,
  getFirestore,
  collection,
  getDocs,
  CollectionReference,
  DocumentData,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  where,
  deleteDoc,
  LogLevel,
  setLogLevel,
} from "firebase/firestore";

import firebaseApp from "../firebaseConfig";
import { Player } from "../utils/Player";

class PlayersService {
  private playersCollection: CollectionReference<DocumentData>;
  private static _instance: PlayersService;

  constructor() {
    const db = getFirestore(firebaseApp);
    this.playersCollection = collection(db, "players");
    // setLogLevel("warn");
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new PlayersService();
    }
    return this._instance;
  }

  private async postPlayer(player: Player) {
    let autoId = doc(this.playersCollection).id;
    player.id = autoId;
    return await setDoc(
      doc(getFirestore(firebaseApp), "players", autoId),
      player
    );
  }

  public async getPlayers() {
    const playersSnapshot = await getDocs(this.playersCollection);
    const players = playersSnapshot.docs.map((doc) => doc.data());
    return players as Player[];
  }

  public async addPlayer(player: Player) {
    return await this.postPlayer(player);
  }

  public async updatePlayerResults(
    result: "win" | "loss" | "draw",
    id: number
  ) {
    const playerRef = doc(getFirestore(firebaseApp), "players", id.toString());
    try {
      return updateDoc(playerRef, {
        wins: result === "win" ? +1 : 0,
        losses: result === "loss" ? +1 : 0,
        draws: result === "draw" ? +1 : 0,
      });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  public async getPlayerById(id: string) {
    const playerRef = doc(getFirestore(firebaseApp), "players", id.toString());
    return getDoc(playerRef);
  }

  public async deletePlayer(id: string) {
    const playerRef = doc(getFirestore(firebaseApp), "players", id.toString());
    return deleteDoc(playerRef);
  }
}

export default PlayersService;
