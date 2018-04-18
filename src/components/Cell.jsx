import React from 'react';
import PropTypes from 'prop-types';

const Cell = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.callback(props.cellnumber);
  };
  return (
    <div
      className={props.cellstate === 0 ? 'cell' : 'cell active'}
      onClick={handleClick}
    >
      <span className="hide">
        {
          props.cell
        }
      </span>
    </div>
  );
};

Cell.propTypes = {
  cell: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired,
  cellnumber: PropTypes.number.isRequired,
  cellstate: PropTypes.number.isRequired,
};

export default Cell;
