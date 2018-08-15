import React from 'react';
import {line as d3line,
        curveCatmullRom as d3curveCatmullRom} from 'd3-shape';

const isHovered = (runner, hoveredBib) => runner.bib === parseInt(hoveredBib, 10)
const isSelected = (runner, selectedBibs) => selectedBibs && selectedBibs.includes(`${runner.bib}`)

const getRunnerPath = (runner, path, color, strokeWidth, opacity) => {
  return <path 
            d={path}
            fill='None'
            stroke = {color}
            strokeWidth = {strokeWidth}
            opacity = {opacity}
            key={`runner${runner.bib}`}
          />
}

const MultiLines = (props) => {

  const {data, xScale, yScale, colorScale, hoveredBib, selectedBibs} = props      
  
  const line = d3line()
    .x(d => xScale(d.lap))
    .y(d => yScale(d.time.asMinutes()))
    .curve(d3curveCatmullRom.alpha(0.5))

  let timeLines

  if (selectedBibs.length <= 0) {
    // If no selection, draw timeLines of all runners in colors
    // add hovered runner in black on top
    const nonSelected = [],
          hovered = []

    data.forEach(runner => {
      const isRunnerHovered = isHovered(runner, hoveredBib)
      if (isRunnerHovered) {
        hovered.push(getRunnerPath(runner, line(runner.laps), 'black', 2, 1))
      } else {
        nonSelected.push(getRunnerPath(runner, line(runner.laps), colorScale(runner.numberOfLaps), 1, 1))
      }
    })

    timeLines = [...nonSelected, ...hovered]
  
  } else {
    // draw non selected runners in gray
    // add selected runners in color on top
    // add hovered runner in black on top
    const nonSelected = [],
          selected = [],
          hovered = []

    data.forEach(runner => {
      const isRunnerSelected = isSelected(runner, selectedBibs)
      const isRunnerHovered = isHovered(runner, hoveredBib)

      if (isRunnerHovered) {
        hovered.push(getRunnerPath(runner, line(runner.laps), 'black', 2, 1))
      } else if (isRunnerSelected) {
        selected.push(getRunnerPath(runner, line(runner.laps), colorScale(runner.numberOfLaps), 2, 1))
      } else {
        nonSelected.push(getRunnerPath(runner, line(runner.laps), 'gray', 1, 0.3))
      }
    })

    timeLines = [...nonSelected, ...selected, ...hovered]
  }

  return (
    <g clipPath = {"url(#multilineClip)"}>
      {timeLines}        
    </g>
  );
}

export default MultiLines
