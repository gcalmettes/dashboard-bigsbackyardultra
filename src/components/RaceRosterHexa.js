import React from 'react';
import SVGcontainer from './subComponents/SVGcontainer.js';
import HexaVoronoi from './subComponents/HexaVoronoi.js'

import {colorsHash} from './subComponents/Colors.js'

const RaceRoster = (props) =>{
  const {runnersData, width, height, margins, hoveredBib, selectedBibs, onHover, onClick} = props

  return (
    <SVGcontainer width={width} height={height} margins={margins}>
      <text x={5} y={20}>Roster</text>
      <HexaVoronoi
        width = {width}
        height = {height}
        margins = {margins}
        runnersData = {runnersData}
        hoveredBib = {hoveredBib}
        selectedBibs = {selectedBibs}
        onHover = {onHover}
        onClick = {onClick}
      />
      <g transform={`translate(${0},${0.8*height})`} onMouseMove={() => onHover(null)}>
        <rect x={0} y={0} width={10} height={10} stroke={'black'}  fill={colorsHash['F']} />
        <rect x={0} y={15} width={10} height={10} stroke={'black'} fill={colorsHash['M']} />
        <text x={15} y={0+5} dy={'0.32em'}>Female</text>
        <text x={15} y={15+5} dy={'0.32em'}>Male</text>
      </g>
      <g transform={`translate(${0.62*width},${0.85*height})`} onMouseMove={() => onHover(null)}>
        {[150, 75, 30, 10].map((s,i) => 
          <circle 
            cx={0} cy={Math.sqrt(59)-Math.sqrt(s)} r={Math.sqrt(s)} 
            stroke={'black'}  fill={'lightgray'} key={`c-${i}`} />)}
        <text x={15} y={0} dy={'-0.3em'}>Number of</text>
        <text x={15} y={15} dy={'-0.3em'}>laps</text>
      </g>
    </SVGcontainer>
  )
}

export default RaceRoster
