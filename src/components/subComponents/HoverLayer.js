import React from 'react';

const HoverLayer = (props) => {
  const {width, height, survivors, mouseX, style, nLap, onMouseMove, onMouseLeave} = props

  return (
    <g>
      <line stroke = "black" strokeWidth= "2px" 
            x1={mouseX} x2={mouseX} 
            y1={0} y2={height} style={style}
      />
      <text 
        x={mouseX <= width/2 ? mouseX + 10 : mouseX - 10} 
        y={height-30} 
        textAnchor = {mouseX <= width/2 ? "start" : "end"} 
        style={style}>
          {`Lap ${nLap} (${(nLap*4.16666).toFixed(2)}mi)`}
      </text>
      <text 
        x={mouseX <= width/2 ? mouseX + 10 : mouseX - 10} 
        y={height-10} 
        textAnchor = {mouseX <= width/2 ? "start" : "end"} 
        style={style}>
          {`${survivors} runners survived`}
      </text>
      <rect width={width} height={height} fill="none" pointerEvents="all" 
        onMouseMove = {onMouseMove}
        onMouseOver = {onMouseMove} 
        onMouseLeave = {onMouseLeave}/>
    </g>
  )
}

export default HoverLayer