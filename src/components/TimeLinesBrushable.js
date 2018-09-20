import React from 'react';
import SVGcontainer from './subComponents/SVGcontainer.js';
import MultiLines from './subComponents/MultiLines.js';
import Axis from './subComponents/Axis.js';
import Brush from './subComponents/Brush.js'
import {linesColorScale} from './subComponents/Colors.js'

import {scaleLinear as d3scaleLinear} from 'd3-scale';
import { getMax } from '../utils/utils.js'

const TimeLinesBrushable = (props) => {
  const {data, width, height, margins, hoveredBib, selectedBibs, onBrush} = props

  const innerWidth = width-margins.left-margins.right,
        innerHeight = height-margins.top-margins.bottom

  const xScale = d3scaleLinear().domain([0, getMax(data, "numberOfLaps")+1]).range([0, innerWidth])
  const yScale = d3scaleLinear().domain([32, 60]).range([innerHeight, 0])
  const colorScale = d3scaleLinear()
    .domain(linesColorScale.domain().map(d => d*getMax(data, "numberOfLaps")))
    .range(linesColorScale.range())

  return (
    <SVGcontainer width={width} height={height} margins={margins}>
      <Axis 
        left = {0}
        top = {innerHeight}
        label = {{ left: innerWidth/2 , 
                   top: 30, 
                   text: "Laps",
                   showLabel: true
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
      <Brush 
        width={innerWidth}
        height={innerHeight}
        dataLimits = {[1, 59]}
        scale = {xScale}
        onBrush = {onBrush}
      />
    </SVGcontainer>
  );
}

export default TimeLinesBrushable