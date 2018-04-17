import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { Grid } from '../components';

@observer class GameBoard extends Component {
  componentWillMount() {
    const store = this.props.location.state.store;
    store.cellStore.newCellArray();
  }
  // this component should observe the raw array of cells and inject them into the grid.
  render() {
    const store = this.props.location.state.store;

    let gridStle
    return (
      <div className="game">
        <Grid
          classname={'life-board'}
          width={store.gridUI.width}
          gridTemplate={store.gridUI.createGridTemplate(Math.sqrt(store.cellStore.cellArrayLength))}
        >
          {
            store.cellStore.cells.map((cell, id) => (
              <div
                className={'cell'}
                key={id}
                style={{height: store.gridUI.createCellHeight(Math.sqrt(store.cellStore.cellArrayLength))}}
              >
                cell
              </div>
            ))
          }
        </Grid>
        <button onClick={ this.addCell.bind(this) }>Add Cell</button>
      </div>
    );
  }

  addCell(e) {
    e.preventDefault();
    const store = this.props.location.state.store;
    store.cellStore.addCells(2);
  }
}

export default GameBoard;
