import Gameboard from '../models/Gameboard';
import GridUI from '../models/GridUI';

export default class RootStore {
  constructor() {
    this.gameboard = new Gameboard(this);
    this.gridUI = new GridUI(this);
  }
}
