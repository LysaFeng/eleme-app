<template>
	<div class="ratings" ref="ratingsContainer">
    <div class="ratingsContainer">
      <!--<div class="inner">-->
        <div class="scoreWrapper">
          <div class="overallScore">
            <div class="scores">{{seller.score}}</div>
            <div class="title">综合评分</div>
            <div class="compared">高于其他商家{{seller.rankRate}}%</div>
          </div>
          <div class="scoreItems">
            <div class="attitude">
              <span class="item">服务态度</span>
              <v-star :size=36 :score=seller.serviceScore></v-star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="delivery">
              <span class="item">送货态度</span>
              <v-star :size=36 :score=seller.foodScore></v-star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="time">
              <span class="item">送达时间</span>
              <span class="minute">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <v-split></v-split>
        <v-evaluation :only-content="onlyContent" :selected-type="selectedType" :ratings="ratings"></v-evaluation>
        <div class="ratingLists">
          <ul>
            <li class="ratingItem" v-for="(item,index) in ratings"  v-show="wantShow(item.rateType,item.text)">
              <div class="name">{{item.username}}</div>
              <div class="rankInfo">
                <v-star :size=36 :score=item.score></v-star>
                <span class="deliveryTime"  v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
              </div>
              <div class="comment">{{item.text}}</div>
              <div class="menuType">
                <span :class="item.rateType? 'iconfont icon-damuzhi':'iconfont icon-down'"></span>
                <span class="menuItem" v-for="menuItem in item.recommend">{{menuItem}}</span>
              </div>
              <div class="time">
                {{item.rateTime | time}}
              </div>
              <img class="avatar" :src="item.avatar">
            </li>
          </ul>
        <!--</div>-->
      </div>
        <div class="tip">我是有底线的</div>
    </div>
	</div>
</template>

<script>
  import BScroll from "better-scroll"
  import star from "../star/star.vue"
  import split from "../common/split/split.vue"
  import evaluation from "../common/evaluation/evaluation.vue"
  import"../../assets/js/time.js"
  const All=2;
	export default{
    components:{
      "v-star":star,
      "v-split":split,
      "v-evaluation":evaluation
    },
    props:['seller'],
    data(){
      return {
        ratings:[],
        selectedType:2,
        onlyContent:false,
      }
    },
    created(){
      //axios请求数据
      this.$axios.get("static/data/data.json").then((res)=>{
        this.ratings=res.data.ratings;
        this.$nextTick(()=>{
          this.initScroll();
        })
      });

      this.$root.eventHub.$on("aaa",(type)=>{
        this.typeStatus(type)
      })

      this.$root.eventHub.$on("bbb",(val)=>{
        this.contentStatus(val)
      })
    },
    methods:{
      initScroll(){
        this.scroll = new BScroll(this.$refs.ratingsContainer, {
          click: true
        });
      },
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
    }

	}
</script>

<style lang="stylus" type="text/stylus">
  @import "ratings.styl";
</style>
