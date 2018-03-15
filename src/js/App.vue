<template>
  <div class="main">
    <h1 class="main__header">Овочевий довідник</h1>
    <div class="author">Розробник: <a href="http://demenkov.dp.ua">Іван Деменков</a> &copy; 2017</div>
    <div class="fb-share-button" data-href="http://vegetables.dp.ua/" data-layout="button_count" data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fvegetables.dp.ua%2F&amp;src=sdkpreparse">Поширити</a></div>
    <div class="main__block">
      <h2>Актуальні ціни на {{ currentDate|dates }}</h2>
      <div class="main__block--content">
        <div class="main__block--column">
          <p v-for="(item, index) in lastPrices" v-if="index < 7">{{item.name}} <span>&#8372; {{item.price|decimal}}</span></p>
        </div>
        <div class="main__block--column">
          <p v-for="(item, index) in lastPrices" v-if="index > 6" class="pull-left"><span>&#8372; {{item.price|decimal}}</span> {{item.name}}</p>
        </div>
      </div>
    </div>
    <div class="main__block">
      <h2>Овочевий калкулятор</h2>
        <div class="main__block--content">
          <div class="main__block--column">
            <div class="main__selector">
              <label for="for-product">одиниця продукту</label>
              <select name="for-product" id="for-product" @change="changeSelector">
                <option v-for="(item,index) in productNames" :key="index" :value="index">{{item}}</option>
              </select>
            </div>
            <div class="image" :class="currentImage"></div>
          </div>
          <div class="main__block--column">
            <h3>буде коштувати:</h3>
            <p class="pull-left" v-for="item in randomList"><strong>{{item.price|decimal}}</strong> {{item.noun}}</p>
          </div>
        </div>
    </div>
    <charts :data="products"></charts>
    <div class="main__charts--info">Щоб дивитись графіки, поверніть прилад горізонтально.</div>
    <div class="main__advertise">
      <a href="https://hashflare.io/r/C6272D3B"><img src="https://cdn.hashflare.eu/banners/ru/profit_728x90_ru.gif?v=2" alt="HashFlare"></a>
	</div>
  </div>
</template>

<script>
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
</script>