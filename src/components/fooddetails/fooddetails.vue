<template>

  <transition name="fade">
    <div class="detailsWrapper" v-show="showFlag" ref="detailsWrapper">
      <div class="foodDetails">
        <div class="foodContent">
          <div class="banner">
            <img :src="foodDetails.image">
            <div class="back" @click="hideToggle">
              <span class="iconfont icon-weibiaoti6-copy"></span>
            </div>
          </div>
          <div class="foodinfo">
            <div class="name">{{foodDetails.name}}</div>
            <v-priceinfo :sales-info="foodDetails"></v-priceinfo>
            <div class="btnWrapper">
              <v-cartcontrol :food="foodDetails"></v-cartcontrol>
              <!--为什么不能绑定 @add="increase($event)"-->
            </div>
            <div class="addToCart" v-show="!foodDetails.count||foodDetails.count===0" @click="addToCart($event)">加入购物车</div>
          </div>
        </div>
        <v-split v-show="foodDetails.info"></v-split>
        <div class="desc" v-show="foodDetails.info">
          <h3 class="title">商品信息</h3>
          <p class="content">{{foodDetails.info}}</p>
        </div>
        <v-split v-show="foodDetails.info"></v-split>
        <div class="evaluation">
          <h3 class="title">商品评价</h3>
          <v-evaluation :desc="desc" :only-content="onlyContent" :selected-type="selectedType" @type-change="typeStatus" @content-change="contentStatus" :ratings="foodDetails.ratings"></v-evaluation>
          <div class="ratingLists">
            <ul class="hasRatings" v-show="foodDetails.ratings&&foodDetails.ratings.length>0">
              <li class="ratingItem" v-for="(item,index) in foodDetails.ratings" v-show="wantShow(item.rateType,item.text)">
                <div class="top">
                  <span class="time">{{item.rateTime | time}}</span>
                  <div class="userInfo">
                    <span class="id">{{item.username}}</span>
                    <img class="avatar" :src="item.avatar"/>
                  </div>
                </div>
                <div class="comment">
                  <span class="iconfont icon-damuzhi" v-if="item.rateType===0" :class="{'good':item.rateType===0}"></span>
                  <span class="iconfont icon-down" v-else :class="{'bad':item.rateType!==0}"></span>
                  <span class="content">{{item.text}}</span>
                </div>
              </li>
            </ul>
            <div class="noRating" v-show="!foodDetails.ratings||foodDetails.ratings.length===0">暂无评价</div>
          </div>
        </div>

      </div>
    </div>
  </transition>

</template>

<script>
  import Vue from "vue";
  import BScroll from "better-scroll"
  import pirceInfo from "../common/price/price.vue"
  import cartControl from "../common/cartControl/cartControl.vue"
  import split from "../common/split/split.vue"
  import evaluation from "../common/evaluation/evaluation.vue"
  import "../../assets/js/time.js"
  const Good=0;
  const Bad=1;
  const All=2;
  export default{
    components:{
      "v-priceinfo":pirceInfo,
      "v-cartcontrol":cartControl,
      "v-split":split,
      "v-evaluation":evaluation
    },
    props: {
      foodDetails: Object
    },
    data(){
      return {
        showFlag: false,
        selectedType:2,
        onlyContent:false,
        desc:{
          good:"推荐",
          bad:"吐槽",
          all:"全部"
        }
      }
    },
    created(){
      this.$root.eventHub.$on("aaa",(type)=>{
        this.typeStatus(type)
      });
      this.$root.eventHub.$on("bbb",(val)=>{
        this.contentStatus(val)
      })
    },
    methods: {
      typeStatus(type){
        this.selectedType=type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      contentStatus(val){
        this.onlyContent=val;
        this.$nextTick(()=>{
          this.scroll.refresh();
        })
      },
      showToggle() {
//        this.selectedType=2;   //这两句没生效？为什么？
//        this.onlyContent=false;
        this.showFlag = !this.showFlag;
        this.$nextTick(()=>{
          if(!this.scroll){
            this.scroll=new BScroll(this.$refs.detailsWrapper,{click:true})
           }else{
            this.scroll.refresh();
          }
        })
      },
      hideToggle(){
        this.showFlag = false;
      },
      addToCart(event){
        console.log("click")
        if(!event._constructed){
          return;
        }
        Vue.set(this.foodDetails,"count",1)
      },
      wantShow(type,text){
        //根据按钮类型，显示不同内容
        //全部显示（done）
        //选择good部分
        if(this.onlyContent&&!text){//当勾选"显示有内容评论"，但实际评论内容为空时，返回false。=>此时不显示
          return false;
        }
        if(this.selectedType===All){
          return true;
        }else{
          return type===this.selectedType;
        }

      }
//      increase(event){
//        this.$root.eventHub.$emit('foodDetails.add', event.target)
//      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  @import "./fooddetails.styl";
</style>
