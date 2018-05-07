import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from './';

const ConfigPreview = (props) => {
  return (
    <Grid
      classname={'preview-grid'}
      width={100}
      gridTemplate={{
        cols: props.gridUI.createGridTemplate(props.rowLength, 100),
        rows: props.gridUI.createGridTemplate(props.rowLength, 100),
      }}
    >
      {
        props.config.map((cell, i) => {
          const classname = cell === 0 ? 'cell' : 'cell active';
          return (
            <div
             key={i}
             className={classname}
             style={{
               height: '10px'
             }}
            >
              <span className="hide">
                {
                  props.cell
                }
              </span>
            </div>
          )
        })
      }
    </Grid>
  )
}

ConfigPreview.propTypes = {
  config: PropTypes.arrayOf(PropTypes.number).isRequired,
  rowLength: PropTypes.number.isRequired,
  gridUI: PropTypes.shape({}).isRequired,
}

export default ConfigPreview;
