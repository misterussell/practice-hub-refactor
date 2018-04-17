class GridUI {
  boardWidth: null;

  constructor() {
    this.boardWidth = 500;
  }

  get width() {
    return this.boardWidth;
  }

  createGridTemplate(val) {
    return Array.from(new Array(val), () => `${this.boardWidth / val}px`).join(' ');
  }

  createCellHeight(val) {
    return `${(this.boardWidth / val) - 5}px`;
  }
}

export default GridUI;
