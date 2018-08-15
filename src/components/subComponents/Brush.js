import React from 'react';

import {brushX as d3brushX} from 'd3-brush';
import {select as d3select,
        event as d3event} from 'd3-selection';
import {symbol as d3symbol,
        symbolTriangle as d3symbolTriangle} from 'd3-shape'

const brushed = (scale, callback) => {
  if (d3event && d3event.selection) {
    const range = d3event.selection.map(d => scale.invert(d))
    callback(range) 
  }
}

class Brush extends React.Component {
  
  constructor(props) {
    super(props);
    this.myBrush = React.createRef();
    this.leftLine = React.createRef();
    this.rightLine = React.createRef();
    this.updateHandles = this.updateHandles.bind(this)
  }

  updateHandles (lowerLim, upperLim) {
    this.leftLine.current.setAttribute("transform", `translate(${lowerLim}, 0)`)
    this.rightLine.current.setAttribute("transform", `translate(${upperLim}, 0)`)
  }

  componentDidUpdate() {
    if (d3event) {
      const [lowerLim, upperLim] = d3event.selection
      this.updateHandles(lowerLim, upperLim)
    }

  }

  componentDidMount() {
    
    const [lowerLim, upperLim] = this.props.dataLimits.map(d => this.props.scale(d))

    this.updateHandles(lowerLim, upperLim)

    const brush = d3brushX()
      .extent([[0, 0], [this.props.width, this.props.height]])
      .handleSize(20)
      .on("start brush", () => brushed(this.props.scale, this.props.onBrush))
      .on("end brush", () => brushed(this.props.scale, this.props.onBrush))

    d3select(this.myBrush.current)
      .call(brush)
      .call(brush.move, [lowerLim, upperLim])
  }

  render() {

    return <g>
            <g ref={this.leftLine}>
              <line y1={0} y2={this.props.height} stroke={"#7A7A7A"} strokeWidth={5}/>
              <path transform={`translate(${-6}, ${this.props.height/2}) rotate(-90)`} 
                    d = {d3symbol().type(d3symbolTriangle).size(90)()} 
                    fill = {"#7A7A7A"}
              />
            </g>
            <g ref={this.rightLine}>
              <line y1={0} y2={this.props.height} stroke={"#7A7A7A"} strokeWidth={5}/>
              <path transform={`translate(${6}, ${this.props.height/2}) rotate(90)`} 
                    d = {d3symbol().type(d3symbolTriangle).size(90)()} 
                    fill = {"#7A7A7A"}
              />
            </g>
            <g ref={this.myBrush}></g>
           </g>
  
  }
}

export default Brush
