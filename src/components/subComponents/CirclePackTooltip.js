import React from 'react';

const CirclePackTooltip = (props) => {
  const {node} = props
  return ((node.depth !==0) &&
    <g transform = {`translate(${node.y > 35 ? node.x : node.x + node.r + 30}, ${node.y > 35 ? node.y : node.y + 35})`}>
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

export default CirclePackTooltip