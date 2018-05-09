import React, { Component } from 'react';

const D3Rect = (props) => {
  const handleClick = () => {
    props.callBack(props.index)
  }

  return (
    <rect
      width="10"
      height="10"
      fill={props.active ? '#222' : '#fff'}
      stroke="black"
      strokeWidth="1"
      x={10*props.col}
      y={10*props.row}
      onClick={handleClick} />
  )
}

export default D3Rect;
