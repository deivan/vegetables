<template>
  <div class="main__charts">
    <canvas id="myChart" width="832" height="300"></canvas>
  </div>
</template>

<script>
  import moment from 'moment/moment.js';
  import VueMomentJS from 'vue-momentjs';
  import 'moment/locale/uk.js';

  import VueChart from 'vue-chart-js'

  moment.locale('uk');
  
  const PRICE_COUNT = 16; // max prices number on chartn for each line

  export default {
    name: 'charts',
    props: ['data'],
    methods: {
      
    },
    mounted: function () {
      const ctx = document.getElementById("myChart");
      const myChart = new Chart(ctx, {
        type: 'line',
        cubicInterpolationMode: 'monotone',
        data: {
          datasets: fillData(this.data)
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }],
            xAxes: [{
              type: 'time',
              distribution: 'series',
              time: {
                tooltipFormat: 'DD MMMM, YYYY',
                unit: 'month'
              },
              ticks: {
                  callback: function(value, index, values) {
                    return (values[index]) ? moment(values[index].value).format('MMM YYYY') : null;
                  }
              }
            }]
          }
        }
      });
    }
  }
  
  function fillData (data) {
    let result = [], dataItem, dataSet, max, colors;
    for (let item of data) {
      dataItem = { label: item.name };
      dataSet = [];
      colors = { r: getRandomColor(), g: getRandomColor(), b: getRandomColor() };
      max = item.prices.length < PRICE_COUNT ? item.prices.length : PRICE_COUNT; //show only last 10 prices in chart
      for (let i = 0; i < max; i++)
        dataSet.push({ x: moment(item.prices[i].date), y: item.prices[i].value });
      dataItem = { 
        label: item.name, 
        data: dataSet,
        borderColor: `#${colors.r}${colors.g}${colors.b}`,
        backgroundColor: `rgba(${parseInt(colors.r,16)},${parseInt(colors.g,16)},${parseInt(colors.b,16)},.1)`
      };
      result.push(dataItem);
    }
    return result;
  }
  
  function getRandomColor() {
    return (`0${(Math.round(Math.random()*25.6)*10).toString(16)}`).slice(-2);
  }
</script>