import { action, computed, observable, onBecomeUnobserved } from 'mobx';

export default class Gameplay {
  constructor(rootStore) {
    this.rootStore = rootStore;
    onBecomeUnobserved(this, 'gameState', this.suspend);
  }

  @observable gameState = false;
  @observable gameOver = false;
  interval = null;

  @computed get getState() {
    return this.gameState;
  }

  @computed get gameOverState() {
    return this.gameOver;
  }

  @action updateState(state) {
    if (state === false) {
      this.gameState = false;
      this.suspend();
    } else if (state === true) {
      this.gameOver = false;
      this.gameState = true;
      // this.rootStore.gameboard.saveGame(this.rootStore.gameboard.cells);
      this.interval = setInterval(() => this.rootStore.gameboard.updateGameBoard(), 300);
    }
  }

  @action setGameOver(state) {
    if (state === true) {
      this.gameOver = true;
      this.updateState(!state);
    } else if (state === false) {
      this.gameOver = false;
    }
  }

  suspend() {
    clearInterval(this.interval);
    this.interval = null;
  }
}
