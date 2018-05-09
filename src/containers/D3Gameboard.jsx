import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { D3Rect } from '../components/';

@observer class D3Gameboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cells = this.props.store.rootStore.objectGameboard.cells.map(cell => {
      return (
        <D3Rect
          key={cell.index}
          index={cell.index}
          col={cell.col}
          row={cell.row}
          active={cell.active}
          callBack={this.handleClick}
        />
      )
    });
    return (
      <div className="d3-gameboard">
        <svg width="501" height="501">
          { cells }
        </svg>
      </div>
    )
  }

  handleClick = (cell) => {
    console.log(cell);
    this.props.store.rootStore.objectGameboard.updateCell(cell);
  }
}

export default D3Gameboard;
