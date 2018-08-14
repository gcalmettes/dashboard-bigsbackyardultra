import React, { Component } from 'react';

const headerStyles = {
  fontFamily: 'Papyrus',
  textAlign: 'center',
  backgroundColor: '#222',
  height: '100px',
  padding: '20px',
  color: '#fff'
}

const titleStyle = {
  fontSize: '1.5em'
}

const dateStyle = {
  fontSize: '1em'
}

const formatDate = (date) => date.format("dddd, MMMM Do YYYY")

export default class RaceTitle extends Component {
  constructor(props){
    super(props)
    this.state = this.props.raceInfo
  }

  render() {
    return (
        <header style={{...headerStyles}}>
          <h1 style={{...titleStyle}}>{this.state.name}</h1>
          <h2 style={{...dateStyle}}>{formatDate(this.state.date)}</h2>
        </header>
    );
  }
}
