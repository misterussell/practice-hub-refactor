import { observable } from 'mobx';

export default class Cell {
  @observable state = false;

  getNextCellState(allCells) {
    const lowLimit = this.x === this.toroidalLimits[0] ? 1 : this.x + 1;
    const highLimit = this.x === 1 ? this.toroidalLimits[0] : this.x - 1;
    const rightLimit = this.y === this.toroidalLimits[1] ? 1 : this.y + 1;
    const leftLimit = this.y === 1 ? this.toroidalLimits[1] : this.y - 1;

    const blockSum = [
        [highLimit, leftLimit], [highLimit, this.y], [highLimit, rightLimit],
        [this.x, leftLimit], [this.x, this.y], [this.x, rightLimit],
        [lowLimit, leftLimit], [lowLimit, this.y], [lowLimit, rightLimit]
    ].map(xyPosition => allCells[(xyPosition[0] * 15486047) + (xyPosition[1] * 15487429)].cellState)
     .reduce((a, b) => a + b);

    const sum3 = blockSum === 3;
    const sum4 = blockSum === 4;
    const nextState = sum3 ? 1 : sum4 ? this.cellState : 0;

    return Object.freeze({ ...this, nextState });
  }
}
