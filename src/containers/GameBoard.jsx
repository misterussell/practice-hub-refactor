import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { observer } from 'mobx-react';

import { Grid, Cell } from '../components';

// faut pas direct le state a propose de le diff contre les arr
// il faut qu'il define la tous en particulier
@observer class GameBoard extends Component {
  constructor(...args) {
    super(...args);
  }
  componentWillMount() {
    const store = this.props.location.state.store;
    store.cellStore.newCellArray();
  }

  render() {
    const store = this.props.location.state.store;
    return (
      <div className="game">
        <Grid
          classname={'life-board'}
          width={store.gridUI.width}
          gridTemplate={store.gridUI.createGridTemplate(Math.sqrt(store.cellStore.cellArrayLength))}
        >
          {
            store.cellStore.cells.map((cell, i) => (
              <Cell
                key={`cell${i}`}
                cell={cell}
                callback={this.handleCellClick}
                cellstate={cell}
                cellnumber={i}
                style={{
                  height: store.gridUI.createCellHeight(Math.sqrt(store.cellStore.cellArrayLength)),
                }}
              />
            ))
          }
        </Grid>
        <div className="action-buttons">
          <ButtonGroup>
            <Button
              bsStyle="primary"
              onClick={this.handleStart}
            >
              Start
            </Button>
            <Button
              bsStyle="primary"
              onClick={this.handleStop.bind(this)}
            >
              Stop
            </Button>
            <Button
              bsStyle="primary"
              onClick={this.handleClear.bind(this)}
            >
              Clear
            </Button>
            <Button
              bsStyle="primary"
              onClick={this.handleGrow.bind(this)}
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
    store.cellStore.updateCellArray(cell);
  }

  handleStart = (e) => {
    e.preventDefault()
    console.log('start');
  }

  handleStop = (e) => {
    e.preventDefault()
    console.log('stop');
  }

  handleClear = (e) => {
    e.preventDefault();
    this.props.location.state.store.cellStore.newCellArray();
  }

  handleGrow = (e) => {
    e.preventDefault()
    const store = this.props.location.state.store;
    store.cellStore.userGridAdjust < 7 ? store.cellStore.growCellArray(2) : null;
  }

  handleShrink = (e) => {
    e.preventDefault()
    const store = this.props.location.state.store;
    store.cellStore.userGridAdjust > 0 ? console.log(store.cellStore.shrinkCellArray(2)) : null;
  }
}

export default GameBoard;
