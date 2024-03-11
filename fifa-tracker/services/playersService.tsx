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
} from "firebase/firestore";

import firebaseApp from "../firebaseConfig";
import { Player } from "../utils/Player";

class PlayersService {
  private playersCollection: CollectionReference<DocumentData>;

  constructor() {
    const db = getFirestore(firebaseApp);
    this.playersCollection = collection(db, "players");
  }

  private async uniqueID() {
    const playersSnapshot = await getDocs(this.playersCollection);
    const players = playersSnapshot.docs.map((doc) => doc.data());
    return players.length + 1;
  }

  private async postPlayer(player: Player) {
    return await setDoc(
      doc(
        getFirestore(firebaseApp),
        "players",
        player.id?.toString() as string
      ),
      player
    );
  }

  public async getPlayers() {
    const playersSnapshot = await getDocs(this.playersCollection);
    const players = playersSnapshot.docs.map((doc) => doc.data());
    return players as Player[];
  }

  public async addPlayer(player: Player) {
    player.id = await this.uniqueID();
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

  public async getPlayerById(id: number) {
    const playerRef = doc(getFirestore(firebaseApp), "players", id.toString());
    return getDoc(playerRef);
  }

  public async deletePlayer(id: number) {
    const playerRef = doc(getFirestore(firebaseApp), "players", id.toString());
    return deleteDoc(playerRef);
  }
}

export default PlayersService;
