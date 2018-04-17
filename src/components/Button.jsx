import React from 'react';
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types';

const GameButton = props => (
  <Button
    onClick={props.callback === null ? null : this.props.callback()}
    bsStyle="primary"
    disabled={props.disabled}
  >
    {
      props.text
    }
  </Button>
);

GameButton.propTypes = {
  text: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default GameButton;
