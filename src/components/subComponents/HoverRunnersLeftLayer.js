import React from 'react';
import {colorsSelected} from './Colors.js'


// const dayOrNight = (lap) => (Math.floor(lap/12)%2 === 0 ? 1 : 2)
const dayOrNight = (lap) => Math.floor((lap-1)/12)%2 === 0 ? "🏞️" : "🌃"

class HoverRunnersLeftLayer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      mouseX: 0,
      mouseY: 0,
      visible: false
    }

    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  onMouseMove(e){
    const bounds = e.target.getBoundingClientRect()
    const x = e.clientX - bounds.left,
          y = e.clientY - bounds.top;
    this.setState( {mouseX: x, mouseY: y, visible: true})
  }

  onMouseLeave(e){ 
    this.setState( {visible: false})
  }

  getStyle() {
   return {
    display: this.state.visible ? null : "none",
   }
  }

  render(){

    const {width, height, data, xScale, yScale, selectedBibs} = this.props

    const survivors = data.reduce((sum, runner) => {
      sum += runner.numberOfLaps >= xScale.invert(this.state.mouseX)
      return sum
      }, 0)

    const currentLap = Math.floor(xScale.invert(this.state.mouseX))+1

    let countSelected = 0
    const selectedRunnersInfo = data
      .reduce((acc, runner) => {
        if (selectedBibs.includes(`${runner.bib}`)) {
          const runnerLap = runner.laps.filter(lap => lap.lap === currentLap)
            .map(lap => (
              {
                x: xScale(lap.lap),
                y: yScale(lap.time.asMinutes()),
                string: lap.string,
                color: colorsSelected[countSelected]
              }
            ))
          countSelected += 1
          acc = [...acc, ...runnerLap]
        }
        return acc
      }, [])

    return (
      <g>
        <line stroke = "black" strokeWidth= "2px" 
              x1={this.state.mouseX} x2={this.state.mouseX} 
              y1={0} y2={height} style={this.getStyle()}
        />
        <text 
          x={this.state.mouseX <= width/2 ? this.state.mouseX + 10 : this.state.mouseX - 10} 
          y={height-30} 
          textAnchor = {this.state.mouseX <= width/2 ? "start" : "end"} 
          style={this.getStyle()}>
            {`Lap ${currentLap} ${dayOrNight(currentLap)} (${(currentLap*4.16666).toFixed(2)}mi)`}
        </text>
        <text 
          x={this.state.mouseX <= width/2 ? this.state.mouseX + 10 : this.state.mouseX - 10} 
          y={height-10} 
          textAnchor = {this.state.mouseX <= width/2 ? "start" : "end"} 
          style={this.getStyle()}>
            {`${survivors} runners survived`}
        </text>
        {selectedRunnersInfo
          .map((info, i) => (
            <g key={`info-${i}`} style={this.getStyle()}>
              <circle 
                cx = {info.x} 
                cy = {info.y} 
                fill = {info.color}
                stroke = {"black"} 
                r = {3}
              />
              <text 
                x = {info.x + 10} 
                y = {info.y - 10} 
              >
                {info.string}
              </text>
            </g>
          ))
        }
        <rect width={width} height={height} fill="none" pointerEvents="all" 
          onMouseMove = {this.onMouseMove}
          onMouseOver = {this.onMouseMove} 
          onMouseLeave = {this.onMouseLeave}
        />
      </g>
    )
  }
}

export default HoverRunnersLeftLayer