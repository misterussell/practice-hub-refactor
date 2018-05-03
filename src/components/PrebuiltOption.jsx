import React from 'react';
import PropTypes from 'prop-types';
import PrebuiltPreview from './'

const PrebuiltOption = (props) => {
  return (
    <div className="prebuilt-option">
      { props.prebuilt.type }
      {
        props.prebuilt.configs.map((option, i) => <PrebuiltPreview key={i} />)
      }
    </div>
  )
};

PrebuiltOption.propTypes = {
  prebuilt: PropTypes.shape({}).isRequired,
}

export default PrebuiltOption;
