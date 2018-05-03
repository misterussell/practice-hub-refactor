import { action, computed, observable } from 'mobx';

class ObjectGameboard {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.createBoard();
    console.log(this.cells);
  }

  @observable cells = [];

  @action createBoard() {
    const data = new Array();
    let xpos = 1;
    let ypos = 1;
    let index = 0;

    for (let row = 0; row < 10; row++) {
      data.push(new Array());

      for (let column = 0; column < 10; column++) {
        data[row].push({
          x: xpos,
          y: ypos,
          active: false,
          index,
          fill: '#fff',
          activate() {
            this.active = true;
            this.fill = '#222';
          },
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
}

export default ObjectGameboard;
