import React, { Component } from 'react';
import { observer } from 'mobx-react';
import * as d3 from 'd3';

@observer class BasicD3Grid extends Component {
  constructor(props) {
    super(props);
    // usese store.rootStore.objectGameboard as props
    console.log(this.props);
    this.svg = React.createRef();
  }

  componentDidMount() {
    let grid = d3.select(this.svg)
                  .append('g')
                  .attr('width', '110px')
                  .attr('height', '110px');

    let row = grid.selectAll('.row')
                  .data(this.props.cells)
                  .enter().append('g')
                  .attr('class', 'row');

    let column = row.selectAll('.square')
                    .data(d => d)
                    .enter().append('rect')
                    .attr('class', 'square')
                    .attr('x', d => d.x)
                    .attr('y', d => d.y)
                    .attr('width', 50)
                    .attr('height', 50)
                    .style('fill', d => d.active ? '#222' : '#fff')
                    .style('stroke', '#222')
                    .on('click', d => {
                      d3.event.preventDefault();
                      d3.event.stopPropagation();
                      d3.select(this).style('fill', '#222')
                      this.handleClick(d.row, d.column)
                    });
  }

  componentDidUpdate() {
      let grid = d3.select(this.svg)
                    .append('g')
                    .attr('width', '110px')
                    .attr('height', '110px');

      let row = grid.selectAll('.row')
                    .data(this.props.cells)
                    .enter().append('g')
                    .attr('class', 'row');

      let column = row.selectAll('.square')
                      .data(d => d)
                      .enter().append('rect')
                      .attr('class', 'square')
                      .attr('x', d => d.x)
                      .attr('y', d => d.y)
                      .attr('width', 50)
                      .attr('height', 50)
                      .style('fill', d => d.active ? '#222' : '#fff')
                      .style('stroke', '#222')
                      .on('click', d => {
                        d3.event.preventDefault();
                        d3.event.stopPropagation();
                        this.handleClick(d.row, d.column)
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

  handleClick = (x, y) => {
    this.props.callBack(x, y);
  }
}

export default BasicD3Grid;
