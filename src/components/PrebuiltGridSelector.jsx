import React from 'react';
import { PrebuiltOption } from './';

const PrebuiltGridSelector = (props) => {
  return (
    <div className="prebuilt-grid-container">
    <h1 className="prebuilt-header">
      Prebuilt Grid Elements
    </h1>
      {
        props.store.prebuilts.map((prebuilt, i) => <PrebuiltOption key={i} prebuilt={prebuilt}/>)
      }
    </div>
  );
};

export default PrebuiltGridSelector;
