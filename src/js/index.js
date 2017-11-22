import '../fonts/Arsenal-Regular.otf';
import '../fonts/Arsenal-Bold.otf';
import '../scss/style.scss';

import Vue from 'vue/dist/vue.js';
import VueMaterial from 'vue-material/dist/vue-material.js';
import 'vue-material/dist/vue-material.min.css';
import VegetableApp from './app';

Vue.use(VueMaterial);

const app = new Vue(VegetableApp);