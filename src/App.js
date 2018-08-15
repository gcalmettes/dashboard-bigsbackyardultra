import React, { Component } from 'react';
import bigsData from './data/processData'
import RaceTitle from './components/RaceTitle.js'
import RaceRoster from './components/RaceRoster.js'
import LapTimeLines from './components/LapTimeLines.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      hoveredBib: null,
      brushedLaps: null,
      selectedBibs: []
    }
    this.onHoverBib = this.onHoverBib.bind(this)
    this.onBrushLaps = this.onBrushLaps.bind(this)
    this.onClickBib = this.onClickBib.bind(this)
  }

  onHoverBib(bib){
    this.setState({hoveredBib: bib})
  }

  onClickBib(bib){
    if (this.state.selectedBibs.includes(bib)) {
      this.setState({selectedBibs: this.state.selectedBibs.filter(d => d !== bib)})
    } else {
      this.setState({selectedBibs: [...this.state.selectedBibs, bib]})
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
          colorHash = {{'M': '#aad28c',
                        'F': '#ffc38a'
                      }}
          onHover={this.onHoverBib}
          onClick={this.onClickBib}
        />
        <div style= {{width: "700px"}}>
          <LapTimeLines 
            data = {bigsData.data}
            width = {700}
            height = {250}
            margins = {{top: 30, right: 50, bottom: 20, left: 50}}
            drawAxis = {[{axis: "left", label: true}, {axis: "bottom", label: false}]}
            hoveredBib = {this.state.hoveredBib}
            selectedBibs = {this.state.selectedBibs}
            brushedLaps = {this.state.brushedLaps}
            actionOnMouseOver = {true}
          />
          <LapTimeLines 
            data = {bigsData.data}
            width = {700}
            height = {70}
            margins = {{top: 0, right: 50, bottom: 35, left: 50}}
            drawAxis = {[{axis: "bottom", label: true}]}
            hoveredBib = {this.state.hoveredBib}
            selectedBibs = {[]}
            brush = {true}
            onBrush = {this.onBrushLaps}
          />
        </div>
      </div>

    );
  }
}

export default App;
