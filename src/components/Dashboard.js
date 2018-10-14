import React, { Component } from 'react';

import bigsData from './../data/processData'
import RaceRosterHexa from './RaceRosterHexa.js'
import TimeLinesBrushable from './TimeLinesBrushable.js'
import TimeLinesHoverable from './TimeLinesHoverable.js'
import RunnersCumSumTime from './RunnersCumSumTime.js'
import HistoTime from './HistoTime.js'
import {Stack} from './subComponents/Stack.js'
import {colorsSelected} from './subComponents/Colors.js'

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      hoveredBib: null,
      brushedLaps: null,
      selectedBibs: {}
    }
    
    this.colorStack = new Stack(colorsSelected)

    this.onHoverBib = this.onHoverBib.bind(this)
    this.onBrushLaps = this.onBrushLaps.bind(this)
    this.onClickBib = this.onClickBib.bind(this)

  }

  onHoverBib(bib){
    this.setState({hoveredBib: bib})
  }

  onClickBib(bib){
    if (this.state.selectedBibs[`${bib}`]) {
      // put back color in stack
      this.colorStack.push(this.state.selectedBibs[`${bib}`])
      // filter out selected
      const filtered = Object.keys(this.state.selectedBibs)
        .filter(key => key !== `${bib}`)
        .reduce((obj, key) => ({...obj, [key]: this.state.selectedBibs[key]}), {});
      this.setState({selectedBibs: filtered})
    } else {
      const newSelection = {[`${bib}`]: this.colorStack.pop()}
      this.setState({selectedBibs: {...newSelection, ...this.state.selectedBibs}})
    }
  }

  onBrushLaps(lapsRange){
    this.setState({brushedLaps: lapsRange})
  }

  render() {
    return (
      <div>
        <RaceRosterHexa
          runnersData={bigsData.data} 
          hoveredBib = {this.state.hoveredBib} 
          selectedBibs = {this.state.selectedBibs}
          margins = {{top: 20, right: 20, bottom: 20, left: 20}}
          width = {300}
          height = {300}
          onHover={this.onHoverBib}
          onClick={this.onClickBib}
        />
        <RunnersCumSumTime
          data = {bigsData.data}
          margins = {{top: 20, right: 20, bottom: 20, left: 60}}
          width = {350}
          height = {300}
          selectedBibs = {this.state.selectedBibs}
        />
        <div style= {{width: "700px"}}>
          <TimeLinesHoverable 
            data = {bigsData.data}
            width = {700}
            height = {250}
            margins = {{top: 30, right: 50, bottom: 20, left: 50}}
            hoveredBib = {this.state.hoveredBib}
            selectedBibs = {this.state.selectedBibs}
            xRange = {this.state.brushedLaps}
          />
          <TimeLinesBrushable
            data = {bigsData.data}
            width = {700}
            height = {70}
            margins = {{top: 0, right: 50, bottom: 35, left: 50}}
            hoveredBib = {this.state.hoveredBib}
            selectedBibs = {[]}
            onBrush = {this.onBrushLaps}
          />
        </div>
        <HistoTime
          data = {bigsData.data}
          margins = {{top: 20, right: 20, bottom: 50, left: 60}}
          width = {350}
          height = {300}
          selectedBibs = {this.state.selectedBibs}
        />
      </div>

    );
  }
}

export default Dashboard;