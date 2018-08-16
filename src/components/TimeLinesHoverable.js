import React from 'react';
import SVGcontainer from './subComponents/SVGcontainer.js';
import MultiLines from './subComponents/MultiLines.js';
import Axis from './subComponents/Axis.js';
import HoverRunnersLeftLayer from './subComponents/HoverRunnersLeftLayer.js'
import RunnerStatsLayer from './subComponents/RunnerStatsLayer.js'
import {linesColorScale} from './subComponents/Colors.js'

import {scaleLinear as d3scaleLinear} from 'd3-scale';


const getMax = (array, attr) => Math.max(...array.map(d => d[attr]))

const TimeLinesHoverable = (props) => {
  const {data, width, height, margins, hoveredBib, xRange, selectedBibs} = props

  const innerWidth = width-margins.left-margins.right,
        innerHeight = height-margins.top-margins.bottom

  const xScaleRange = xRange ? xRange : [0, getMax(data, "numberOfLaps")+1]

  const xScale = d3scaleLinear().domain(xScaleRange).range([0, innerWidth])
  const yScale = d3scaleLinear().domain([32, 60]).range([innerHeight, 0])
  const colorScale = d3scaleLinear()
    .domain(linesColorScale.domain().map(d => d*getMax(data, "numberOfLaps")))
    .range(linesColorScale.range())
  
  return (
    <SVGcontainer width={width} height={height} margins={margins}>
      <defs>
        <clipPath id="multilineClip">
          <rect x={0} y={-margins.top} width={innerWidth} height={margins.top+innerHeight}></rect>
        </clipPath>
      </defs>
      <Axis 
        left = {0}
        top = {0}
        label = {{ left: -30 , 
                   top: innerHeight/2 , 
                   text: "Lap time (min)",
                   showLabel: true
                 }}
        scale = {yScale}
        orientation = "left"
      />
      <Axis 
        left = {0}
        top = {innerHeight}
        label = {{ left: innerWidth/2 , 
                   top: 30, 
                   text: "Laps",
                   showLabel: false
                 }}
        scale = {xScale}
        orientation = "bottom"
      />
      <MultiLines 
        data = {data}
        xScale = {xScale}
        yScale = {yScale}
        colorScale = {colorScale}
        hoveredBib = {hoveredBib}
        selectedBibs = {selectedBibs}
      />
      <RunnerStatsLayer 
        width = {innerWidth} 
        xScale = {xScale}
        yScale = {yScale}
        data = {data}
        hoveredBib = {hoveredBib}
      />
      <HoverRunnersLeftLayer 
        width = {innerWidth} 
        height = {innerHeight}
        data = {data}
        xScale = {xScale} 
        yScale = {yScale}
        selectedBibs = {selectedBibs}
      />
    </SVGcontainer>
  );
}

export default TimeLinesHoverable