import { action, computed, observable } from 'mobx';

class ObjectGameboard {
  constructor(rootStore) {
    this.rootStore = rootStore;
    // this.createBoard();
    this.createFlatBoard();
  }

  @observable cells = [];

  @action createBoard() {
    const data = [];
    let xpos = 1;
    let ypos = 1;
    let index = 0;

    for (let row = 0; row < 10; row += 1) {
      data.push([]);

      for (let column = 0; column < 10; column += 1) {
        data[row].push({
          x: xpos,
          y: ypos,
          active: false,
          index,
          row,
          column,
        });
        xpos += 50;
        index += 1;
      }
      xpos = 1;
      ypos += 50;
    }
    //
    this.cells = data;
  }

  @action updateGameboard(x, y) {
    const newCells = this.cells.map((row, i, rowArr) => {
      return row.map((column, p) => {
        if (i === x && p === y) {
          console.log('found');
          console.log(rowArr[i][p]);
          return { ...column, active: true };
        }
        console.log('notfound');
        return { ...column };
      });
    });
    this.cells = newCells;
  }

  @action createFlatBoard() {
    const data = [];
    let index = 0;
    for (let row = 0; row < 100; row++) {
      for (let col = 0; col < 100; col++) {
        data.push({
          index,
          col,
          row,
          active: false,
        });
        index += 1;
      }
    }
    console.log(data);
    this.cells = data;
    console.log(this.cells);
  }

  @action updateCell(cell) {
    this.cells[cell].active = true;
  }

}

export default ObjectGameboard;
