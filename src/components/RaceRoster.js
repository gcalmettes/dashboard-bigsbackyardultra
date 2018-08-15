import React from 'react';
import {stratify as d3stratify, pack as d3pack} from 'd3-hierarchy'

import RaceRosterTooltip from './RaceRosterTooltip.js'


export default class RaceRoster extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      data: [
        {bib: 'roster', parent: ""},
        ...this.props.runnersData
      ],
    }
    this.isHovered = this.isHovered.bind(this)
    this.isSelected = this.isSelected.bind(this)
  }

  isHovered(node){
    return node.id === this.props.hoveredBib
  }

  isSelected(node){
    return this.props.selectedBibs.includes(node.id)
  }

  render() {
    const {margins} = this.props,
          width = this.props.width - margins.left - margins.right,
          height = this.props.height - margins.top - margins.bottom

    const stratify = d3stratify()
      .parentId(d => d.parent)
      .id(d => d.bib)

    const root = stratify(this.state.data)
      .sum(d => d.numberOfLaps)

    // Declare layout
    const pack = d3pack()
      .size([width - 2, height - 2])
      .padding(3)

    pack(root)

    const colors = this.props.colorHash

    const runners = root.descendants().map(node => {
      const isNodeSelected = this.isSelected(node)
      const isNodeHovered = this.isHovered(node)
      return (
        <g transform={`translate(${node.x}, ${node.y})`} 
           key = {`circle${node.id}`} 
           onMouseOver={() => this.props.onHover(node.id)}
           onMouseLeave={() => this.props.onHover(null)}
           onClick={() => this.props.onClick(node.id)}
           style={{opacity: node.depth !== 0 && this.props.hoveredBib && !this.isHovered(node) && 0.3}}>
          <circle 
            cx = {0}
            cy = {0} 
            r = {node.r} 
            fill = {
              node.depth === 0 
                ? 'None' 
                : isNodeHovered 
                  ? '#49ABF3' 
                  : colors[node.data.runner.gender]
            }
            stroke = {
              isNodeSelected
                ? "red"
                : "black" 
            }
            strokeWidth = {
              isNodeSelected
                ? "4px"
                : "1px" 
            }
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
        <svg width={width + margins.left + margins.right} height={height + margins.top + margins.bottom}>
          <g transform={`translate(${margins.left}, ${margins.top})`}>
            {runners}
          </g>
        </svg>
      </div>
    );
  }
}
