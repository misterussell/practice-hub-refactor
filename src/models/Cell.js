export default function Cell(x, y, cellState, toroidalLimits, arrayPosition) {
  const cellHash = (x * 15486047) + (y * 15487429);

  function getNextCellState(allCells) {
    const lowLimit = this.x === this.toroidalLimits[0] ? 1 : this.x + 1;
    const highLimit = this.x === 1 ? this.toroidalLimits[0] : this.x - 1;
    const rightLimit = this.y === this.toroidalLimits[1] ? 1 : this.y + 1;
    const leftLimit = this.y === 1 ? this.toroidalLimits[1] : this.y - 1;

    const blockSum = [
        [highLimit, leftLimit], [highLimit, this.y], [highLimit, rightLimit],
        [this.x, leftLimit], [this.x, this.y], [this.x, rightLimit],
        [lowLimit, leftLimit], [lowLimit, this.y], [lowLimit, rightLimit],
    ].map(xyPosition => allCells[(xyPosition[0] * 15486047) + (xyPosition[1] * 15487429)].cellState)
     .reduce((a, b) => a + b);

    let nextState;

    if (blockSum === 3) {
      nextState = 1;
    } else if (blockSum === 4) {
      nextState = this.cellState;
    } else {
      nextState = 0;
    }

    return Object.freeze({ ...this, nextState });
  }

  return Object.freeze({
    x,
    y,
    cellState,
    cellHash,
    toroidalLimits,
    arrayPosition,
    getNextCellState,
  });
}
