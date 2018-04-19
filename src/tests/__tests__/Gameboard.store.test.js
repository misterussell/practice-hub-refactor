import Gameboard from '../../models/Gameboard';

describe('The Gameboard class', () => {

  let gameboard;
  let gameboardRef;

  beforeEach(() => {
    gameboard = new Gameboard();
    gameboardRef = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  });

  it('Should have a function newCellArray() that returns an array', () => {
    expect(gameboard.newCellArray()).toEqual(gameboardRef);
  });

  it('Should set an initial array of 25 indices to itself', () => {
    expect(gameboard.cells).toEqual(gameboardRef);
  });

  it('Should have a function updateCellArray that takes an argument i that returns an updated copy of the cell array', () => {
    gameboardRef[0] = 1;
    expect(gameboard.updateCellArray(0)).toEqual(gameboardRef);
  });
});
