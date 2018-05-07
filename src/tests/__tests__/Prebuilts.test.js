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

  it('Should have a method getRowPadding that sets the rowPadding class property', () => {
    expect(prebuilts.rowPadding.length).toEqual(0)
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
  })
});
