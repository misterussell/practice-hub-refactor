import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer class GameBoard extends Component {
  // this component should observe the raw array of cells and inject them into the grid.
  render() {
    const store = this.props.location.state.store;
    return (
      <div className="universe">
        {
        }
        <button onClick={ this.addCell }>Add Cell</button>
      </div>
    );
  }

}

export default GameBoard;
