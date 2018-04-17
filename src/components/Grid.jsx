import React from 'react';
import PropTypes from 'prop-types';

const Grid = props => (
  <div
    className={props.classname}
    style={{
      width: props.width,
      gridTemplateColumns: `${props.gridTemplate}`,
      gridTemplateRows: `${props.gridTemplate}`,
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
  gridTemplate: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
}

export default Grid;
