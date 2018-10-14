import React, { Component } from 'react';
import moment from 'moment';

import HorizontalTimeline from 'react-horizontal-timeline';
import SwipeableViews from 'react-swipeable-views';

import LazWriting from './subComponents/LazWriting.js'
import lazData from './../data/processDataLaz.js'

const timelineConfig = {
  minEventPadding: 20,
  maxEventPadding: 120,
  linePadding: 100,
  labelWidth: 80,
  fillingMotionStiffness: 150,
  fillingMotionDamping: 25,
  slidingMotionStiffness: 150,
  slidingMotionDamping: 25,
  stylesBackground: '#f8f8f8',
  stylesForeground: '#00BFFF',
  stylesOutline: '#dfdfdf',
  isTouchEnabled: true,
  isKeyboardEnabled: true,
  isOpenEnding: true,
  isOpenBeginning: true,
  getLabel: (date) => {
    const day = moment(date, 'MM/DD/YYYY hh:mm A').format('MM/DD')
    const time = moment(date, 'MM/DD/YYYY hh:mm A').format('hh:mm A')
    return `${day}\n${time}`
  }
}

const views = lazData.data
  .map((entry, index) => 
    <LazWriting 
      key = {`prose-${index}`}
      time = {entry.time}
      story = {entry.story}
    />
  );


class LazBoard extends Component {
  constructor() {
    super();
    this.state = {
      data: lazData.data,
      item: 0,
      previous: 0
    }

  this.onChangeView = this.onChangeView.bind(this)
  }

  onChangeView(index, previous){
    this.setState({ 
      item: index, 
      previous: previous || this.state.item 
    })
  }

  render() {
    
    return (
      <div style={{'display': 'flex', 'justifyContent': 'center'}}>
        <div style={
          { display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '90%', 
            marginTop: "20px"}
        }>
          <div className="timelineContainter" style={{width: '95%', height: '150px'}}>
            <HorizontalTimeline
              index={this.state.item}
              indexClick={this.onChangeView}
              values={ this.state.data.map(d => d.time.format("MM/DD/YYYY hh:mm A"))}
              fillingMotion={{ stiffness: timelineConfig.fillingMotionStiffness, damping: timelineConfig.fillingMotionDamping }}
              isKeyboardEnabled={timelineConfig.isKeyboardEnabled}
              isTouchEnabled={timelineConfig.isTouchEnabled}
              labelWidth={timelineConfig.labelWidth}
              linePadding={timelineConfig.linePadding}
              maxEventPadding={timelineConfig.maxEventPadding}
              minEventPadding={timelineConfig.minEventPadding}
              slidingMotion={{ stiffness: timelineConfig.slidingMotionStiffness, damping: timelineConfig.slidingMotionDamping }}
              styles={{
                background: timelineConfig.stylesBackground,
                foreground: timelineConfig.stylesForeground,
                outline: timelineConfig.stylesOutline,
                marginTop: "100px"
              }}
              isOpenEnding={timelineConfig.isOpenEnding}
              isOpenBeginning={timelineConfig.isOpenBeginning} 
              getLabel={timelineConfig.getLabel}
            />
          </div>
          <div style={{ width: '95%', height: '100%', marginLeft: 'auto'}}>
            <SwipeableViews
              index={this.state.item}
              onChangeIndex={this.onChangeView}
              resistance>
              {views}
            </SwipeableViews>
          </div>
        </div>
      </div>
    );
  }
}

export default LazBoard;