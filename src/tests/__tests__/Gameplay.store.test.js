import Gameplay from '../../models/Gameplay';

describe('The Gameplay class', () => {
  let gameplay;

  beforeEach(() => {
    gameplay = new Gameplay();
  });

  afterEach(() => {
    gameplay.suspend();
  });

  it('Should should have a method to return the gameState', () => {
    expect(gameplay.getState).not.toBeTruthy();

  });

  it('Should have a method to return the value for gameOver that is used to track if the game is finished', () => {
    expect(gameplay.gameOverState).not.toBeTruthy();
  });

  it('Should have a property interval that is null upon creation', () => {
    expect(gameplay.interval).toBeNull();
  })

  it('Should have a method updateState that takes a bool and updates the game state to start/pause the game', () => {
    gameplay.updateState(true);
    expect(gameplay.getState).toBeTruthy();
    expect(gameplay.interval).not.toBeNull();
  });

  it('Should have a method setGameOver that takes a bool and update the gameover property to signify the game is over', () => {
    expect(gameplay.gameOverState).not.toBeTruthy();
    gameplay.setGameOver(true);
    expect(gameplay.gameOverState).toBeTruthy();
  });

  it('Should have a method suspend that removes the interval set on the class', () => {
    gameplay.updateState(true);
    expect(gameplay.interval).not.toBeNull();
    gameplay.suspend();
    expect(gameplay.interval).toBeNull();
  });
});
