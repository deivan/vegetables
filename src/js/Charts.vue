<template>
  <div class="main__charts">
    <canvas id="myChart" width="832" height="300"></canvas>
  </div>
</template>

<script>
  import 'chart.js/dist/Chart.bundle.min.js';
  
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
              distribution: 'series'
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
      max = item.prices.length < 10 ? item.prices.length : 10; //show only last 10 prices in chart
      for (let i = 0; i < max; i++)
        dataSet.push({ x: new Date(item.prices[i].date), y: item.prices[i].value });
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