import { action, computed, observable } from 'mobx';

import Cell from './Cell';

class Gameboard {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // grid observers
  @observable minRowLength = 5;
  @observable userRowPadding = 0;
  @observable cells = [];
  hashMap = {};

  // grid settings
  @computed get cellArrayLength() {
    return this.cells.length;
  }

  @computed get totalRowLength() {
    return this.minRowLength + this.userRowPadding;
  }

  @computed get userGridAdjust() {
    return this.userRowPadding;
  }

  @action updateGameBoard = () => {
    this.createHashMap();
    this.getChangedCells().forEach(cell => this.updateCellArray(cell));
  }

  createHashMap() {
    const toroidalArray = this.createToroidalArray();
    const cellObjs = this.createCellObjects(toroidalArray);
    return this.getNextCells(cellObjs);
  }

  @action newCellArray() {
    this.cells = [];
    for (let i = 0; i < (this.minRowLength + this.userRowPadding) ** 2; i += 1) {
      this.cells.push(0);
    }
  }

  @action updateCellArray(i) {
    const cells = [...this.cells];
    const newCellVal = this.cells[i] === 0 ? 1 : 0;
    cells[i] = newCellVal;
    this.cells = cells;
  }

  createToroidalArray() {
    const toroidalArray = [];
    const cells = [...this.cells];

    for (let i = 0; i < this.totalRowLength ** 2; i += this.totalRowLength) {
      toroidalArray.push(cells.slice(i, i + this.totalRowLength));
    }

    return toroidalArray;
  }

  @action growCellArray(alpha) {
    const newRow = Array.from(new Array(Math.sqrt(this.cellArrayLength) + alpha), () => 0);
    const rowPadding = Array.from(new Array(alpha / 2), () => 0);
    const updatedRows = this.createToroidalArray()
                            .map(row => [...rowPadding, ...row, ...rowPadding]);

    this.cells = newRow.concat(...updatedRows, newRow);
    this.userRowPadding += alpha;
  }

  @action shrinkCellArray(alpha) {
    this.cells = this.createToroidalArray()
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
  }

  createCellObjects(array) {
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
    this.hashMap = cellObjects;
  }

  getNextCells() {
    Object.keys(this.hashMap).forEach(obj => this.updateCellinHashMap(obj));
  }

  updateCellinHashMap(id) {
    this.hashMap[id] = this.hashMap[id].getNextCellState(this.hashMap);
  }

  getChangedCells() {
    const changes = [];
    Object.keys(this.hashMap).forEach((id) => {
      if (this.hashMap[id].cellState !== this.hashMap[id].nextState) {
        changes.push([this.hashMap[id].arrayPosition]);
      }
    });
    return changes;
  }
}

export default Gameboard;
