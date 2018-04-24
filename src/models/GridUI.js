class GridUI {
  boardWidth: null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.boardWidth = window.innerWidth > 800 ? 500 : window.innerWidth - 30;
  }

  get width() {
    return this.boardWidth;
  }

  createGridTemplate(rowCols) {
    if (typeof rowCols !== 'number') {
      throw new Error('Row/Col sizing can only be calculated when passed a number.');
    } else if (rowCols < 0) {
      throw new Error('RowCols cannot be a negative number.');
    } else {
      return Array.from(new Array(rowCols), () => `${this.boardWidth / rowCols}px`).join(' ');
    }
  }

  createCellHeight(rows) {
    if (typeof rows !== 'number') {
      throw new Error('Cells height can only be calculated when passed a number.');
    } else if (rows < 0) {
      throw new Error('Rows cannot be a negative number.');
    } else {
      return `${(this.boardWidth / rows) - 5}px`;
    }
  }
}

export default GridUI;
