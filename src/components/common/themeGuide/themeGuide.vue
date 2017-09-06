<template>
  <div class="title">
    <!--这里之所以用div是因为：用span的话，在某些andrio手机上可能出现兼容性问题-->
    <div class="line"></div>
    <div class="text">{{text}}</div>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    props:["text"]
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .title
    width: 80%
    display:flex
    margin 28px auto 24px auto
    justify-content:center
    .line
      flex 1
      position: relative
      top: -6px
      border-bottom 1px solid rgba(255,255,255,0.2)
    .text
      flex:1
      padding:0 12px
      font-size 14px
      font-weight 700
      text-align: center
</style>
