import React from 'react';
import PropTypes from 'prop-types';
import { PrebuiltOption } from './';

const PrebuiltCategory = (props) => {
  return (
    <div className="prebuilt-category">
      { props.prebuilt.type }
      {
        props.prebuilt.configs.map((config, i) => <PrebuiltOption key={i} config={config} />)
      }
    </div>
  )
};

PrebuiltCategory.propTypes = {
  prebuilt: PropTypes.shape({
    type: PropTypes.string.isRequired,
    configs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
}

export default PrebuiltCategory;
