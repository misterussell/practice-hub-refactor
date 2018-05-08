import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { PrebuiltOption } from './';

@observer class PrebuiltCategory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="prebuilt-category">
        <h2 className="prebuilt-cateogry-header">
          { this.props.prebuilt.type }
        </h2>
        {
          this.props.prebuilt.configs.filter(config => config.rowLength <= this.props.gameboard.totalRowLength)
                                     .map((config, i) => {
                                       return (
                                         <PrebuiltOption
                                           key={i}
                                           config={config}
                                           gridUI={this.props.gridUI}
                                           gameboard={this.props.gameboard}
                                         />
                                       )
                                     })
        }
      </div>
    )
  }
};

PrebuiltCategory.propTypes = {
  prebuilt: PropTypes.shape({
    type: PropTypes.string.isRequired,
    configs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  gridUI: PropTypes.shape({}),
  gameboard: PropTypes.shape({}),
}

export default PrebuiltCategory;
