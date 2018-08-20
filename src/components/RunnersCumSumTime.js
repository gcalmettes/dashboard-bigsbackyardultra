import React from 'react';
import moment from 'moment'
import SVGcontainer from './subComponents/SVGcontainer.js'
import Axis from './subComponents/Axis.js'
import {line as d3line} from 'd3-shape'
import {scaleLinear as d3scaleLinear} from 'd3-scale'

const getMax = (array, attr) => Math.max(...array.map(d => d[attr]))
const isSelected = (runner, selectedBibs) => selectedBibs[`${runner.bib}`]

const getCumulativeTimesFor = (runner) => runner.laps
  .reduce((sum, lap) => {
    const last = sum[sum.length-1],
          cumRunTime = last.runTime.clone().add(lap.time)
    return [...sum, { lap: lap.lap,
                      runTime: cumRunTime,
                      limitTime: moment.duration(lap.lap*60, "minutes"),
                      restTime: moment.duration(lap.lap*60, "minutes").subtract(cumRunTime)
                    }]
  }, [{ lap: 0,
        runTime: moment.duration(),
        limitTime: moment.duration(),
        restTime: moment.duration()
      }
  ])

const convertToHours = (d) => ({
    lap: d.lap,
    runTime: d.runTime.asHours(),
    limitTime: d.limitTime.asHours(),
    restTime: d.restTime.asHours()
  })


const RunnersCumSumTime = (props) => {
  const {data, width, height, margins, selectedBibs} = props
  const innerWidth = width-margins.left-margins.right,
        innerHeight = height-margins.top-margins.bottom


  const runners = []
  data.forEach(runner => {
    const isSelectedRunner = isSelected(runner, selectedBibs)
    if (isSelectedRunner) {
      console.log(runner)
      runners.push({
        bib: runner.bib,
        color: isSelectedRunner,
        cumSum: getCumulativeTimesFor(runner).map(d => convertToHours(d))
      })
    }
  })

  const max = getMax(data, "numberOfLaps")+1

  const timeLoopLimit = [...Array(max)].map((d,i) => i)
    .map(d => ({lap: d, limitTime: d}))

  const xScale = d3scaleLinear().domain([0, max+1]).range([0, innerWidth]),
        yScale = d3scaleLinear().domain([0, max+1]).range([innerHeight, 0])

  const lineTime = d3line()
    .x(d => xScale(d.lap))
    .y(d => yScale(d.runTime))

  const lineLimit = d3line()
    .x(d => xScale(d.lap))
    .y(d => yScale(d.limitTime))

  return (
    <SVGcontainer width={width} height={height} margins={margins}>
      <path d={lineLimit(timeLoopLimit)} stroke={"gray"} fill="None" strokeDasharray="4 2" />
      {(runners.length>0) && runners.map(runner => (
        <path 
          d={lineTime(runner.cumSum)} 
          stroke={runner.color} 
          fill="None" 
          key={`line-${runner.bib}`}
        />
      ))}
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
      <Axis 
        left = {0}
        top = {0}
        label = {{ left: -30 , 
                   top: innerHeight/2 , 
                   text: "Cummulative time",
                   showLabel: true
                 }}
        scale = {yScale}
        orientation = "left"
      />
    </SVGcontainer>
  );
}

export default RunnersCumSumTime