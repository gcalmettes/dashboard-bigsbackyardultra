import React from 'react';
import SVGcontainer from './subComponents/SVGcontainer.js'
import Axis from './subComponents/Axis.js'
import { histogram as d3histogram,
         extent as d3extent,
         max as d3max,
         mean as d3mean } from 'd3-array'
import { line as d3line,
         curveBasis as d3curveBasis } from 'd3-shape'
import {scaleLinear as d3scaleLinear} from 'd3-scale'


import { isSelected } from '../utils/utils.js'

const getTimesAsMinutes = (runner) => runner.laps.map(lap => lap.time.asMinutes())

// Kernel density estimation
// from https://bl.ocks.org/mbostock/4341954
const kernelDensityEstimator = (kernel, X) => 
  (V) => X.map(x => 
    [x, d3mean(V, v =>  kernel(x - v))]
  );

const  kernelEpanechnikov = (k, f=0.95) => 
  (v) => 
    Math.abs(v /= k) <= 1 ? f * (1 - v * v) / k : 0

const drawHisto = (bins, xScale, yScale, color, id) => bins.map( (bin, i) => 
  <rect 
    x = {xScale(bin.x0)} 
    y = {yScale(bin.length)} 
    width = {Math.max(0, xScale(bin.x1) - xScale(bin.x0) - 1)}
    height = {yScale(0) - yScale(bin.length)}
    fill = {color}
    opacity = {0.5}
    key = { `${id}-${i}` }
  />
)

const drawKernelDensity = (data, xScale, yScale, color, line, id) => 
  <path 
    fill={"none"}
    strokeWidth={1.5} 
    stroke={color} 
    d={line(data)}
    key={`kernel-${id}`} 
  />

const HistoTime = (props) => {
  const {data, width, height, margins, selectedBibs} = props
  const innerWidth = width-margins.left-margins.right,
        innerHeight = height-margins.top-margins.bottom

  const xScale = d3scaleLinear().range([0, innerWidth]), 
        yScale = d3scaleLinear().range([innerHeight, 0])

  const line = d3line()
    .curve(d3curveBasis)
    .x(d => xScale(d[0]))
    .y(d => yScale(d[1]))

  let binRects = [],
      allBins = [],
      allLaps = [],
      allDensities = []


  data.forEach(runner => {
    const isSelectedRunner = isSelected(runner, selectedBibs)
    if (isSelectedRunner) {
      const lapTimes = getTimesAsMinutes(runner)

      allLaps = [...allLaps, ...lapTimes]
      const extent = d3extent(allLaps)
      
      xScale.domain(extent)

      const binsGenerator = d3histogram()
        .domain(xScale.domain())
        .thresholds(xScale.ticks(40));
        
      const bins = binsGenerator(lapTimes)

      allBins = [...allBins, ...bins]
      const yScaleMax = d3max(allBins, d => d.length)

      yScale.domain([0, yScaleMax])


      const binMaxLength = bins.reduce((acc, curr) => acc >= curr.length ? acc : curr.length, 0)

      const densityData = kernelDensityEstimator(kernelEpanechnikov(2, binMaxLength*(yScaleMax/4)), xScale.ticks(40))(lapTimes);

      const densityKernel = drawKernelDensity(densityData, xScale, yScale, isSelectedRunner, line, `${runner.bib}`)
      allDensities = [...allDensities, densityKernel]

      binRects = [...binRects, ...drawHisto(bins, xScale, yScale, isSelectedRunner, `r${runner.bib}`)]
    }
  })


  return (
    <SVGcontainer width={width} height={height} margins={margins}>
      <Axis 
        left = {0}
        top = {innerHeight}
        label = {{ left: innerWidth/2 , 
                   top: 35, 
                   text: "Lap time (min)",
                   showLabel: true
                 }}
        scale = {xScale}
        orientation = "bottom"
      />
      <Axis 
        left = {0}
        top = {0}
        label = {{ left: -30 , 
                   top: innerHeight/2 , 
                   text: "Frequency",
                   showLabel: true
                 }}
        scale = {yScale}
        orientation = "left"
      />
      {binRects}
      {allDensities}
    </SVGcontainer>
  );
}

export default HistoTime