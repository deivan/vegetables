import Database from './database';

export default {
  el: '#mainApp',
  data: {
    currentDate: getLastDate(),
    products: Database.data
  },
  methods: {

  },
  mounted: function () {
    console.log('mounted', this.currentDate)
  }
};

function getLastDate () {
  let allDates = [];
  for (let item of Database.data) 
    allDates.push(item.prices[0].date);
  return allDates.sort()[allDates.length - 1];
}

function getAllDates () {
  
}

function sortByDate (a,b) {
  if (a.date > b.date) return -1;
  if (a.date < b.date) return 1;
  return 0;
}