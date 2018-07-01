import Database from './database';
import VegetableCharts from './Charts.vue';

export default {
  name: 'app',
  components: {
    charts: VegetableCharts
  },
  data: function () {
    return {
      products: Database.data,
      currentDate: getLastDate(),
      currentImage: '',
      lastPrices: getLastPrices(),
      productNames: getProductNames('name'),
      productNouns: getProductNames('noun'),
      randomList: []
    };
  },
  methods: {
    getImage: function (index) {
      this.currentImage = this.products[index].image;
      this.randomList = getRandom(this.products[index].name);
    },
    changeSelector: function (e) {
      this.getImage(e.target.selectedIndex);
    }
  },
  mounted: function () {
     this.getImage(0);
  }
};

function getLastDate () {
  let allDates = [];
  for (let item of Database.data) 
    allDates.push(item.prices[0].date);
  return allDates.sort()[allDates.length - 1];
}

function getLastPrices () {
  let lastPrices = [];
  for (let item of Database.data) {
    lastPrices.push({ name: item.name, price: item.prices[0].value });
  }
  return lastPrices;
}

function getProductNames (field) {
  return Database.data.map( item => item[field]);
}

function getRandom (name) {
  let result = [], skipped = 3, stored = Database.data.filter( item => item.name === name)[0].prices[0].value;
  Database.data.map(item => {
    if (item.name !== name) {
      result.push({
        noun: item.noun,
        price: stored / item.prices[0].value
      });
    }
  });
  return result;
}

function sortByDate (a,b) {
  if (a.date > b.date) return -1;
  if (a.date < b.date) return 1;
  return 0;
}