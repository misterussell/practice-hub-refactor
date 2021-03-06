import Gameboard from '../models/Gameboard';
import ObjectGameboard from '../models/ObjectGameboard';
import Gameplay from '../models/Gameplay';
import GridUI from '../models/GridUI';

export default class RootStore {
  constructor() {
    this.objectGameboard = new ObjectGameboard(this);
    this.gameboard = new Gameboard(this);
    this.gameplay = new Gameplay(this);
    this.gridUI = new GridUI(this);
  }
}
