import { observable, computed } from 'mobx';

class GridUI {
  @observable minGridSize: null;
  @observable userGridSelection: null;
  @observable gridSize = null;

  constructor() {
    this.minGridSize = 5;
    this.userGridSelection = 0;
    this.gridSize = this.minGridSize + this.userGridSelection;
  }

  @computed get gridSpecs() {
    return this.gridSize;
  }

  growGrid(val) {
    this.userGridSelection += val;
    this.gridSize += val;
  }

}

export default GridUI;
