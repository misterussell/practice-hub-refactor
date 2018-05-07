import React from 'react';
import PropTypes from 'prop-types';
import { ConfigPreview } from './';

const PrebuiltOption = (props) => {
  return (
    <div className="prebuilt-option">
      <h3 className="prebuilt-subheader">
        { props.config.name }
      </h3>
      <ConfigPreview
        config={props.config.config}
        rowLength={props.config.rowLength}
        gridUI={props.gridUI}/>
    </div>
  )
};

PrebuiltOption.propTypes = {
  config: PropTypes.shape({
    name: PropTypes.string.isRequired,
    config: PropTypes.arrayOf(PropTypes.number).isRequired,
    rowLength: PropTypes.number.isRequired,
  }).isRequired,
  gridUI: PropTypes.shape({}),
}

export default PrebuiltOption;
