import React from 'react';

const formatTime = (time) => time.format("MM/DD/YYYY hh:mm A")

const LazWriting = (props) => {
  const {time, story} = props

  return (
    <div>
        <h3>{formatTime(time)}</h3>
        <div style={{'whiteSpace': 'pre-line', 'margin': '20px'}}>
          {story}
        </div>
      </div>
  )
}

export default LazWriting