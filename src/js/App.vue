<template>
  <div class="main">
    <h1 class="main__header">Овочевий довідник</h1>
    <div class="main__block">
      <h2>Актуальні ціни</h2>
      <div class="main__block--content">
        <div class="main__block--column">
          <md-field>
            <label for="for-date">Актуальна дата</label>
            <md-select v-model="currentDate" name="for-date" id="for-date">
              <md-option value="2017-11-18">18.11.2017</md-option>
            </md-select>
          </md-field>
        </div>
        <div class="main__block--column">
          <p>картопля <span>&#8372; 6.00</span></p>
          <p>капуста <span>&#8372; 6.00</span></p>
          <p>цибуля <span>&#8372; 6.00</span></p>
          <p>огірок <span>&#8372; 6.00</span></p>
          <p>помідор <span>&#8372; 6.00</span></p>
          <p>морква <span>&#8372; 6.00</span></p>
        </div>
      </div>
    </div>
    <div class="main__block">
      <h2>Овочевий калкулятор</h2>
        <div class="main__block--content">
          <div class="main__block--column">
            <md-field style="margin-top:-16px">
              <label for="for-product">одиниця продукту</label>
              <md-select name="for-product" id="for-product">
                <md-option value="2017-11-18">18.11.2017</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="main__block--column">
            <h3>буде коштувати:</h3>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import Database from './database';

  export default {
    data: function () {
      return {
        currentDate: getLastDate(),
        products: Database.data
      };
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
</script>