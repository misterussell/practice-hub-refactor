import React from 'react';
import { PrebuiltOption } from './';

const PrebuiltGridSelector = (props) => {
  return (
    <div className="prebuilt-grid-container">
      {
        props.store.prebuilts.map(type => <PrebuiltOption />)
      }
    </div>
  );
};

export default PrebuiltGridSelector;
