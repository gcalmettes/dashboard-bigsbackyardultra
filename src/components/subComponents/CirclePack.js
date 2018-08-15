import React from 'react';
import {stratify as d3stratify, 
        pack as d3pack} from 'd3-hierarchy'
import CirclePackTooltip from './CirclePackTooltip.js'

const isHovered = (node, hoveredBib) => node.id === hoveredBib
const isSelected = (node, selectedBibs) => selectedBibs && selectedBibs.includes(node.id)

const getRunnerCircle = (node, isHovered, fill, strokeColor, strokeWidth, opacity, onHover, onClick) => {
  return (
    <g transform={`translate(${node.x}, ${node.y})`} 
      key = {`circle${node.id}`} 
      onMouseMove={(node.depth !== 0) ? () => onHover(node.id) : () => onHover(null)}
      onMouseOut={() => onHover(null)}
      onClick={() => onClick(node.id)}
      opacity = {opacity}
    >
      <circle 
        cx = {0}
        cy = {0} 
        r = {node.r} 
        fill = {fill}
        stroke = {strokeColor}
        strokeWidth = {strokeWidth}
      />
      {(node.depth !== 0) && (!isHovered) &&
        <text 
          style={{
            textAnchor: 'middle', 
            alignmentBaseline: "central",
            fontSize: "10px"
          }}
        >
          {node.data.runner.firstName.substring(0, node.r / 3)}
        </text>
      }      } 
    </g>
  )
}

const colors = {
  'M': '#aad28c',
  'F': '#ffc38a',
  selectedStroke: "red",
  hoveredFill: "#49ABF3"
}

const CirclePack = (props) => {

  const {runnersData, margins, hoveredBib, selectedBibs, onHover, onClick} = props

  // add root note
  const data = [{bib: 'roster', parent: ""}, ...runnersData]

  const width = props.width - margins.left - margins.right,
        height = props.height - margins.top - margins.bottom

  const stratify = d3stratify()
    .parentId(d => d.parent)
    .id(d => d.bib)

  const root = stratify(data)
    .sum(d => d.numberOfLaps)

  // Declare layout
  const pack = d3pack()
    .size([width - 2, height - 2])
    .padding(3)

  pack(root)

  let hoveredRunner = [],
      runners = []

  root.descendants().forEach(node => {
    const isNodeSelected = isSelected(node, selectedBibs)
    const isNodeHovered = isHovered(node, hoveredBib)

    if (isNodeHovered) {
      hoveredRunner.push(
        getRunnerCircle(
          node, true, 
          node.depth !== 0 ? colors["hoveredFill"] : "None", 
          isNodeSelected ? colors['selectedStroke'] : "black",
          isNodeSelected ? 4 : 1, 
          1, onHover, onClick
        )
      )
      hoveredRunner.push(
        <CirclePackTooltip node={node} key={`tooltip-${node.id}`}/>
      )
    } else {
      runners.push(
        getRunnerCircle(
          node, false, 
          node.depth !== 0 ? colors[node.data.runner.gender] : "white", 
          isNodeSelected ? colors['selectedStroke'] : "black",
          isNodeSelected ? 4 : 1, 
          hoveredBib ? 0.3 : 1,
          onHover, onClick
        )
      )
    }
  })

  runners = [...runners, hoveredRunner]
  
  return (
    <g>
      {runners}        
    </g>
  );
}

export default CirclePack
