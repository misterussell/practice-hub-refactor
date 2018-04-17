import React, { Component } from 'react';

import Store from '../Store';

class GameBoard extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      gridSize: 0,
      minGridSize: 5,
      userGridSelection: 0,
      cells: [],
    };
  }

  componentWillMount() {
    this.setState((prevState) => {
      const gridSize = prevState.userGridSelection + prevState.minGridSize;
      Store.cells.newCellArray((gridSize) ** 2);
      const cells = Store.cells.cells;
      return {
        gridSize,
        cells,
      };
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="universe">
        Complete Board
      </div>
    );
  }
}

export default GameBoard;
