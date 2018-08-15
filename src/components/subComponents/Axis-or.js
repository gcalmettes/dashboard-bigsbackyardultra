import React from 'react';


class Axis extends React.PureComponent {
  render() {
    
    const {left, top, text, scale, orientation} = this.props
    const range = scale.range()
          // domain = scale.domain()
    let axis

    if (orientation === "bottom") {
      const width = range[1]-range[0]
      axis =  (
        <g transform = {`translate(${left}, ${top})`} width={width}>
          <text transform={`translate(${width/2}, ${0})`} style={{textAnchor: "middle"}}>
            {text}
          </text>
        </g>
      )
    }

    else if (orientation === "left") {
      const height = range[0]-range[1]
      axis = (
        <g transform = {`translate(${left}, ${top})`} height={height}>
          <text transform={`translate(${0}, ${height/2}) rotate(-90)`} style={{textAnchor: "middle"}}>
            {text}
          </text>
        </g>
      )
    }

  return axis
  
  }
}

export default Axis
