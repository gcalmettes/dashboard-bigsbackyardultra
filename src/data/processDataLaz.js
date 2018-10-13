import moment from 'moment';
import lazData from './lazData.json'

const data = lazData.data

data.forEach(entry => 
  entry.time = moment(`${entry.time} CDT`, "MM-DD-YYYY HH:mm ZZ")
)

export default {
  data: data
};
