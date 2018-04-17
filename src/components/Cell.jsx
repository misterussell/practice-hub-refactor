import React from 'react';
import PropTypes from 'prop-types';

const Cell = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.callback(props.cellnumber);
  };
  return (
    <button
      className={props.cellstate === 0 ? 'cell' : 'cell active'}
      onClick={handleClick}
    >
      <div className="hide">
        {
          props.cell
        }
      </div>
    </button>
  );
};

Cell.propTypes = {
  cell: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired,
  cellnumber: PropTypes.number.isRequired,
  cellstate: PropTypes.number.isRequired,
};

export default Cell;
