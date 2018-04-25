import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Hero = (props) => {
  const handleClick = () => {
    props.callback();
  }

  return (
    <div className="gameover-modal">
      <h1 className="modal-title">Game Over.</h1>
      <div className="modal-text">
        <p onClick={handleClick}>
          Replay last gameboard?
        </p>
      </div>
    </div>
  );
};

export default Hero;
