import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { observer } from 'mobx-react';

import { Grid, Cell } from '../components';

// faut pas direct le state a propose de le diff contre les arr
// il faut qu'il define la tous en particulier
@observer class GameBoard extends Component {
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
                key={`cell${cell}`}
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
              onClick={this.addCell.bind(this)}
            >
              Start
            </Button>
            <Button
              bsStyle="primary"
              onClick={this.addCell.bind(this)}
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
              onClick={this.addCell.bind(this)}
            >
              Grow GameBoard
            </Button>
            <Button
              bsStyle="primary"
              onClick={this.addCell.bind(this)}
            >
              Shrink Gameboard
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }

  handleCellClick(cell) {
    const store = this.props.location.state.store;
    store.cellStore.updateCellArray(cell);
  }

  handleStart(e) {}

  handleStop(e) {}

  handleClear(e) {
    e.preventDefault();
    this.props.location.state.store.cellStore.newCellArray();
  }

  handleGrow(e) {}

  handleShrink(e) {}
}

export default GameBoard;
