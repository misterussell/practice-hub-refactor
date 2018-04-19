import RootStore from '../../collections/RootStore';
import Gameboard from '../../models/Gameboard';
import Gameplay from '../../models/Gameplay';
import GridUI from '../../models/GridUI';

jest.mock('../../collections/RootStore');
jest.mock('../../models/Gameboard');
jest.mock('../../models/Gameplay');
jest.mock('../../models/GridUI');

describe('The Store should call classes that meet these requirements:', () => {
  beforeEach(() => {
    RootStore.mockClear();
    Gameboard.mockClear();
    Gameplay.mockClear();
    GridUI.mockClear();
  });

  it('The rootStore should be able to call new() on itself', () => {
    const rootStore = new RootStore();
    expect(rootStore).toBeTruthy();
  });

  it('We can check if the rootStore called the class constructor', () => {
    const rootStore = new RootStore();
    expect(RootStore).toHaveBeenCalledTimes(1);
  });

  it('We can check if the gameboard called the class constructor', () => {
    const gameboard = new Gameboard();
    expect(Gameboard).toHaveBeenCalledTimes(1);
  });

  it('We can check if gameplay called the class constructor', () => {
    const gameplay = new Gameplay();
    expect(Gameplay).toHaveBeenCalledTimes(1);
  });

  it('We can check if the gridUI called the class constructor', () => {
    const gridUI = new GridUI();
    expect(GridUI).toHaveBeenCalledTimes(1);
  });
});
