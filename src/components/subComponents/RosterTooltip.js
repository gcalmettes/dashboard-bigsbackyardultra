import React from 'react';

const RosterTooltip = (props) => {
  const {node, width} = props
  const xShift = (node.x < width-100)
    ? node.x + node.r + 10
    : node.x - node.r - 10
  const yShift = node.y < 70 
    ? node.y + node.r + 70
    : node.y
  return ((node.depth !==0) &&
    <g transform = {`translate(${xShift}, ${yShift})`}>
      <text
        y={`-${35+node.r}px`}
        style={{
          textAnchor: 'middle', 
          alignmentBaseline: "central",
          fontSize: "20px",
          fontWeight: "bold"}}
      >{`${node.data.runner.firstName}`}
      </text>
      <text
        y={`-${15+node.r}px`}
        style={{
          textAnchor: 'middle', 
          alignmentBaseline: "central",
          fontSize: "20px",
          fontWeight: "bold"}}
      >{`${node.data.runner.lastName}`}
      </text>
    </g>
  
  );
}

export default RosterTooltip