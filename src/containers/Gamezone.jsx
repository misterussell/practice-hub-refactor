import React from 'react';
import { Gameboard } from './';
import { PrebuiltGridSelector } from '../components';

const Gamezone = (props) => (
  <div className="game-zone">
    <Gameboard store={props.store} />
    <PrebuiltGridSelector store={props.store}/>
  </div>
);

export default Gamezone;
