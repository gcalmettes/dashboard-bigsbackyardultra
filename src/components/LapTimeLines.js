import React from 'react';
import SVGcontainer from './subComponents/SVGcontainer.js';
import MultiLines from './subComponents/MultiLines.js';
import Axis from './subComponents/Axis.js';
import Brush from './subComponents/Brush.js'

import {scaleLinear as d3scaleLinear} from 'd3-scale';


const getMax = (array, attr) => Math.max(...array.map(d => d[attr]))

const LapTimeLines = (props) => {
  const {data, width, height, margins, hoveredBib, selectedBibs} = props

  const innerWidth = width-margins.left-margins.right,
        innerHeight = height-margins.top-margins.bottom

  const xScale = d3scaleLinear().domain([0, getMax(data, "numberOfLaps")+1]).range([0, innerWidth])
  const yScale = d3scaleLinear().domain([30, 60]).range([innerHeight, 0])
  const colorScale = d3scaleLinear().range(["yellow", "red"]).domain([0, getMax(data, "numberOfLaps")])
  
  const xScaledBrushed = d3scaleLinear()
  props.brushedLaps && xScaledBrushed.domain(props.brushedLaps).range([0, innerWidth])

  return (
    <SVGcontainer width={width} height={height} margins={margins}>
      {props.drawAxis.map(d => d.axis).includes("left") && 
        <Axis 
          left = {0}
          top = {0}
          label = {{ left: -30 , 
                     top: innerHeight/2 , 
                     text: "Lap time (min)",
                     show: props.drawAxis.filter(d => d.axis === "left")[0].label
                   }}
          scale = {yScale}
          orientation = "left"
        />}
      {props.drawAxis.map(d => d.axis).includes("bottom") && 
        <Axis 
          left = {0}
          top = {innerHeight}
          label = {{ left: innerWidth/2 , 
                     top: 30, 
                     text: "Laps",
                     show: props.drawAxis.filter(d => d.axis === "bottom")[0].label
                   }}
          scale = {props.brushedLaps ? xScaledBrushed : xScale}
          orientation = "bottom"
        />}
      <MultiLines 
        width = {innerWidth} 
        height = {innerHeight}
        data = {data}
        xScale = {props.brushedLaps ? xScaledBrushed : xScale}
        yScale = {yScale}
        colorScale = {colorScale}
        hoveredBib = {hoveredBib}
        selectedBibs = {selectedBibs}
        actionOnMouseOver ={props.actionOnMouseOver}
      />
      {props.brush && 
        <Brush 
          width={innerWidth}
          height={innerHeight}
          dataLimits = {[1, 59]}
          scale = {xScale}
          onBrush = {props.onBrush}
        />
      }
    </SVGcontainer>
  );
}

export default LapTimeLines