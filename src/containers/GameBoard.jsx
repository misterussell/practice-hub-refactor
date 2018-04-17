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
      return {
        gridSize,
        cells: Store.cells.createCellArray((gridSize) ** 2),
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
