import React, { Component } from 'react';
import bigsData from './data/processData'
import RaceTitle from './components/RaceTitle.js'
import RaceRoster from './components/RaceRoster.js'
import LapTimeLines from './components/LapTimeLines.js'

import SVGcontainer from './components/SVGcontainer.js'
import BrushContext from './components/BrushContext.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      raceData: {
        name: bigsData.race,
        date: bigsData.time
      },
      runnersData: bigsData.data,
      hoveredBib: null
    }
    this.onHoverBib = this.onHoverBib.bind(this)
  }

  onHoverBib(bib){
    this.setState({hoveredBib: bib})
  }

  render() {
    return (
      <div>
        <RaceTitle raceInfo={this.state.raceData}/>
        <RaceRoster 
          runnersData={this.state.runnersData} hoveredBib={this.state.hoveredBib} 
          onHover={this.onHoverBib}
        />
        <LapTimeLines 
          runnersData={this.state.runnersData} hoveredBib={this.state.hoveredBib} 
          onHover={this.onHoverBib}
        />
        <SVGcontainer width={1000} height={300}>
          <BrushContext />
        </SVGcontainer>

      </div>

    );
  }
}

export default App;
