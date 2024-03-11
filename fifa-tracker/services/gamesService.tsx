import { Firestore, getFirestore, collection, getDocs, CollectionReference, DocumentData, setDoc, doc } from 'firebase/firestore';

import firebaseApp from '../firebaseConfig'
import { Player } from '../utils/Player';
import { Game } from '../utils/Game';
import PlayersService from './playersService';

class GamesService {
  private gamesCollection: CollectionReference<DocumentData>;
  private playersService: PlayersService;

  constructor() {
    const db = getFirestore(firebaseApp);
    this.gamesCollection = collection(db, 'games');
    this.playersService = new PlayersService();
  }

  private async uniqueID() {
    const gamesSnapshot = await getDocs(this.gamesCollection);
    const games = gamesSnapshot.docs.map((doc) => doc.data());
    return games.length + 1;
  }

  private async postGame(game: Game) {
    await setDoc(doc(getFirestore(firebaseApp), "games", game.id?.toString() as string), game);
    
    game.members1.forEach(player => {
      if (game.score1 > game.score2) {
        player.wins += 1;
      } else if (game.score1 < game.score2) {
        player.losses += 1;
      } else {
        player.draws += 1;
      }
    });

    game.members2.forEach(player => {
      if (game.score2 > game.score1) {
        player.wins += 1;
      } else if (game.score2 < game.score1) {
        player.losses += 1;
      } else {
        player.draws += 1;
      }
    });
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
    return await this.postGame(game);
  }
  
}

export default GamesService;