import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { observer } from 'mobx-react';

import { Grid, Cell } from '../components';

// faut pas direct le state a propose de le diff contre les arr
// il faut qu'il define la tous en particulier
@observer class GameBoard extends Component {
  componentWillMount() {
    const store = this.props.location.state.store;
    store.rootStore.gameboard.newCellArray();
  }

  render() {
    const store = this.props.location.state.store;
    return (
      <div className="game">
        <Grid
          classname={'life-board'}
          width={store.rootStore.gridUI.width}
          gridTemplate={store.rootStore.gridUI.createGridTemplate(Math.sqrt(store.rootStore.gameboard.cellArrayLength))}
        >
          {
            store.rootStore.gameboard.cells.map((cell, i) => (
              <Cell
                key={`cell${i}`}
                cell={cell}
                callback={this.handleCellClick}
                cellstate={cell}
                cellnumber={i}
                style={{
                  height: store.rootStore.gridUI.createCellHeight(Math.sqrt(store.rootStore.gameboard.cellArrayLength)),
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
              Start
            </Button>
            <Button
              bsStyle="primary"
              onClick={this.handleGameState}
            >
              Stop
            </Button>
            <Button
              bsStyle="primary"
              onClick={this.handleClear}
            >
              Clear
            </Button>
            <Button
              bsStyle="primary"
              onClick={this.handleGrow}
            >
              Grow GameBoard
            </Button>
            <Button
              bsStyle="primary"
              onClick={this.handleShrink.bind(this)}
            >
              Shrink Gameboard
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }

  handleCellClick = (cell) => {
    const store = this.props.location.state.store;
    store.rootStore.gameboard.updateCellArray(cell);
  }

  handleGameState = (e) => {
    e.preventDefault();
    const store = this.props.location.state.store;
    console.log('click');
    store.rootStore.gameboard.stretch();
  }

  handleClear = (e) => {
    e.preventDefault();
    const store = this.props.location.state.store;
    store.rootStore.gameboard.newCellArray();
  }

  handleGrow = (e) => {
    e.preventDefault()
    const store = this.props.location.state.store;
    store.rootStore.gameboard.userGridAdjust < 7 ? store.rootStore.gameboard.growCellArray(2) : null;
  }

  handleShrink = (e) => {
    e.preventDefault()
    const store = this.props.location.state.store;
    store.rootStore.gameboard.userGridAdjust > 0 ? store.rootStore.gameboard.shrinkCellArray(2) : null;
  }
}

export default GameBoard;
