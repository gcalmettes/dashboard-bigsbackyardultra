import {scaleLinear as d3scaleLinear} from 'd3-scale';

export const colorsSelected = [
  "#999999",
  "#f781bf",
  "#a65628",
  "#ff7f00",
  "#984ea3",
  "#377eb8",
  "#e41a1c"
]

export const colorsHash = {
  M: '#aad28c',//'#cbdbff',//'#aad28c',
  F: '#ffc38a',
  hoveredFill: "#49ABF3"
}

let cScale = ["#F95B34", "#EE3E64", "#F36283", "#FF9C34", "#EBDE52", "#B7D84B", "#44ACCF"]
export const linesColorScale = d3scaleLinear()
  .domain(cScale.map((c,i) => i/cScale.length))
  .range(cScale)