import { Firestore, getFirestore, collection, getDocs, CollectionReference, DocumentData, setDoc, doc } from 'firebase/firestore';

import firebaseApp from '../firebaseConfig'
import { Player } from '../utils/Player';

class PlayersService {
  private playersCollection: CollectionReference<DocumentData>;

  constructor() {
    const db = getFirestore(firebaseApp);
    this.playersCollection = collection(db, 'players');
  }

  private async uniqueID() {
    const playersSnapshot = await getDocs(this.playersCollection);
    const players = playersSnapshot.docs.map((doc) => doc.data());
    return players.length + 1;
  }

  private async postPlayer(player: Player) {
    await setDoc(doc(getFirestore(firebaseApp), "players", player.id?.toString() as string), player);
  }

  public async getPlayers() {
    const playersSnapshot = await getDocs(this.playersCollection);
    const players = playersSnapshot.docs.map((doc) => doc.data());
    return players as Player[];
  }

  public async addPlayer(player: Player) {
    player.id = await this.uniqueID();
    await this.postPlayer(player);
  }
}

export default PlayersService;