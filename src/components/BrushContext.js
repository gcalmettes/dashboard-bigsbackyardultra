import React, { Component } from 'react';
import {brushX as d3brushX} from 'd3-brush'


const brush = d3brushX()
    // .extent([[0, 0], [width, height2]])
    // .on("brush end", brushed);



export default class BrushContext extends Component {
  constructor(props){
    super(props)
    this.brushRef = React.createRef()
    this.state = {
    }
  }


  render() {
    console.log(this.brushRef.current)
    return (
         <g ref={this.brushRef}>
         </g>
    );
  }
}
