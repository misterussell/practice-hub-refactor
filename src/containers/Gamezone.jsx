import React from 'react';
import { Gameboard } from './';
import { PrebuiltGridSelector } from '../components';

const Gamezone = (props) => (
  <div className="game-zone">
    <PrebuiltGridSelector store={props.store}/>
    <Gameboard store={props.store} />
  </div>
);

export default Gamezone;
