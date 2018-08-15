import {scaleLinear as d3scaleLinear} from 'd3-scale';

export const colorsSelected = [
  "#e41a1c",
  "#377eb8",
  "#984ea3",
  "#ff7f00",
  "#a65628",
  "#f781bf",
  "#999999"
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