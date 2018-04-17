import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { Grid, Cell } from '../components';

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
                key={i}
                callback={this.handleCellClick.bind(this)}
                cellstate={cell}
                cellnumber={i}
                style={{height: store.gridUI.createCellHeight(Math.sqrt(store.cellStore.cellArrayLength))}}
              />
            ))
          }
        </Grid>
        <button onClick={ this.addCell.bind(this) }>Add Cell</button>
      </div>
    );
  }

  handleCellClick(cell) {
    const store = this.props.location.state.store;
    store.cellStore.updateCellArray(cell);
  }

  addCell(e) {
    e.preventDefault();
    const store = this.props.location.state.store;
    store.cellStore.addCells(2);
  }
}

export default GameBoard;
