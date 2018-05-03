import React from 'react';
import PropTypes from 'prop-types';

const PrebuiltOption = (props) => {
  return (
    <div className="prebuilt-option">
      <h3 className="prebuilt-subheader">
        { props.config.name }
      </h3>

    </div>
  )
};

PrebuiltOption.propTypes = {
  config: PropTypes.shape({
    name: PropTypes.string.isRequired,
    config: PropTypes.arrayOf(PropTypes.number).isRequired,
    rowLength: PropTypes.number.isRequired,
  }).isRequired,
}

export default PrebuiltOption;
