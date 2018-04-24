import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { Grid, Cell, Hero } from '../components';

@observer class GameBoard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const rootStore = this.props.store.rootStore;
    rootStore.gameboard.newCellArray();
  }

  render() {
    const rootStore = this.props.store.rootStore;
    const hero = rootStore.gameplay.gameOverState ? <Hero /> : null;
    return (
      <div
        className="game"
        style={{
          width: window.innerWidth > 800 ? 500 : window.innerWidth - 30
        }}
      >
        <Grid
          classname={'life-board'}
          width={rootStore.gridUI.width}
          gridTemplate={rootStore.gridUI.createGridTemplate(Math.sqrt(rootStore.gameboard.cellArrayLength))}
        >
          {
            rootStore.gameboard.cells.map((cell, i) => (
              <Cell
                key={`cell${i}`}
                cell={cell}
                callback={this.handleCellClick}
                cellstate={cell}
                cellnumber={i}
                style={{
                  height: rootStore.gridUI.createCellHeight(Math.sqrt(rootStore.gameboard.cellArrayLength)),
                }}
              />
            ))
          }
        </Grid>
        <div className="action-buttons">
          <button
            className="action-button"
            onClick={this.handleGameState}
          >
            { rootStore.gameplay.getState === true ? `Stop` : `Start` }
          </button>
          <button
            className="action-button"
            onClick={ rootStore.gameplay.getState === false ? this.handleClear : null }
          >
            Clear
          </button>
          <button
            className="action-button"
            onClick={ rootStore.gameplay.getState === false ? this.handleGrow : null }
          >
            + Cells
          </button>
          <button
            className="action-button"
            onClick={ rootStore.gameplay.getState === false ? this.handleShrink : null }
          >
            - Cells
          </button>
        </div>
        {
          hero
        }
      </div>
    );
  }

  handleCellClick = (cell) => {
    const gameboard = this.props.store.rootStore.gameboard;
    const gameplay = this.props.store.rootStore.gameplay;
    // if the game is over when a cell is clicked, remove the modal
    const gameOver = gameplay.gameOverState === true ? gameplay.setGameOver(false) : null;
    // the ternary operator is placed here rather than in the onClick declaration because of the required props
    const updatecell = gameplay.getState === false ? gameboard.setCellArray(gameboard.updateCellArray(cell)) : null;
  }

  handleGameState = (e) => {
    e.preventDefault();
    const rootStore = this.props.store.rootStore;
    const nextState = rootStore.gameplay.getState === true ? false : true;
    rootStore.gameplay.updateState(nextState);
    rootStore.gameplay.gameOverState === true ? rootStore.gameplay.setGameOver(false) : null;
  }

  handleClear = (e) => {
    e.preventDefault();
    const rootStore = this.props.store.rootStore;
    rootStore.gameboard.setCellArray(rootStore.gameboard.newCellArray());
    rootStore.gameplay.gameOverState === true ? rootStore.gameplay.setGameOver(false) : null;
  }

  handleGrow = (e) => {
    e.preventDefault()
    const rootStore = this.props.store.rootStore;
    rootStore.gameboard.userRowPadding < 7 ? rootStore.gameboard.growCellArray(2) : null;
    rootStore.gameplay.gameOverState === true ? rootStore.gameplay.setGameOver(false) : null;
  }

  handleShrink = (e) => {
    e.preventDefault()
    const rootStore = this.props.store.rootStore;
    rootStore.gameboard.userRowPadding > 0 ? rootStore.gameboard.shrinkCellArray(2) : null;
    rootStore.gameplay.gameOverState === true ? rootStore.gameplay.setGameOver(false) : null;
  }

  handleGameOver = (e) => {
    e.preventDefault();
    const rootStore = this.props.store.rootStore;
    rootStore.gameplay.setGameOver(true);
  }
}

export default GameBoard;
