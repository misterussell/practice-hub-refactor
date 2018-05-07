import React from 'react';
import PropTypes from 'prop-types';
import { PrebuiltOption } from './';

const PrebuiltCategory = (props) => {
  return (
    <div className="prebuilt-category">
      <h2 className="prebuilt-cateogry-header">
        { props.prebuilt.type }
      </h2>
      {
        props.prebuilt.configs.map((config, i) => <PrebuiltOption key={i} config={config} gridUI={props.gridUI}/>)
      }
    </div>
  )
};

PrebuiltCategory.propTypes = {
  prebuilt: PropTypes.shape({
    type: PropTypes.string.isRequired,
    configs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  gridUI: PropTypes.shape({}),
}

export default PrebuiltCategory;
