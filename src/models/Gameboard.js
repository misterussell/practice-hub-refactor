import { action, computed, observable } from 'mobx';

class Gameboard {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  // grid observers
  @observable minRowLength = 5;
  @observable userRowPadding = 0;
  @observable cells = [];

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

  @action createToroidalArray() {
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

}

export default Gameboard;
// export default function Cells() {
//   let hashMap = {};
//
//   function getHashMap(cells, toroidalBound) {
//     const toroidalArray = createToroidalArray(cells, toroidalBound);
//     const cellObjs = createCellObjects(toroidalArray);
//     const cellsWithNextState = getNextCells(cellObjs);
//     return hashMap;
//   }
//
//   function createCellArray(length) {
//     let cells = [];
//
//     for (var i = 0; i < length; i++) {
//       cells.push(0);
//     }
//
//     return cells;
//   }
//
//   function updateCellArray(cells) {
//     let updatedCells = [];
//     return updatedCells;
//   }
//

//   function createCellObjects(rawCells) {
//     let cellObjects = {};
//     let arrayPosition = 0;
//     rawCells.forEach((terrain, i, arr) => {
//       terrain.forEach((cell, p, arr2) => {
//         const toroidalLimits = [arr.length, arr2.length];
//         const cellState = cell;
//         let cellObj = Cell(
//             i + 1,
//             p + 1,
//             cellState,
//             toroidalLimits,
//             arrayPosition
//           );
//         arrayPosition += 1;
//         cellObjects[cellObj.cellHash] = cellObj;
//       });
//     });
//     hashMap = cellObjects;
//     return hashMap = cellObjects;
//   }
//
//   function getNextCells() {
//     for (let cell in hashMap) {
//       hashMap[cell] = hashMap[cell].getNextCellState(hashMap);
//     };
//   }
//
//   function setNewCellsState() {
//     let newState = {};
//     for (let cell in hashMap) {
//       hashMap[cell].cellState === hashMap[cell].nextState
//         ? newState[cell] = hashMap[cell]
//         : newState[cell] = hashMap[cell].changeCellState();
//     };
//     return newState;
//   }
//
//   function getChangedCells() {
//     let changes = {};
//     for (var cell in hashMap) {
//       if (hashMap[cell].cellState !== hashMap[cell].nextState) {
//         changes[hashMap[cell].arrayPosition] = hashMap[cell].nextState;
//       };
//     };
//     return changes;
//   }
//
//   return Object.freeze({
//     createCellArray,
//     updateCellArray,
//     createToroidalArray,
//     getChangedCells,
//     getHashMap
//   });
//
// };
