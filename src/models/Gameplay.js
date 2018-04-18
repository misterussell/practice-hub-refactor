import { action, computed, observable, onBecomeUnobserved } from 'mobx';

export default class Gameplay {
  constructor(rootStore) {
    this.rootStore = rootStore;
    onBecomeUnobserved(this, 'gameState', this.suspend);
  }

  @observable gameState = false;
  interval = null;

  @computed get getState() {
    return this.gameState;
  }

  @action updateState = (bool) => {
    if (bool === false) {
      this.gameState = false;
      clearInterval(this.interval);
    } else if (bool === true) {
      this.gameState = true;
      this.interval = setInterval(() => this.rootStore.gameboard.updateGameBoard(), 300);
    }
  }

  suspend() {
    clearInterval(this.interval);
  }
}
