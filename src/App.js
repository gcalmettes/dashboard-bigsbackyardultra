import React, { Component } from 'react';
import bigsData from './data/processData'
import RaceTitle from './components/RaceTitle.js'
import RaceRoster from './components/RaceRoster.js'
import TimeLinesBrushable from './components/TimeLinesBrushable.js'
import TimeLinesHoverable from './components/TimeLinesHoverable.js'
import {Stack} from './components/subComponents/Stack.js'
import {colorsSelected} from './components/subComponents/Colors.js'

class App extends Component {
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
      const newSelection = {}
      newSelection[`${bib}`] = this.colorStack.pop()
      this.setState({selectedBibs: {...newSelection, ...this.state.selectedBibs}})
    }
  }

  onBrushLaps(lapsRange){
    this.setState({brushedLaps: lapsRange})
  }

  render() {
    return (
      <div>
        <RaceTitle 
          name = {bigsData.race}
          date = {bigsData.time}
        />
        <RaceRoster 
          runnersData={bigsData.data} 
          hoveredBib = {this.state.hoveredBib} 
          selectedBibs = {this.state.selectedBibs}
          margins = {{top: 20, right: 20, bottom: 20, left: 20}}
          width = {300}
          height = {300}
          onHover={this.onHoverBib}
          onClick={this.onClickBib}
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
      </div>

    );
  }
}

export default App;
