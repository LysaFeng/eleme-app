<template>
	<div class="seller" ref="BS_seller">
		<div class="sellerWrapper">
        <div class="summary">
          <div class="top">
            <h1 class="name">{{seller.name}}</h1>
            <div class="quantity">
              <v-star :size=36 :score="seller.score"></v-star>
              <span class="ratingCount">({{seller.ratingCount}})</span>
              <span class="salesCount">月售{{seller.sellCount}}单</span>
              <div class="favorite">
                <span class="iconfont icon-aixin" :class="{'collected':collectedFlag}" @click="changeStatus"></span>
                <span class="text">{{collectedStatus}}</span>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="left">
              <h4 class="text minPrice">起送价</h4>
              <div class="number">{{seller.minPrice}}<span class="unit">元</span></div>
            </div>
            <div class="middle">
              <h4 class="text distribution">商家配送</h4>
              <div class="number">{{seller.deliveryPrice}}<span class="unit">元</span></div>
            </div>
            <div class="right">
              <h4 class="text time">平均时间</h4>
              <div class="number">{{seller.deliveryTime}}<span class="unit">分钟</span></div>
            </div>
          </div>
        </div>
        <v-split></v-split>
        <div class="bulletin">
          <h1 class="title">公告与活动</h1>
          <p class="content">{{seller.bulletin}}</p>
          <div class="promotionItem" v-for="(item,index) in seller.supports">
            <span v-if="item.type>=0" class="icon" :class="classMap[item.type]" ></span>
            <span class="description">{{item.description}}</span>
          </div>
        </div>
        <v-split></v-split>
        <div class="banner">
          <h1 class="title">商家实景</h1>
          <div class="picsWrapper" ref="picsWrapper">
            <ul class="picLists" ref="picLists">
              <li v-for="item in seller.pics" class="picItem"><img :src="item"></li>
            </ul>
          </div>
        </div>
        <v-split></v-split>
        <div class="sellerInfos">
          <h1 class="title">商家信息</h1>
          <div class="infoItem" v-for="item in seller.infos">
            <span class="description">{{item}}</span>
          </div>
        </div>
        <div class="tip">我是有底线的</div>
    </div>
	</div>
</template>

<script>
  import BScroll from "better-scroll";
  import star from "../star/star.vue";
  import split from "../common/split/split.vue";
  import {savaToLocal, loadFromlLocal} from '../../assets/js/store';
	export default{
    //Vue 更新数据时是异步的,所以在数据未加载完全之前,Bscroll无法获取目标内容的高度,所以会导致无法滚动的现象
		props:["seller"],
    components:{
      "v-star":star,
      "v-split":split
    },
    data(){
      return{
        classMap:[],
//        collectedFlag:false,
        collectedFlag: (() => {
          return loadFromlLocal(this.seller.id, 'collectedFlag', false);
        })(),
        collectedStatus:"收藏"
      }
    },
    created(){
      this.classMap=["decrease","discount","special","invoice","guarantee"];
//      this.computedWidth();
//      console.log("dgsdfg",this.$refs.bannerWrapper)
//      this.$nextTick(()=>{
//        this.initScroll();
//      })
    },
    mounted(){//使用 mounted 并不能保证钩子函数中的 this.$el 在 document 中。为此还应该引入 Vue.nextTick/vm.$nextTick。
      this.$nextTick(()=>{
        this.initScroll();
        this.initPicScroll();
    })
    },
    methods:{
      initScroll(){
        this.BS_seller=new BScroll(this.$refs.BS_seller,{click:true});
        savaToLocal(this.seller.id, 'collectedFlag', this.collectedFlag);
      },
      initPicScroll(){
        if (this.picsScroll) {
          return
        }
        let picWidth=120;
        let margin=6;
        let totalWidth=(picWidth+margin)*this.seller.pics.length-margin;
        console.log(this.$refs.picLists)
        this.$refs.picLists.style.width=totalWidth+"px";
        this.picsScroll=new BScroll(this.$refs.picsWrapper,{scrollX:true,eventPassthrough:'vertical'});
      },
      changeStatus(){
        this.collectedFlag=!this.collectedFlag;
        this.collectedStatus=this.collectedFlag? "已收藏" : "收藏";
      }
    }
	}
</script>

<style lang="stylus" type="text/stylus">
  @import "seller.styl";
</style>
