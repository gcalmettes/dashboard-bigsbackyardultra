
import moment from 'moment';
import bigsData from './bigsData.json'


const getRaceTime = (time, day="21 Oct 2017", tz="CDT") => {
  return moment(`${day} ${time} ${tz}`)
}

// parse race start time
const raceStartTime = getRaceTime(bigsData.startTime)

// parse runners laps time
const runnersData = bigsData.data
runnersData.forEach(runner => {
  runner.parent = "roster"
  runner.bib = +runner.bib
  runner.runner.age = +runner.runner.age
  runner.laps.forEach(lap => {
    lap.time = moment.duration(`00:${lap.time}`)
    lap.string = moment(lap.time.as('milliseconds')).format('mm:ss')
  })
  
  // add some stats for runner
  runner.fastest = runner.laps.reduce((fastest, current, i) => {
    return current.time.asSeconds() < fastest.time.asSeconds()
      ? {time: current.time, lap: i+1, string: moment(current.time.as('milliseconds')).format('mm:ss')}
      : fastest
  }, {time: moment.duration(Infinity), lap: 0})
  
  runner.slowest = runner.laps.reduce((slowest, current, i) => {
    return current.time.asSeconds() > slowest.time.asSeconds() 
      ? {time: current.time, lap: i+1, string: moment(current.time.as('milliseconds')).format('mm:ss')}
      : slowest
  }, {time: moment.duration(0), lap: 0})
  
  runner.average = {time: moment.duration(
    {seconds: runner.laps.reduce((sum, current) => {
      sum += current.time.asSeconds()
      return sum
      }, 0
      )/runner.numberOfLaps
    })
  }
  runner.average.string = moment(runner.average.time.as('milliseconds')).format('mm:ss')
})

export default {
  race: "Big Backyard Ultra",
  time: raceStartTime,
  data: runnersData
};
