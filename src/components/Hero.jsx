import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Hero = () => (
  <Jumbotron>
    <h1>Game Over.</h1>
    <p>
      Your game is over.
    </p>
  </Jumbotron>
);

export default Hero;
