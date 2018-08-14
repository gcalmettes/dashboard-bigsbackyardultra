
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
  })
})

export default {
  race: "Big Backyard Ultra",
  time: raceStartTime,
  data: runnersData
};
