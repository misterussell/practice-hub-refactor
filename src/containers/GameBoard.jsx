import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
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
      <div className="game">
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
          <ButtonGroup>
            <Button
              bsStyle="primary"
              onClick={this.handleGameState}
            >
              { rootStore.gameplay.getState === true ? `Stop` : `Start` }
            </Button>
            <Button
              bsStyle="primary"
              onClick={ rootStore.gameplay.getState === false ? this.handleClear : null }
            >
              Clear
            </Button>
            <Button
              bsStyle="primary"
              onClick={ rootStore.gameplay.getState === false ? this.handleGrow : null }
            >
              Grow GameBoard
            </Button>
            <Button
              bsStyle="primary"
              onClick={ rootStore.gameplay.getState === false ? this.handleShrink : null }
            >
              Shrink Gameboard
            </Button>
          </ButtonGroup>
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
    // the ternary operator is placed here rather than in the onClick declaration because of the required props
    gameplay.getState === false ? gameboard.setCellArray(gameboard.updateCellArray(cell)) : null;
  }

  handleGameState = (e) => {
    e.preventDefault();
    const rootStore = this.props.store.rootStore;
    const nextState = rootStore.gameplay.getState === true ? false : true;
    rootStore.gameplay.updateState(nextState);
  }

  handleClear = (e) => {
    e.preventDefault();
    const rootStore = this.props.store.rootStore;
    rootStore.gameboard.newCellArray();
  }

  handleGrow = (e) => {
    e.preventDefault()
    const rootStore = this.props.store.rootStore;
    rootStore.gameboard.userGridAdjust < 7 ? rootStore.gameboard.growCellArray(2) : null;
  }

  handleShrink = (e) => {
    e.preventDefault()
    const rootStore = this.props.store.rootStore;
    rootStore.gameboard.userGridAdjust > 0 ? rootStore.gameboard.shrinkCellArray(2) : null;
  }

  handleGameOver = (e) => {
    e.preventDefault();
    const rootStore = this.props.store.rootStore;
    rootStore.gameplay.setGameOver(true);
  }
}

export default GameBoard;
