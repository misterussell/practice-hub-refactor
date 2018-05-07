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
          props.store.prebuilts.map((prebuilt, i) => {
            return (
              <PrebuiltCategory
                key={i}
                prebuilt={prebuilt}
                gridUI={props.store.rootStore.gridUI}
                gameboard={props.store.rootStore.gameboard}
              />
            )
          })
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
