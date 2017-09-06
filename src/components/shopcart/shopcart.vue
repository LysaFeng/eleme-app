<template>
  <div class="shopcartWrapper">
    <div class="shopCart">
      <div class="contentWrapper" @click="toggleList">
        <div class="contentLeft">
          <div class="logoWrapper">
            <div class="logo" :class="{highlight:totalCount>0}">
              <span class="iconfont icon-gouwuche"></span>
            </div>
            <div class="number" v-show="totalCount>0">
              {{totalCount}}
            </div>
          </div>
          <div class="price" :class="{highlight:totalCount>0}">￥{{totalPrice}}元</div>
          <div class="else">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="contentRight" :class="{enough:totalPrice>=minDeliveryprice}" @click.stop.prevent="gotoPay">
          <span class="condition">{{condition}}</span>
        </div>
      </div>

      <div class="ballWrapper">
        <div v-for="(item,index) in balls">
          <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="item.show">
              <!--transition的使用须与如下指令配合使用：1.v-if 2.v-show 3.动态组件 4.组件根节点-->
              <div class="inner inner-hook"></div>
              <!--样式内的inner-hook只是表示用于js的选择，无其他作用-->
            </div>
          </transition>
        </div>
      </div>

      <transition name="fold">
        <div class="selectedlistsWrapper" v-show="listShow">
          <div class="header clearfix">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="content" ref="content">
            <ul>
              <li class="selectedList" v-for="(item,index) in selectFoods">
                <span class="name">{{item.name}}</span>
                <span class="price">{{item.price*item.count}}</span>
                <div class="cartcontrolWrapper">
                  <v-cartcontrol :food="item"></v-cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="listsMask" v-show="listShow" @click="hideLists"> </div>
    </transition>
  </div>
</template>

<script>
  import cartControl from "../common/cartControl/cartControl.vue"//为什么不加后缀.vue报错
  import BScroll from "better-scroll"

  export default{
    components:{
      "v-cartcontrol":cartControl
    },
    props:{
      deliveryPrice:{
        type:Number,
        default:0
      },
      minDeliveryprice:{
        type:Number,
        default:0
      },
      selectFoods:{
        type:Array,//vue里面，type为array或者object时，default返回为一个函数
        default(){
            return []
        }
      }
    },
    data(){
      return{
        balls:[
          {show:false},
          {show:false},
          {show:false},
          {show:false},
          {show:false}
        ],
        dropBalls:[],//已经下落的小球（show为true时）
        fold:true,
        countToggle:0
      }
    },
//    created(){
//      this.$root.eventHub.$on('foodDetails.add', this.drop)
//    },
    computed:{
      totalPrice(){
        let total=0;
        this.selectFoods.forEach(function(item){
          total+=item.count*item.price;
        })
        return total;
      },
      totalCount(){
        let total=0;
        this.selectFoods.forEach(function(item){
          total+=item.count;
        })
        return total;
      },
      condition(){
        if(this.totalPrice===0){
          return `￥${this.minDeliveryprice}起送`
        }else if(this.totalPrice-this.minDeliveryprice<0){
          let priceGap=this.minDeliveryprice-this.totalPrice;
          return `还差￥${priceGap}元起送`;
        }else{
          return `去结算`
        }
      },
      listShow(){
        //fold与listshow状态关系：fold为真，listshow为false；fold为假，listshow为true;
        if(!this.totalCount){//totalCount=0时
          this.fold=true;
          return false;
        }
        let show=!this.fold;
        console.log("show:"+show)
        if(show){//当列表展示时，better-scroll也启用
          this.$nextTick(()=>{//由于数据变化，DOM的变化不一定立即生效，better-scroll严重依赖于DOM
            if(!this.scroll){//DOM数据不断变化，不必不断newBSscroll,利用Better-scroll的refresh()接口
              console.log(111);
              this.scroll=new BScroll(this.$refs.content,{click:true})
             }else{
              this.scroll.refresh();
            }
          })
        }
        return show;
      }
    },
    methods:{
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;//触发小球缓动
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter(el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.querySelector('.inner-hook')
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter(el) {
        el.offsetHeight // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'//纵向移动
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.querySelector('.inner-hook')
          inner.style.webkitTransform = 'translate3d(0,0,0)'//横向移动
          inner.style.transform = 'translate3d(0,0,0)'
        })
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      toggleList(){
        if(!this.totalCount){
          return true;
        }
        this.fold=!this.fold;
        this.countToggle++;
        console.log("点了几次:"+this.countToggle)
        console.log("fold:"+this.fold)
        console.log("listShow:"+this.listShow)
      },
      empty(){
        this.selectFoods.forEach((item)=>{
          item.count=0;
        })
      },
      gotoPay(){
        this.fold=true;//selectList未隐藏，可能是因为alert阻塞了进程（transition时间0.5s）?
        if (this.totalPrice<this.minDeliveryprice){
          return;
        }
        alert(`请支付${this.totalPrice}元`)
      },
      hideLists(){
        this.fold=true;
      }
    }
  }

</script>

<style lang="stylus" type="text/stylus">
@import "./shopcart.styl";
</style>
