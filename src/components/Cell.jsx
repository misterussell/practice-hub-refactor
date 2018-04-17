import React from 'react';
import PropTypes from 'prop-types';

const Cell = (props) => {
  const handleClick = (e) => {
    props.callback(props.cellnumber);
  };
  return (
  <div
    className={props.cellstate === 0 ? 'cell' : 'cell active'}
    onClick={handleClick}
  >
    <div className="hide">
      {
        props.cell
      }
    </div>
  </div>
);
};

Cell.propTypes = {
  callback: PropTypes.func.isRequired,
  cellnumber: PropTypes.number.isRequired,
  cellstate: PropTypes.number.isRequired,
  style: PropTypes.shape({}).isRequired,
}

export default Cell;
