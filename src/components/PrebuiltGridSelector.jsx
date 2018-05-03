import React from 'react';
import PropTypes from 'prop-types';
import { PrebuiltCategory } from './';

const PrebuiltGridSelector = (props) => {
  return (
    <div className="prebuilt-grid-container">
      <h1 className="prebuilt-header">
        Prebuilt Grid Elements
        </h1>
        {
          props.store.prebuilts.map((prebuilt, i) => <PrebuiltCategory key={i} prebuilt={prebuilt}/>)
        }
    </div>
  );
};

PrebuiltGridSelector.propTypes = {
  store: PropTypes.shape({
    prebuilts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    rootStore: PropTypes.shape({}),
  }).isRequired
}

export default PrebuiltGridSelector;
