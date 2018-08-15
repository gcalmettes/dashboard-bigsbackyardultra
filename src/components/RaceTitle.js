import React from 'react';

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


class RaceTitle extends React.PureComponent {
  render () {
    return (
      <header style={{...headerStyles}}>
        <h1 style={{...titleStyle}}>{this.props.name}</h1>
        <h2 style={{...dateStyle}}>{formatDate(this.props.date)}</h2>
      </header>
    );
  }
}

export default RaceTitle