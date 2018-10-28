import React from 'react';

import RosterTooltip from './RosterTooltip.js'
import {colorsHash} from './Colors.js'
import { isSelected, isHovered } from '../../utils/utils.js'

import { voronoiMapSimulation } from 'd3-voronoi-map'
import { line } from 'd3-shape'

import seedrandom from 'seedrandom'


const computeHexaClip = (width, height) => {
  const hexRadius = Math.min(width, height)/2

  const hexagonPoly = [...new Array(6)].map((p,i) => {
    const angle_deg = 60 * i - 30
    const angle_rad = Math.PI / 180 * angle_deg
    return {x: width/2 + hexRadius * Math.cos(angle_rad),
            y: height/2 + hexRadius * Math.sin(angle_rad)}
  })
  return hexagonPoly
}

const cellLiner = line()
  .x(d => d[0])
  .y(d => d[1]);


const getRunnerCell = (polygon, isHovered, fill, strokeColor, strokeWidth, opacity, onHover, onClick) => {
  // console.log(isHovered)
  const runner = polygon.site.originalObject.data.originalData
  return (
    <g transform={`translate(${polygon.site.x}, ${polygon.site.y})`} 
      className="voronoiCell"
      key = {`vorocell-${runner.bib}`} 
      onMouseMove={() => onHover(`${runner.bib}`)}
      onMouseOut={() => onHover(null)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(runner.bib)}
      opacity = {opacity}
    >
      <path 
        d={`${cellLiner(polygon.map(([x,y])=>[x-polygon.site.x,y-polygon.site.y]))}z`}
        fill = {fill}
        stroke = {strokeColor}
        strokeWidth = {strokeWidth}
      />
      {(!isHovered) &&
        <text 
          style={{
            textAnchor: 'middle', 
            alignmentBaseline: "central",
            fontSize: "10px"
        }}>
         {runner.runner.firstName.substring(0, Math.sqrt(polygon.site.weight)/3.5)} 
        </text>
      }
    </g>
  )
}

class HexaVoronoi extends React.Component {
  constructor() {
    super();
    this.state = {
      simulated: false,
      polygons: []
    }
    this.computePolygons = this.computePolygons.bind(this)
  }

  componentWillMount(){
    const {runnersData, width, height, margins} = this.props
    const w = width - margins.left - margins.right,
          h = height - margins.top - margins.bottom
    this.computePolygons(runnersData, w, h)
  }

  computePolygons(data, width, height){
    const seedRng = seedrandom('lastone')
    const simulation = voronoiMapSimulation(data)
      .weight(d => d.numberOfLaps)
      .clip(computeHexaClip(width, height).map(d => [d.x, d.y]))
      .prng(seedRng)
      .stop();
    
    let state = simulation.state();
     
    while (!state.ended) {
      simulation.tick();
      state = simulation.state();
    }
     
    const polygons = state.polygons;

    this.setState({simulated: true, polygons: polygons}) 
  }

  render(){

  const {margins, hoveredBib, selectedBibs, onHover, onClick} = this.props

  const width = this.props.width - margins.left - margins.right,
        height = this.props.height - margins.top - margins.bottom

  
  const polygons = this.state.polygons

  let hoveredRunner = [],
      selectedRunners = [],
      runners = [],
      tooltip = []

  polygons.forEach(p => {
    const runner = p.site.originalObject.data.originalData
    const isNodeSelected = isSelected(runner, selectedBibs, false)
    const isNodeHovered = isHovered({id: `${runner.bib}`}, hoveredBib)

    let colorStroke = "black"
    if (isNodeSelected) {
      colorStroke = isNodeSelected
    }

    if (isNodeSelected) {
      
      let colorFill = colorsHash[runner.runner.gender]
      let addTooltip = false
      if (isNodeHovered){
        colorFill = colorsHash["hoveredFill"]
        addTooltip = true
      }

      selectedRunners.push(
        getRunnerCell(
          p, isNodeHovered, 
          colorFill,
          colorStroke,
          isNodeSelected ? 4 : 1, 
          1, onHover, onClick
        )
      )

      if (addTooltip) {
        tooltip.push(
          <RosterTooltip node={{depth: 1, x: p.site.x, y: p.site.y, r: Math.sqrt(p.site.weight), data: runner}} key={`tooltip-${runner.bib}`}/>
        )
      } 

    } else if (isNodeHovered) {
      hoveredRunner.push(
        getRunnerCell(
          p, isNodeHovered, 
          colorsHash["hoveredFill"],
          colorStroke,
          isNodeSelected ? 4 : 1, 
          1, onHover, onClick
        )
      )
      tooltip.push(
        <RosterTooltip node={{depth: 1, x: p.site.x, y: p.site.y, r: Math.sqrt(p.site.weight), data: runner}} width={width} key={`tooltip-${runner.bib}`}/>
      )
    } else {
      runners.push(
        getRunnerCell(
          p, isNodeHovered, 
          colorsHash[runner.runner.gender], 
          colorStroke,
          isNodeSelected ? 4 : 1, 
          hoveredBib ? 0.3 : 1,
          onHover, onClick
        )
      )
    }
  })

  const allRunners = [...runners, ...selectedRunners, ...hoveredRunner, ...tooltip]

  return (
    <g>
      <rect 
        x={0}
        y={0}
        width={width}
        height={height}
        fill={'red'}
        opacity={0}
        onMouseMove={() => onHover(null)}
      />
      {allRunners}    
    </g>
  );
  }
}

export default HexaVoronoi
