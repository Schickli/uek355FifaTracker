import { Firestore, getFirestore, collection, getDocs, CollectionReference, DocumentData } from 'firebase/firestore';

import firebaseApp from '../firebaseConfig'
import { Player } from '../utils/player';

class GamesService {
  private playersCollection: CollectionReference<DocumentData>;

  constructor() {
    const db = getFirestore(firebaseApp);
    this.playersCollection = collection(db, 'games');
  }

  public async getGames() {
    const playersSnapshot = await getDocs(this.playersCollection);
    const players = playersSnapshot.docs.map((doc) => doc.data());
    return players as Player[];
  }
}

export default GamesService;