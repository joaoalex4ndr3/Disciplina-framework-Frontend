/// This goes into dotenv
// const apiKey = 'BRAcV4pPJZRxRNFO3cHwYFC4RBxkQpgap8UEj8pz';

//APOD instructions:
//Allowed request fields for apod method are
//'concept_tags', 'date', 'hd', 'count', 'start_date', 'end_date'
// Count and start/end-dates do not work in conjunction, got a little helper here...


const APOD = {

  parseQuery: (query) => {
    let res = '';
    for(let key in query) {
      if (query.hasOwnProperty(key) === true) {
        res += `&${key}=${query[key]}`
      }
    }
    return res;
  },

  getDate: (count) => {
    const start = new Date();
    const end = new Date();
    const endDate = end.getDate() - count;
    end.setDate(endDate)

    const result = {
      hd:true,
      start_date: start.toISOString().substr(0,10),
      end_date:  end.toISOString().substr(0,10)
    }
    return result
  }

}

// hard coded query for now
const APOD_query = {'hd': true, 'start_date': '2018-09-17', 'end_date': '2018-09-24'}
const APOD_key = 'BRAcV4pPJZRxRNFO3cHwYFC4RBxkQpgap8UEj8pz';
const APOD_url = 'https://api.nasa.gov/planetary/apod';
const APOD_endPoint = `${APOD_url}?api_key=${APOD_key}${APOD.parseQuery(APOD_query)}`;

const ROVER = {
  key: APOD_key,
  url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/',
  parseQuery: (query) => {
    let res = '?';
    for(let key in query) {
      if (query.hasOwnProperty(key) === true) {
        res += `${key}=${query[key]}&`
      }
    }
    return res;
  },
  endPoint: (url,rover,key,parsedQuery) => {
    return `${url}${rover}/photos${parsedQuery}api_key=${key}`;
  }
}


module.exports = {
  APOD_endPoint,
  ROVER
}
