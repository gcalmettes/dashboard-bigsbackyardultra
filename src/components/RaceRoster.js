import React, { Component } from 'react';
import {stratify as d3stratify, pack as d3pack} from 'd3-hierarchy'

import RaceRosterTooltip from './RaceRosterTooltip.js'


const margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 350 - margin.left - margin.right,
      height = 350 - margin.top - margin.bottom;


// Declare layout
const pack = d3pack()
  .size([width - 2, height - 2])
  .padding(3)

const stratify = d3stratify()
    .parentId(d => d.parent)
    .id(d => d.bib)

const colors = {
  'M': '#aad28c',
  'F': '#ffc38a'
}


export default class RaceRoster extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [
        {bib: 'roster', parent: ""},
        ...this.props.runnersData
      ],
    }
    this.isHovered = this.isHovered.bind(this)
  }

  isHovered(node){
    return node.id === this.props.hoveredBib
  }

  render() {
    const root = stratify(this.state.data)
      .sum(d => d.numberOfLaps)
    pack(root)

    const runners = root.descendants().map(node => {
      return (
        <g transform={`translate(${node.x}, ${node.y})`} key={`circle${node.id}`} 
           onMouseOver={() => this.props.onHover(node.id)}
           onMouseOut={() => this.props.onHover(null)}
           style={{opacity: node.depth !== 0 && this.props.hoveredBib && !this.isHovered(node) && 0.3}}>
          <circle 
            cx={0}
            cy={0} 
            r={node.r} 
            fill={node.depth === 0 ? 'None' : this.isHovered(node) ? '#49ABF3' : colors[node.data.runner.gender]}
            stroke="black"
          />
          { node.depth !== 0 && // if not root node add text
            (!this.isHovered(node)
              ? <text style={{
                  textAnchor: 'middle', 
                  alignmentBaseline: "central",
                  fontSize: "10px"}}
                >{node.data.runner.firstName.substring(0, node.r / 3)}
                </text>
              : <RaceRosterTooltip 
                  firstName={node.data.runner.firstName} 
                  lastName={node.data.runner.lastName}
                  r={node.r}
                />
            )
          } 
        </g>
      )
    });

    return (
      <div style={{display: 'inline-block'}}>
        <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {runners}
          </g>
        </svg>
      </div>
    );
  }
}
