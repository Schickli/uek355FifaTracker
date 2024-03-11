import { Firestore, getFirestore, collection, getDocs, CollectionReference, DocumentData, setDoc, doc } from 'firebase/firestore';

import firebaseApp from '../firebaseConfig'
import { Player } from '../utils/Player';
import { Game } from '../utils/Game';

class GamesService {
  private gamesCollection: CollectionReference<DocumentData>;

  constructor() {
    const db = getFirestore(firebaseApp);
    this.gamesCollection = collection(db, 'games');
  }

  private async uniqueID() {
    const gamesSnapshot = await getDocs(this.gamesCollection);
    const games = gamesSnapshot.docs.map((doc) => doc.data());
    return games.length + 1;
  }

  private async postGame(game: Game) {
    await setDoc(doc(getFirestore(firebaseApp), "games", game.id?.toString() as string), game);
  }

  public async getGames() {
    const gamesSnapshot = await getDocs(this.gamesCollection);
    const games = gamesSnapshot.docs.map((doc) => doc.data());
    return games as Game[];
  }

  public async addGame(game: Game) {
    console.log("Adding game");
    console.log(game);
    game.id = await this.uniqueID();
    await this.postGame(game);
  }
  
}

export default GamesService;