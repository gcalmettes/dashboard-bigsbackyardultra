import React, { Component } from 'react';


export default class RaceRosterTooltip extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      r: this.props.r,

    }
  }

  render() {

    return (
      <g>
        <text 
          y={`-${35+this.state.r}px`}
          style={{
            textAnchor: 'middle', 
            alignmentBaseline: "central",
            fontSize: "20px",
            fontWeight: "bold"}}
        >{`${this.state.firstName}`}
        </text>
        <text
          y={`-${15+this.state.r}px`}
          style={{
            textAnchor: 'middle', 
            alignmentBaseline: "central",
            fontSize: "20px",
            fontWeight: "bold"}}
        >{`${this.state.lastName}`}
        </text>
      </g>
    );
  }
}
