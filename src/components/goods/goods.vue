<template>
  <div class="goods">
    <div class="menuWrap" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menuItem border-1px" :class="{'current':currentIndex===index}" @click="selectFoodsType(index,$event)">
          <span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>
          <span class="text">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foodsWrap" ref="foodsWrapper">
      <ul>
        <li v-for="(foodsType,index) in goods" class="foodsType foodsType-hook" >
          <h1 class="title">{{foodsType.name}}</h1>
          <ul>
            <li v-for="(typeDetails,index) in foodsType.foods" class="typeDetails border-1px" @click="openDetails(typeDetails)">
              <div class="icon">
                <img :src="typeDetails.icon">
              </div>
              <div class="content">
                <h2 class="name">{{typeDetails.name}}</h2>
                <p class="description">{{typeDetails.description}}</p>
                <!--<div class="extra">-->
                  <!--<span class="count">月售{{typeDetails.sellCount}}份</span><span>好评率{{typeDetails.rating}}%</span>-->
                <!--</div>-->
                <!--<div class="price">-->
                  <!--<span class="now">￥{{typeDetails.price}}</span><span v-show="typeDetails.oldPrice" class="old">￥{{typeDetails.oldPrice}}</span>-->
                <!--</div>-->
                <v-priceinfo :sales-info="typeDetails"></v-priceinfo>
                <div class="btnWrapper">
                  <v-cartcontrol :food="typeDetails" @add="increment"></v-cartcontrol>
                  <!--自定义事件：谁触发谁调用-->
                </div>
              </div>

            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--<div class="test" @click="test">测试一下</div>-->
    <!--<div>-->
      <v-shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-deliveryprice="seller.minPrice"></v-shopcart>
      <v-fooddetails :food-details="selectFood" v-if="selectFood" ref="myFood"></v-fooddetails>
    <!--</div>-->
  </div>
</template>

<script>
  import Vue from "vue"
  import BScroll from "better-scroll"
  import shopCart from "../shopcart/shopcart"
  import foodDetails from "../fooddetails/fooddetails"
  import cartControl from "../common/cartControl/cartControl.vue"//为什么不加后缀.vue报错
  import pirceInfo from "../common/price/price.vue"//为什么不加后缀.vue报错

  const ERR_OK=0;
//  const eventHub =new Vue();
  export default{
    props:['seller'],
    components:{
     "v-shopcart" :shopCart,
      "v-cartcontrol":cartControl,
      "v-fooddetails":foodDetails,
      "v-priceinfo":pirceInfo
    },
    data(){
      return{
        goods:[],
        classMap:[],
        heightList:[],
        foodsScrollY:0,
        selectFood: ""//为什么是空字符串？？？而不是空对象
      }
    },
    computed:{
      currentIndex(){
        for(let i=0;i<this.heightList.length;i++){
          let height1=this.heightList[i];
          let height2=this.heightList[i+1];
          if(!height2||(this.foodsScrollY>=height1&&this.foodsScrollY<height2)){
            return i;
          }
        }
        return 0;
      },
      selectFoods(){
        let selected=[];
        this.goods.forEach(function(goodsType){
          goodsType.foods.forEach(function(typeDetails){
            if(typeDetails.count>0){
              selected.push(typeDetails)
            }
          })
        })
        return selected;
      }
    },
    created(){
        //vue-resource请求数据
//      this.$http.get("/api/goods").then((response)=>{
//        response=response.body;
//        if(response.errno===ERR_OK){
//          this.goods=response.data;
//          this.$nextTick(()=>{
//            this._initScroll();
//            this._calculateHeight();
//          })
//        }
//      });

        //axios请求数据
      this.$axios.get('static/data/data.json').then((res) => {//url路径不能用"/api/goods",否则不能请求成功
        this.goods = res.data.goods
        this.$nextTick(() => {
        this._initScroll(); // 初始化scroll
        this._calculateHeight(); // 初始化列表高度列表
      })
    });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods:{
      _initScroll() {
        this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        // 监控滚动事件
        this.foodsScroll.on('scroll', (pos) => {
          this.foodsScrollY = Math.abs(Math.round(pos.y))
      })
      },
      _calculateHeight(){
        let foodsType=this.$refs.foodsWrapper.querySelectorAll(".foodsType-hook");
        console.log("dddd"+foodsType)
        let height=0;
        this.heightList.push(height);
////为什么如下forEach方式后台报错：foodsType.forEach is not a function
//        foodsType.forEach(function(item,index){
//          console.log(item+" "+index)
//
//          height+=item.clientHeight;
//          this.heightList.push(height);
//        })
        for(let i=0;i<foodsType.length;i++){
          height+=foodsType[i].clientHeight;
          this.heightList.push(height);
        }
      },
//      selectFoodsType(position){
//        let foodsType=this.$refs.foodsWrapper.getElementsByClassName("foodsType-hook");
//        let currentFoodsType=foodsType[position];
//        this.foodsScroll.scrollToElement(currentFoodsType,300);
//      },

      selectFoodsType(index, event) {
        if (!event._constructed) {
          return
        }
        this.foodsScroll.scrollTo(0, -this.heightList[index], 300)
      },
      increment(target){
        this.$refs.shopcart.drop(target)//this.$refs.shopCart指向shopCart组件;调用shopCart子组件drop方法
//        shopcart要引用cartControl的数据,也可以采用子组件事件通信.参考：https://segmentfault.com/a/1190000008018314
      },
      openDetails(food){
        this.selectFood = food;
        console.log("好难啊",this.selectFood)
        this.$nextTick(() => {
        this.$refs.myFood.showToggle()
       })
      }
    }
  }
</script>

<style lang="stylus" type="stylesheet/stylus">
  @import "./goods.styl";
</style>
