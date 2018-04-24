import GridUI from '../../models/GridUI';

describe('The GridUI class', () => {

  let gridUI;

  beforeEach(() => {
    gridUI = new GridUI();
  });

  it('Should initialize with a width of 500', () => {
    expect(gridUI.width).toEqual(500);
  });

  it('Should have a createGridTemplate method that takes a number and creates a string used to calculate row/column sizing', () => {
    const test = '250px 250px';
    expect(gridUI.createGridTemplate(2)).toEqual(test);
  });

  it('Should throw errors when the createGridTemplate method is passed a negative number or NaN', () => {
    expect(() => {
      gridUI.createGridTemplate({ foo: 'bar' });
    }).toThrow();
    expect(() => {
      gridUI.createGridTemplate([0, 1, 2, 3]);
    }).toThrow();
    expect(() => {
      gridUI.createGridTemplate('foo, bar');
    }).toThrow();
    expect(() => {
      gridUI.createGridTemplate(-10);
    }).toThrow();
    expect(() => {
      gridUI.createGridTemplate(null);
    }).toThrow();
  });

  it('Should have a createCellHeight method that takes a number and create a string of the height of a cell', () => {
    const test = '120px';
    expect(gridUI.createCellHeight(4)).toEqual(test);
  });

  it('Should throw errors when the createCellHeight method is passed a negative number or NaN', () => {
    expect(() => {
      gridUI.createCellHeight({ foo: 'bar' });
    }).toThrow();
    expect(() => {
      gridUI.createCellHeight([0, 1, 2, 3]);
    }).toThrow();
    expect(() => {
      gridUI.createCellHeight('foo, bar');
    }).toThrow();
    expect(() => {
      gridUI.createCellHeight(-10);
    }).toThrow();
    expect(() => {
      gridUI.createCellHeight(null);
    }).toThrow();
  });
});
