import React from 'react';
import PropTypes from 'prop-types';

const PrebuiltOption = (props) => {
  return (
    <div>
      Option to go here.
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
