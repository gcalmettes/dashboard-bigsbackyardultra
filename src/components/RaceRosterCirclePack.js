import React from 'react';
import SVGcontainer from './subComponents/SVGcontainer.js';
import CirclePack from './subComponents/CirclePack.js'

const RaceRoster = (props) =>{
  const {runnersData, width, height, margins, hoveredBib, selectedBibs, onHover, onClick} = props

  return (
    <SVGcontainer width={width} height={height} margins={margins}>
      <CirclePack 
        width = {width}
        height = {height}
        margins = {margins}
        runnersData = {runnersData}
        hoveredBib = {hoveredBib}
        selectedBibs = {selectedBibs}
        onHover = {onHover}
        onClick = {onClick}
      />
    </SVGcontainer>
  )
}

export default RaceRoster
