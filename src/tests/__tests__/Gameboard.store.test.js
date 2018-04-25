import Gameboard from '../../models/Gameboard';

describe('The Gameboard class', () => {

  let gameboard;
  let gameboardRef;
  let gameboardRefMutated;

  beforeEach(() => {
    gameboard = new Gameboard();
    gameboardRef = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    gameboardRefMutated = gameboardRef.map(i => 1);
  });


  it('Should set an initial array of 25 indices to itself', () => {
    expect(gameboard.cells).toEqual(gameboardRef);
  });

  it('Should have a method to call the length of the cell array', () => {
    expect(gameboard.cellArrayLength).toEqual(25);
  });

  it('Should have a method to call the total row length based on the minimum of 5 plus a user selection', () => {
    expect(gameboard.totalRowLength).toEqual(5);
    gameboard.growCellArray(2);
    expect(gameboard.totalRowLength).toEqual(7);
  });

  it('Should have a method newCellArray that returns an array with no arguments', () => {
    expect(gameboard.newCellArray()).toEqual(gameboardRef);
  });

  it('Should have a method setCellArray that accepts and array and sets the this.cells value as such', () => {
    const testArr = gameboard.cells.map(i => 1)
    gameboard.setCellArray(testArr)
    expect(gameboard.cells).toEqual(gameboardRefMutated);
  });

  it('Should throw an error if setCellArray is passed anything other than a squared array of totalRowLength', () => {
    expect(() => {
      gameboard.setCellArray({ foo: 'bar' });
    }).toThrow();
    expect(() => {
      gameboard.setCellArray([0, 1, 2, 3, 4]);
    }).toThrow();
    expect(() => {
      gameboard.setCellArray(true);
    }).toThrow();
    expect(() => {
      gameboard.setCellArray('foo, bar');
    }).toThrow();
    expect(() => {
      gameboard.setCellArray(2);
    }).toThrow();
  });

  it('Should have a method updateCellArray that takes an argument i that returns an updated copy of the cell array where i has been updated', () => {
    gameboardRef[0] = 1;
    expect(gameboard.updateCellArray(0)).toEqual(gameboardRef);
  });

  it('Should throw an error if updateCellArray is passed anything other than a number that exists as an index of the cells array', () => {
    expect(() => {
      gameboard.updateCellArray(null)
    }).toThrow();
    expect(() => {
      gameboard.updateCellArray({foo: 'bar'});
    });
    expect(() => {
      gameboard.updateCellArray([0, 1, 2, 3]);
    });
    expect(() => {
      gameboard.updateCellArray('foo, bar');
    });
    expect(() => {
      gameboard.updateCellArray(gameboard.cells.length + 50);
    }).toThrow();
    expect(() => {
      gameboard.updateCellArray(-10);
    }).toThrow();
  });

  it('Should have a method growCellArray that takes an argument alpha that updates the userRowPadding property, and adjusts the size of the cells array', () => {
    gameboard.growCellArray(2);
    expect(gameboard.userRowPadding).toEqual(2);
    expect(gameboard.cellArrayLength).toEqual(49);
  });

  it('Should throw an error if growCellArray is passed anything other than a positive number', () => {
    expect(() => {
      gameboard.growCellArray(null);
    }).toThrow();
    expect(() => {
      gameboard.growCellArray(NaN);
    }).toThrow();
    expect(() => {
      gameboard.growCellArray({foo: 'bar'});
    }).toThrow();
    expect(() => {
      gameboard.growCellArray([0, 1, 2, 3]);
    }).toThrow();
    expect(() => {
      gameboard.growCellArray('foo, bar');
    }).toThrow();
    expect(() => {
      gameboard.growCellArray(-10);
    }).toThrow();
  });

  it('Should persist the relative location of cells when growing the size of the array', () => {
    const test = [
      0, 0, 0, 0, 0, 0, 0,
      0, 1, 0, 0, 0, 1, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 1, 0, 0, 0, 1, 0,
      0, 0, 0, 0, 0, 0, 0,
    ];
    gameboard.setCellArray(gameboard.updateCellArray(0));
    gameboard.setCellArray(gameboard.updateCellArray(4));
    gameboard.setCellArray(gameboard.updateCellArray(20));
    gameboard.setCellArray(gameboard.updateCellArray(24));
    gameboard.growCellArray(2);
    expect(gameboard.cells).toEqual(test);
  });

  it('Should have a method shrinkCellArray that takes an argument alpha that updates the userRowPadding property, and adjusts the size of the cells array', () => {
    gameboard.growCellArray(2);
    expect(gameboard.userRowPadding).toEqual(2);
    expect(gameboard.cellArrayLength).toEqual(49);
  });

  it('Should throw an error if shrinkCellArray is passed anything other than a positive number', () => {
    expect(() => {
      gameboard.shrinkCellArray(null);
    }).toThrow();
    expect(() => {
      gameboard.shrinkCellArray(NaN);
    }).toThrow();
    expect(() => {
      gameboard.shrinkCellArray({foo: 'bar'});
    }).toThrow();
    expect(() => {
      gameboard.shrinkCellArray([0, 1, 2, 3]);
    }).toThrow();
    expect(() => {
      gameboard.shrinkCellArray('foo, bar');
    }).toThrow();
    expect(() => {
      gameboard.shrinkCellArray(-10);
    }).toThrow();
  });

  it('Should persist the relative location of cells when shrinking the size of the array', () => {
    const test = [
      1, 0, 0, 0, 1,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      1, 0, 0, 0, 1,
    ];
    gameboard.setCellArray(gameboard.updateCellArray(0));
    gameboard.setCellArray(gameboard.updateCellArray(4));
    gameboard.setCellArray(gameboard.updateCellArray(20));
    gameboard.setCellArray(gameboard.updateCellArray(24));
    gameboard.growCellArray(2);
    gameboard.shrinkCellArray(2);
    expect(gameboard.cells).toEqual(test);
  });

  it('Should have a createToroidalArray method that takes no args and uses the class properties to return an array of arrays, such that each array.length is the sqrt of the totalRowLength', () => {
    let test = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    expect(gameboard.createToroidalArray()).toEqual(test);
    gameboard.setCellArray(gameboard.updateCellArray(0));
    gameboard.setCellArray(gameboard.updateCellArray(4));
    gameboard.setCellArray(gameboard.updateCellArray(20));
    gameboard.setCellArray(gameboard.updateCellArray(24));
    test = [
      [1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1],
    ];
    expect(gameboard.createToroidalArray()).toEqual(test);
  });

  it('Should have a createHashMap method that has no arguments and returns an object of cells, with their next state', () => {
    // this is broken needs to be explored
    // expect(gameboard.createHashMap()).not.toBeObject;
    // expect([]).toBeObject;
  });

  it('Should have a lastGrid property that defaults as null', () => {
    expect(gameboard.lastGame).toBeNull();
    gameboard.saveLastGame();
    expect(gameboard.lastGame).toEqual(gameboard.cells);
  });

});
