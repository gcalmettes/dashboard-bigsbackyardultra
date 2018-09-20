export const isSelected = (runner, selectedBibs, node=false) => !node ? selectedBibs[`${runner.bib}`] : selectedBibs[runner.id]

export const isHovered = (node, hoveredBib) => node.id === hoveredBib

export const getMax = (array, attr) => Math.max(...array.map(d => d[attr]))

export const dayOrNight = (lap) => Math.floor((lap-1)/12)%2 === 0 ? "🏞️" : "🌃"


