import { action, computed, observable } from 'mobx';

import Cell from './Cell';

class Gameboard {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.setCellArray(this.newCellArray());
  }

  // grid observer
  @observable cells = [];

  // cell configuration settings
  minRowLength = 5;
  @observable userRowPadding = 0;

  // prior configuration/default options
  lastGame = null;

  // these functions are used to create the array required
  // to supply the view with the required props.

  // // grid settings
  @computed get cellArrayLength() {
    return this.cells.length;
  }

  @computed get totalRowLength() {
    return this.minRowLength + this.userRowPadding;
  }

  @action newCellArray() {
    const cells = [];

    for (let i = 0; i < (this.minRowLength + this.userRowPadding) ** 2; i += 1) {
      cells.push(0);
    }

    return cells;
  }

  // // all changes to @observable cells should be made with this setter
  @action setCellArray(arr) {
    if (arr.length !== this.totalRowLength ** 2) {
      throw new Error(`Expected ${this.totalRowLength} by ${this.totalRowLength} array but got ${Math.sqrt(arr.length)} by ${Math.sqrt(arr.length)} array.`);
    } else this.cells = arr;
  }

  updateCellArray(i) {
    if (typeof i !== 'number') {
      throw new Error(`Expected a number but received ${typeof i}.`);
    } else if (i > this.cells.length - 1 || i < 0) {
      throw new Error(`Expected a number less than ${this.cells.length - 1} and greater than Zero.`);
    } else {
      const cells = [...this.cells];
      const newCellVal = this.cells[i] === 0 ? 1 : 0;
      cells[i] = newCellVal;
      return cells;
    }
  }

  @action growCellArray(alpha) {
    if (typeof alpha !== 'number') {
      throw new Error(`Expected a number but received ${typeof alpha}.`);
    } else if (alpha < 0) {
      throw new Error(`Expected a positive number but received ${alpha}.`);
    } else {
      const newRow = Array.from(new Array(Math.sqrt(this.cellArrayLength) + alpha), () => 0);
      const rowPadding = Array.from(new Array(alpha / 2), () => 0);
      const updatedRows = this.createToroidalArray()
                              .map(row => [...rowPadding, ...row, ...rowPadding]);
      const cells = newRow.concat(...updatedRows, newRow);
      this.userRowPadding += alpha;
      this.setCellArray(cells);
    }
  }

  @action shrinkCellArray(alpha) {
    if (typeof alpha !== 'number') {
      throw new Error(`Expected a number but received ${typeof alpha}.`);
    } else if (alpha < 0) {
      throw new Error(`Expected a positive number but received ${alpha}.`);
    } else {
      const cells = this.createToroidalArray()
                       .map((row, i, arr) => row.slice((alpha / 2), (arr[i].length - (alpha / 2))))
                       .filter((row, i, arr) => {
                         if (i === 0) {
                           return false;
                         } else if (i === arr.length - (alpha / 2)) {
                           return false;
                         }
                         return true;
                       })
                       .reduce((a, b) => a.concat(b), []);
      this.userRowPadding -= alpha;
      this.setCellArray(cells);
    }
  }

  createToroidalArray() {
    const toroidalArray = [];
    const cells = [...this.cells];

    for (let i = 0; i < this.totalRowLength ** 2; i += this.totalRowLength) {
      toroidalArray.push(cells.slice(i, i + this.totalRowLength));
    }

    return toroidalArray;
  }

  // these functions are used to compute the next values for the game array

  createHashMap() {
    const toroidalArray = this.createToroidalArray();
    const cellObjs = Gameboard.createCellObjects(toroidalArray);
    return Gameboard.getNextCells(cellObjs);
  }

  static createCellObjects(array) {
    const cellObjects = {};
    let arrayPosition = 0;
    array.forEach((terrain, i, arr) => {
      terrain.forEach((cell, p, arr2) => {
        const toroidalLimits = [arr.length, arr2.length];
        const cellState = cell;
        const cellObj = Cell(
            i + 1,
            p + 1,
            cellState,
            toroidalLimits,
            arrayPosition,
          );
        arrayPosition += 1;
        cellObjects[cellObj.cellHash] = cellObj;
      });
    });
    return cellObjects;
  }

  static getNextCells(hashMap) {
    const newHashMap = {};
    Object.keys(hashMap)
          .forEach(cell => newHashMap[cell] = hashMap[cell].getNextCellState(hashMap));
    return newHashMap;
  }

  static getChangedCells(hashMap) {
    const changes = [];
    Object.keys(hashMap).forEach((id) => {
      if (hashMap[id].cellState !== hashMap[id].nextState) {
        changes.push([hashMap[id].arrayPosition]);
      }
    });
    return changes;
  }

  // // this function sends the updates to the array updater for processing
  updateGameBoard() {
    const hashMap = this.createHashMap();
    if (Gameboard.getChangedCells(hashMap).length === 0) {
      this.rootStore.gameplay.setGameOver(true);
    } else {
      Gameboard.getChangedCells(hashMap)
               .forEach(cell => this.setCellArray(this.updateCellArray(...cell)));
    }
  }

  saveGame(arr) {
    this.lastGame = [...arr];
  }

  replay() {
    this.setCellArray(this.lastGame);
  }

}

export default Gameboard;
