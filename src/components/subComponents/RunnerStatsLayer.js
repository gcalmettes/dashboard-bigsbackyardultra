import React from 'react';

const RunnerStatsLayer = (props) => {
  const {width, xScale, yScale, data, hoveredBib} = props

  let stats = null
  if (hoveredBib && hoveredBib !== "roster") {
    const runnerData = data.filter(runner => runner.bib === +hoveredBib)[0]

    stats = {
      fastestX: xScale(runnerData.fastest.lap),
      fastestY: yScale(runnerData.fastest.time.asMinutes()),
      fastest: runnerData.fastest.string,
      slowestX: xScale(runnerData.slowest.lap),
      slowestY: yScale(runnerData.slowest.time.asMinutes()),
      slowest: runnerData.slowest.string,
      averageY: yScale(runnerData.average.time.asMinutes()),
      average: runnerData.average.string
    }
  }

  return (
      (stats) && (
        <g>
          <g clipPath = {"url(#multilineClip)"}>
            <circle cx={stats.fastestX} cy={stats.fastestY} r={5} fill="red" stroke={"black"}/>
                  <text x={stats.fastestX} y={stats.fastestY + 20} textAnchor="start">
              {`${stats.fastest}`}
            </text>
            <circle cx={stats.slowestX} cy={stats.slowestY} r={5} fill="blue" stroke={"black"}/>
            <text x={stats.slowestX} y={stats.slowestY - 10} textAnchor="start">
              {`${stats.slowest}`}
            </text>
            <line x1={0} x2={width} y1={stats.averageY} y2={stats.averageY} 
              stroke={"black"} strokeDasharray="4 2"/>
          </g>
          <text x={width} y={stats.averageY} textAnchor="start" alignmentBaseline="middle">
            {`${stats.average}`}
          </text>
        </g>
      )
  )
}

export default RunnerStatsLayer