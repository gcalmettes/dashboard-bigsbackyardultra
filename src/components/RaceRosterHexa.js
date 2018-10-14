import React from 'react';
import SVGcontainer from './subComponents/SVGcontainer.js';
import HexaVoronoi from './subComponents/HexaVoronoi.js'

const RaceRoster = (props) =>{
  const {runnersData, width, height, margins, hoveredBib, selectedBibs, onHover, onClick} = props

  return (
    <SVGcontainer width={width} height={height} margins={margins}>
      <HexaVoronoi
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
