import React from 'react';

const StatsLayer = (props) => {
  const {width, dPath, showStats, stats} = props

  const {fastestX, fastestY, fastest,
         slowestX, slowestY, slowest,
         averageY, average} = stats

  return (
    <g>
      <path 
        d={dPath}
        fill='None'
        stroke = "black"
        strokeWidth = {2}
        clipPath = "url(#clip)"
      />
      {(showStats) 
        &&  <g>
              <circle cx={fastestX} cy={fastestY} r={5} fill="red" stroke={"black"}/>
              <text x={fastestX} y={fastestY + 20} textAnchor="start">
                {`${fastest}`}
              </text>
              <circle cx={slowestX} cy={slowestY} r={5} fill="blue" stroke={"black"}/>
              <text x={slowestX} y={slowestY - 10} textAnchor="start">
                {`${slowest}`}
              </text>
              <line x1={0} x2={width} y1={averageY} y2={averageY} 
                stroke={"black"} strokeDasharray="4 2"/>
              <text x={width} y={averageY} textAnchor="start" alignmentBaseline="middle">
                {`${average}`}
              </text>
            </g>
      }
    </g>
  )
}

export default StatsLayer