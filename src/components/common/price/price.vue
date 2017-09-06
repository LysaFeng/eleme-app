<template>
  <div class="priceWrapper">
    <div class="extra">
      <span class="count">月售{{salesInfo.sellCount}}份</span><span>好评率{{salesInfo.rating}}%</span>
    </div>
    <div class="price">
      <span class="now">￥{{salesInfo.price}}</span><span v-show="salesInfo.oldPrice" class="old">￥{{salesInfo.oldPrice}}</span>
    </div>
  </div>
</template>
<script>
  export default{
   props:["salesInfo"]
  }
</script>

<style lang="stylus" type="text/stylus">
@import "./price.styl";
</style>
