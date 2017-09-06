<template>
  <div class="header">
    <div class="contentWrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="supportCount" @click="showDetails">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="iconfont icon-zuoyoujiantou"></span>
      </div>
    </div>
    <div class="bulletinWrapper" @click="showDetails">
      <span class="bulletinTitle"></span><span class="bulletinText">{{seller.bulletin}}</span>
      <span class="iconfont icon-zuoyoujiantou"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar"/>
    </div>
    <transition name="fade">
      <div class="details" v-show="detailsShow" >
        <div class="detailsWrap">
          <div class="detailsMain">
            <div class="starWrap">
              <h2>{{seller.name}}</h2>
              <v-star :size="48" :score="seller.score"></v-star>
            </div>
            <v-themeguide text="优惠信息"></v-themeguide>
            <ul v-if="seller.supports" class="support">
              <li class="supportItem" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <v-themeguide text="商家公告"></v-themeguide>
            <div class="bulletin">
              <p class="cotent">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detailsClose" @click="hideDetails">
          <span class="iconfont icon-cha"></span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import star from "../star/star.vue"
  import themeGuide from "../common/themeGuide/themeGuide.vue"
  export default {
    props:['seller'],
    data() {
      return {
        detailsShow: false
      };
    },
    methods: {
      showDetails() {
        this.detailsShow = true;
      },
      hideDetails() {
        this.detailsShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components:{
      'v-star':star,
      "v-themeguide":themeGuide
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./header.styl";  /*.styl后缀及./都可以省略*/
</style>
