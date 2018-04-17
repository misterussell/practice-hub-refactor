// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Jumbotron } from 'react-bootstrap';
// import PropTypes from 'prop-types';
//
// import Button from './Button';
//
// import Store from '../Store';
//
// const Hero = props => (
//   <Jumbotron>
//     <h1>Game Over.</h1>
//     <p>
//       Your cells lasted { props.stats.generationStats.lifeSpan } generations.
//     </p>
//     <p>
//     <Link to={{
//       pathname:'/stats/gameOfLife',
//       state: {
//         stats: props.stats,
//         gridSettings: props.gridSettings,
//         type: 'GOLstats'
//       }
//     }}>
//       <Button
//         callback={ null }
//         classname={ 'game-button' }
//         text={ 'Click here to see more stats.' }
//       />
//     </Link>
//     <Button
//       callback={ props.close }
//       classname={ 'game-button' }
//       text={ 'Click here to play again.' }
//     />
//     </p>
//   </Jumbotron>
// )
//
// Hero.PropTypes = {
//   stats: PropTypes.shape({}).isRequired,
//   gridSettings: PropTypes.shape({}).isRequired,
// }
//
// // componentWillUnmount() {
// //   Store.tracking.clearStats();
// // }
