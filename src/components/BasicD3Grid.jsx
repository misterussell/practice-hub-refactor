import React, { Component } from 'react';
import { observer } from 'mobx-react';
import * as d3 from 'd3';

@observer class BasicD3Grid extends Component {
  constructor(props) {
    super(props);
    this.svg = React.createRef();
  }

  componentWillMount() {
  }

  componentDidMount() {
    let grid = d3.select(this.svg)
                  .append('g')
                  .attr('width', '110px')
                  .attr('height', '110px');

    let row = grid.selectAll('.row')
                  .data(this.props.store.rootStore.objectGameboard.cells)
                  .enter().append('g')
                  .attr('class', 'row');

    let column = row.selectAll('.square')
                    .data(d => d)
                    .enter().append('rect')
                    .attr('class', 'square')
                    .attr('x', d => d.x)
                    .attr('y', d => d.y)
                    .attr('width', 10)
                    .attr('height', 10)
                    .style('fill', d => d.fill)
                    .style('stroke', '#222')
                    .on('click', d => {
                      d3.event.preventDefault();
                      d3.event.stopPropagation();
                      d.activate();
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

  handleClick = () => {
    console.log('click');
  }
}

export default BasicD3Grid;
