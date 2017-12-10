import '../fonts/Arsenal-Regular.otf';
import '../fonts/Arsenal-Bold.otf';
import '../scss/style.scss';

import Vue from 'vue/dist/vue.js';

Vue.filter('decimal', function (val) {
  if (isNaN(val)) return;
  return parseFloat(val).toFixed(2);
});
Vue.filter('dates', function (val) {
  let dates = val.split('-');
  return `${dates[2]}.${dates[1]}.${dates[0]}`;
});

import VegetableApp from './App.vue';

new Vue({
  el: '#mainApp',
  render: h => h(VegetableApp)
});