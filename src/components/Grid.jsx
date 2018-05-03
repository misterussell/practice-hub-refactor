import React from 'react';
import PropTypes from 'prop-types';

const Grid = props => (
  <div
    className={props.classname}
    style={{
      width: props.width,
      gridTemplateColumns: `${props.gridTemplate.cols}`,
      gridTemplateRows: `${props.gridTemplate.rows}`,
    }}
  >
    {
      props.children
    }
  </div>
);

Grid.propTypes = {
  classname: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  gridTemplate: PropTypes.shape({
    cols: PropTypes.string.isRequired,
    rows: PropTypes.string.isRequired,
  }).isRequired,
  width: PropTypes.number.isRequired,
}

export default Grid;
