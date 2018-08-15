import React from 'react';
import HoverLayer from './HoverLayer.js'
import StatsLayer from './StatsLayer.js'
import {line as d3line,
        curveCatmullRom as d3curveCatmullRom} from 'd3-shape';

const isHovered = (runner, hoveredBib) => runner.bib === parseInt(hoveredBib, 10)
const isSelected = (runner, selectedBibs) => selectedBibs && selectedBibs.includes(`${runner.bib}`)


class MultiLines extends React.Component {
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


  render () {
    const {width, height, data, xScale, yScale, colorScale, hoveredBib, selectedBibs} = this.props      
    
    const survivors = data.reduce((sum, runner) => {
      sum += runner.numberOfLaps >= xScale.invert(this.state.mouseX)
      return sum
      }, 0)
    const nLap = Math.floor(xScale.invert(this.state.mouseX))

    const line = d3line()
      .x(d => xScale(d.lap))
      .y(d => yScale(d.time.asMinutes()))
      .curve(d3curveCatmullRom.alpha(0.5))

    this.xScale = xScale

    // If no selection, 
    // draw timeLines for non-hovered runners in colors
    const timeLines = selectedBibs.length <= 0
      ? data.map(runner => {
        const isRunnerHovered = isHovered(runner, hoveredBib)
        return !isRunnerHovered
          && <path 
              d={line(runner.laps)}
              fill='None'
              stroke = {colorScale(runner.numberOfLaps)}
              strokeWidth = {1}
              clipPath = "url(#clip)"
              key={`runner${runner.bib}`}
              />
        } 
      )
      : data.map(runner => { // else draw non selected/hovered runners in gray
          const isRunnerHovered = isHovered(runner, hoveredBib)
          const isRunnerSelected = isSelected(runner, selectedBibs)
          return !isRunnerHovered && !isRunnerSelected
            && <path 
                d={line(runner.laps)}
                fill='None'
                stroke = {
                  selectedBibs
                  ? isRunnerSelected 
                    ? colorScale(runner.numberOfLaps)
                    : "gray"
                  : colorScale(runner.numberOfLaps)
                }
                strokeWidth = {1}
                opacity = {
                  selectedBibs
                  ? isRunnerSelected 
                    ? 1
                    : 0.3
                  : 1
                }
                clipPath = "url(#clip)"
                key={`runner${runner.bib}`}
                />
        } 
      )
    // if selection exists
    // add timeLine of selected runners in color on top
    if (selectedBibs.length > 0) {
      timeLines.push(
        ...data.map(runner => {
          const isRunnerHovered = isHovered(runner, hoveredBib)
          const isRunnerSelected = isSelected(runner, selectedBibs)
          return !isRunnerHovered && isRunnerSelected
            && <path 
                d={line(runner.laps)}
                fill='None'
                stroke = {colorScale(runner.numberOfLaps)}
                strokeWidth = {2}
                clipPath = "url(#clip)"
                key={`runner${runner.bib}`}
                />
          }
        )
      )
    }
    // add statistics of hovered runner on top
    timeLines.push(
      ...data.map(runner => {
        const isRunnerHovered = isHovered(runner, hoveredBib)
        return isRunnerHovered
          && <StatsLayer
            key={`runner${runner.bib}`} 
            dPath={line(runner.laps)} 
            showStats={Boolean(this.props.actionOnMouseOver)}
            stats = {{
              fastestX: xScale(runner.fastest.lap),
              fastestY: yScale(runner.fastest.time.asMinutes()),
              fastest: runner.fastest.string,
              slowestX: xScale(runner.slowest.lap),
              slowestY: yScale(runner.slowest.time.asMinutes()),
              slowest: runner.slowest.string,
              averageY: yScale(runner.average.time.asMinutes()),
              average: runner.average.string
            }}
            width={width}
           />
      })
    )

    return (
      <g transform = "translate(0, 0)" width={width} height={height}>
        <clipPath id="clip">
          <rect x={0} y={0} width={width} height={height} />
        </clipPath>
        {timeLines}
        {(Boolean(this.props.actionOnMouseOver)) 
          && <HoverLayer 
                mouseX = {this.state.mouseX} 
                style = {this.getStyle()} 
                width={width} 
                height={height}
                nLap={nLap} 
                survivors={survivors}
                onMouseMove = {this.onMouseMove} 
                onMouseLeave = {this.onMouseLeave}
            />
        }
      </g>
    );
  }
}

export default MultiLines
