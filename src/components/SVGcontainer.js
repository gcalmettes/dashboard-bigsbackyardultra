import React, { Component } from 'react';


const SVGcontainer = (props) => {
  const {width, height} = {...props}
  return (
    <svg width={width} height={height}>
      {props.children}
    </svg>
  );

}

export default SVGcontainer
