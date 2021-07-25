<template>
  <div class="main">
    <h1 class="main__header">Овочевий довідник</h1>
    <div class="author">Розробник: <a href="http://demenkov.dp.ua">Іван Деменков</a> &copy; 2017</div>
    <div class="fb-share-button" data-href="http://vegetables.dp.ua/" data-layout="button_count" data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fvegetables.dp.ua%2F&amp;src=sdkpreparse">Поширити</a></div>
    <div class="main__block">
      <h2>Актуальні ціни на {{ currentDate|dates }}</h2>
      <div class="main__block--content font-size-19"  title="Актуальная цена на овощи в Днепре">
        <div class="main__block--column">
          <p v-for="(item, index) in lastPrices" v-if="index < 6">{{item.name}} <span>&#8372; {{item.price|decimal}}</span></p>
        </div>
        <div class="main__block--column">
          <p v-for="(item, index) in lastPrices" v-if="index > 5" class="pull-left"><span>&#8372; {{item.price|decimal}}</span> {{item.name}}</p>
        </div>
      </div>
    </div>
    <div class="main__block">
      <h2 title="Посчитать почем овощи Днепр">Овочевий калкулятор</h2>
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
          <div class="main__block--column font-size-12">
            <h4>буде коштувати:</h4>
            <p class="pull-left" v-for="item in randomList"><strong>{{item.price|decimal}}</strong> {{item.noun}}</p>
          </div>
        </div>
    </div>
    <charts :data="products"></charts>
    <div class="main__charts--info">Щоб дивитись графіки, поверніть прилад горізонтально.</div>
<!--    <div class="main__advertise" title="овочі ціна Дніпро купити лол кєк чебурєк">
      <a href="https://hashflare.io/r/C6272D3B"><img src="https://cdn.hashflare.eu/banners/ru/profit_728x90_ru.gif?v=2" alt="HashFlare"></a>
    </div>
-->
  </div>
</template>

<script src="./app.js"></script>