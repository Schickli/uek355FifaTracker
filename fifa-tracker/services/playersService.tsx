import { Firestore, getFirestore, collection, getDocs, CollectionReference, DocumentData } from 'firebase/firestore';

import firebaseApp from '../firebaseConfig'
import { Player } from '../utils/player';

class PlayersService {
  private playersCollection: CollectionReference<DocumentData>;

  constructor() {
    const db = getFirestore(firebaseApp);
    this.playersCollection = collection(db, 'players');
  }

  public async getPlayers() {
    const playersSnapshot = await getDocs(this.playersCollection);
    const players = playersSnapshot.docs.map((doc) => doc.data());
    return players as Player[];
  }
}

export default PlayersService;