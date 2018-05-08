import Prebuilts from '../../models/Prebuilts'

describe('The prebuilt class', () => {
  let prebuilts;
  let prebuiltTest;
  let rowLength;
  let maxLength;

  beforeEach(() => {
    prebuilts = new Prebuilts();
    prebuiltTest = [
      0, 0, 0, 0,
      0, 1, 1, 0,
      0, 1, 1, 0,
      0, 0, 0, 0,
    ];
    rowLength = 4;
    maxLength = 5;
  });

  it('Should have a static method isEven that returns a a bool for number values, else undefined.', () => {
    expect(Prebuilts.isEven({foo: 'bar'})).toEqual(undefined);
    expect(Prebuilts.isEven([1, 2, 3])).toEqual(undefined);
    expect(Prebuilts.isEven('foo')).toEqual(undefined);
    expect(Prebuilts.isEven(3)).toEqual(false);
    expect(Prebuilts.isEven(13)).toEqual(false);
    expect(Prebuilts.isEven(-3)).toEqual(false);
    expect(Prebuilts.isEven(2)).toEqual(true);
  });

  it('Should have a static method findPadding that returns an array pair for the number of index that needs to be wrapped around a row, or column.', () => {
    expect(Prebuilts.findPadding(5, 13)).toEqual([4, 4]);
    expect(Prebuilts.findPadding(6, 13)).toEqual([4, 3]);
  });

  it('Should throw an error if findPadding is passed a param a >= param b.', () => {
    expect(() => {
      Prebuilts.findPadding(5, 1);
    }).toThrow();
  });

  it('Should have a static method createStackedArray that takes an array and rowlength and returns an array of arrays so that each subarray is the rowlength, and the total length of all of the arrays matches that of the original array.', () => {
    let matchCase = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ];
    expect(Prebuilts.createStackedArray(prebuiltTest, rowLength)).toEqual(matchCase);
  });

  it('Should throw an error if an array that is not divisible by the rowLength is passed to createStacked Array.', () => {
    let testArr = [
      0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 0, 0,
      0, 1, 0, 0, 1, 0,
      0, 0, 1, 1, 0, 0,
      0, 0, 0, 0,
    ];
    expect(() => {
      Prebuilts.createStackedArray(testArr, 6);
    }).toThrow();
    expect(() => {
      Prebuilts.createStackedArray([1, 2, 3], 2);
    }).toThrow();
  });

  it('Should have a method getRowPadding that sets the rowPadding class property', () => {
    expect(prebuilts.rowPadding.length).toEqual(0);
    prebuilts.getRowPadding(5, 13);
    expect(prebuilts.rowPadding).toEqual([4, 4]);
  });

  it('Should pad arrays with an extra index to the left if the param is even, as the gameboard rows are always odd lengths.', () => {
    prebuilts.getRowPadding(4, 13);
    expect(prebuilts.rowPadding).toEqual([5, 4]);
    prebuilts.getRowPadding(7, 43);
    expect(prebuilts.rowPadding).toEqual([18, 18]);
    prebuilts.getRowPadding(6, 43);
    expect(prebuilts.rowPadding).toEqual([19, 18]);
    prebuilts.getRowPadding(2, 3);
    expect(prebuilts.rowPadding).toEqual([1, 0]);
  });

  it('Should throw an error if getRowPadding is not passed the correct params num, num', () => {
    expect(() => {
      prebuilts.getRowPadding(6, 3);
    }).toThrow();
    expect(() => {
      prebuilts.getRowPadding(-1, 3);
    }).toThrow();
    expect(() => {
      prebuilts.getRowPadding(1, -3);
    }).toThrow();
    expect(() => {
      prebuilts.getRowPadding(-1, -2);
    }).toThrow();
    expect(() => {
      prebuilts.getRowPadding('foo', 5);
    }).toThrow();
    expect(() => {
      prebuilts.getRowPadding(2, 'foo');
    }).toThrow();
    expect(() => {
      prebuilts.getRowPadding('foo', 'bar');
    }).toThrow();
  });

  it('Should have a method getColHeight that returns the height of the columns based on the array', () => {
    expect(Prebuilts.getColHeight(prebuiltTest.length, rowLength)).toEqual(4);
    prebuiltTest = [
      0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 0, 0,
      0, 1, 0, 0, 1, 0,
      0, 0, 1, 0, 1, 0,
      0, 0, 0, 1, 0, 0,
      0, 0, 0, 0, 0, 0,
    ];
    expect(Prebuilts.getColHeight(prebuiltTest.length, 6)).toEqual(6);
    prebuiltTest =  [
      0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 0, 0,
      0, 1, 0, 0, 1, 0,
      0, 0, 1, 1, 0, 0,
      0, 0, 0, 0, 0, 0,
    ];
    expect(Prebuilts.getColHeight(prebuiltTest.length, 6)).toEqual(5);
  });

  it('Should throw an error if getColHeight is passed anything other than params num, num', () => {
    expect(() => {
      Prebuilts.getColHeight({foo: 'bar'}, 2);
    }).toThrow();
    expect(() => {
      Prebuilts.getColHeight('foo', 2);
    }).toThrow();
    expect(() => {
      Prebuilts.getColHeight([1, 2, 3], 2);
    }).toThrow();
    expect(() => {
      Prebuilts.getColHeight(2, 'foo');
    }).toThrow();
    expect(() => {
      Prebuilts.getColHeight(2, {foo: 'bar'});
    }).toThrow();
    expect(() => {
      Prebuilts.getColHeight(2, [1, 2, 3]);
    }).toThrow();
  });

  it('Should have a method getColPadding that takes an array length, a rowLength, and a maxHeight that calculates the height of the columns.', () => {
    prebuilts.getColPadding(36, 6, 7);
    expect(prebuilts.colPadding).toEqual([1, 0]);
    prebuilts.getColPadding(36, 6, 6);
    expect(prebuilts.colPadding).toEqual([0, 0]);
  });

  it('Should throw an error if getColPadding is passed anything but three num params', () => {
    expect(() => {
      prebuilts.getColPadding([1, 3], 2, 3);
    }).toThrow();
    expect(() => {
      prebuilts.getColPadding(1, [1, 2, 3], 3);
    }).toThrow();
    expect(() => {
      prebuilts.getColPadding(1, 2, [1, 2, 3]);
    }).toThrow();
    expect(() => {
      prebuilts.getColPadding();
    }).toThrow();
    expect(() => {
      prebuilts.getColPadding({ foo: 'bar' });
    }).toThrow();
    expect(() => {
      prebuilts.getColPadding(1, 2);
    }).toThrow();
  });

  it('Should have a function padRows that takes an array, a row length, and a dimension of the size of the game square and returns rows that are padded to fit the square.', () => {
    let matchCase = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ];
    expect(prebuilts.padRows(prebuiltTest, 4, 5)).toEqual(matchCase);
    prebuiltTest = [
      0, 0, 0, 0, 0,
      0, 0, 1, 0, 0,
      0, 0, 1, 0, 0,
      0, 0, 1, 0, 0,
      0, 0, 0, 0, 0,
    ];
    matchCase = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    expect(prebuilts.padRows(prebuiltTest, 5, 5)).toEqual(matchCase);
    matchCase = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    expect(prebuilts.padRows(prebuiltTest, 5, 11)).toEqual(matchCase);
  });

});
