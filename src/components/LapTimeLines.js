import React, { Component } from 'react';
import {scaleLinear as d3scaleLinear} from 'd3-scale';
import {line as d3line,
        curveCatmullRom as d3curveCatmullRom} from 'd3-shape';
import {select as d3select} from 'd3-selection';
import {axisBottom as d3axisBottom,
        axisLeft as d3axisLeft} from 'd3-axis'


const getMax = (array, attr) => Math.max(...array.map(d => d[attr]))

const margin = {top: 20, right: 20, bottom: 50, left: 50},
      width = 1000 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

// scales
const xScale = d3scaleLinear().range([0, width]),
      yScale = d3scaleLinear().range([height, 0]).domain([30, 60])

const color = d3scaleLinear().range(["yellow", "red"])

const line = d3line()
  .x(d => xScale(d.lap))
  .y(d => yScale(d.time.asMinutes()))
  .curve(d3curveCatmullRom.alpha(0.5))

// drawing functions
const timeLine = (laps, color, key) => {
  return <path 
    d={line(laps)}
    fill='None'
    stroke = {color}
    strokeWidth = {2}
    key={key}
    />
}

const drawAxisG = (left, top, id, width, height, text, rotated=false) => {
  return  (
    <g transform={`translate(${left}, ${top})`}>
      <g id={id} transform={`translate(${0}, ${0})`}/>
      <text 
        transform={
          `translate(
            ${rotated ? -margin.left/1.5 : width/2}, 
            ${rotated ? height/2 : margin.bottom/1.5}
          )${rotated ? ` rotate(-90)` : ``}`}
          style={{textAnchor: "middle"}}>
        {text}
      </text>
    </g>)
}


export default class LapTimeLines extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: this.props.runnersData,
    }
    this.isHovered = this.isHovered.bind(this)
  }

  componentDidMount(){
    d3select("#axisLeft")
      .call(d3axisLeft().scale(yScale))
    d3select("#axisBottom")
      .call(d3axisBottom().scale(xScale))
  }

  isHovered(runner){
    return runner.bib === parseInt(this.props.hoveredBib, 10)
  }

  render() {
    xScale.domain([0, getMax(this.state.data, "numberOfLaps")])
    color.domain([0, getMax(this.state.data, "numberOfLaps")])

    // draw timeLines for non-hovered runners
    const timeLines = this.state.data
      .map(runner => (
        !this.isHovered(runner)
        && timeLine(runner.laps, color(runner.numberOfLaps), `runner${runner.bib}`)))
    // add timeLine of hovered runner on top
    timeLines.push(
      ...this.state.data.map(runner => (
        this.isHovered(runner) 
        && timeLine(runner.laps, "black",`runner${runner.bib}`))))


    return (
      <div style={{display: 'inline-block'}}>
        <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
          <g transform={`translate(${margin.left}, ${margin.top})`} width={width} height={height}>
            {drawAxisG(0, 0, "axisLeft", width, height, "Lap time (min)", true)}
            {drawAxisG(0, height, "axisBottom", width, height, "Laps")}
            {timeLines}
          </g>
        </svg>
      </div>
    );
  }
}
