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
    expect(Prebuilts.getColHeight(prebuiltTest, rowLength)).toEqual(4);
    prebuiltTest = [
      0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 0, 0,
      0, 1, 0, 0, 1, 0,
      0, 0, 1, 0, 1, 0,
      0, 0, 0, 1, 0, 0,
      0, 0, 0, 0, 0, 0,
    ];
    expect(Prebuilts.getColHeight(prebuiltTest, 6)).toEqual(6);
    prebuiltTest =  [
      0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 0, 0,
      0, 1, 0, 0, 1, 0,
      0, 0, 1, 1, 0, 0,
      0, 0, 0, 0, 0, 0,
    ];
    expect(Prebuilts.getColHeight(prebuiltTest, 6)).toEqual(5);
  });
});
