import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cell extends Component {
  static propTypes = {
    cell: PropTypes.number.isRequired,
    callback: PropTypes.func.isRequired,
    cellnumber: PropTypes.number.isRequired,
    cellstate: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.cellstate !== nextProps.cellstate) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div
        className={this.props.cellstate === 0 ? 'cell' : 'cell active'}
        onClick={this.handleClick}
      >
        <span className="hide">
          {
            this.props.cell
          }
        </span>
      </div>
    );
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.callback(this.props.cellnumber);
  }
}

export default Cell;
