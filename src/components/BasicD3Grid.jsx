import React, { Component } from 'react';
import * as d3 from 'd3';

// this function is almost identical to my toroidal array/cell generator
// I should be able to send the hashMap through this rather than the single
// flat array
function gridData() {
  let data = new Array();
  let xpos = 1;
  let ypos = 1;
  let width = 50;
  let height = 50;
  let index = 0;

  for (let row = 0; row < 10; row++) {
    data.push(new Array());

    for (let column = 0; column < 10; column++) {
      data[row].push({
        x: xpos,
        y: ypos,
        width,
        height,
        active: false,
        index
      });
      xpos += width;
      index += 1;
    };
    xpos = 1;
    ypos += height;
  };
  return data;
}

class BasicD3Grid extends Component {
  constructor(props) {
    super(props);
    this.state = { gridData: gridData() };
    this.svg = React.createRef();
  }

  componentDidMount() {
    let grid = d3.select(this.svg)
                  .append('g')
                  .attr('width', '510px')
                  .attr('height', '510px');

    let row = grid.selectAll('.row')
                  .data(this.state.gridData)
                  .enter().append('g')
                  .attr('class', 'row');

    let column = row.selectAll('.square')
                    .data(d => d)
                    .enter().append('rect')
                    .attr('class', 'square')
                    .attr('x', d => d.x)
                    .attr('y', d => d.y)
                    .attr('width', d => d.width)
                    .attr('height', d => d.height)
                    .style('fill', "#fff")
                    .style('stroke', '#222')
                    .on('click', d => {
                      d3.event.preventDefault();
                      d3.event.stopPropagation();
                      this.handleClick(d.index);
                    });
  }

  render() {
    return (
      <svg
        className="game"
        ref={ svg => this.svg = svg }
        style={{  height: '510px', width: '510px' }}
      />
    );
  }

  handleClick = (index) => {
    console.log('clicked' + index);
  }
}

export default BasicD3Grid;