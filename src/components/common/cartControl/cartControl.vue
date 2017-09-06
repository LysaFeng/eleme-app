<template>
  <div class="cartControl">
    <transition  name="fadeRotate">
      <a class="decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
          <span class="inner">-</span>
      </a>
    </transition>
    <span class="number" v-show="food.count>0" @click="test">{{food.count}}</span>
    <a class="add" @click.stop.prevent="addCart">+</a>
  </div>
</template>

<script>
import  Vue from "vue";
export default{
  props:{
    food:{
      type:Object
    }
  },
  created(){
//    console.log(this.food)
  },
  methods:{
    addCart:function(){
      if(!this.food.count){
        Vue.set(this.food,'count',1)//创建对象中不存在的属性
        this.food.count=1
      }else{
        this.food.count++
      }
      this.$emit('add', event.target);
      // 自定义事件：子组件将数据回传给父组件；教程：http://www.runoob.com/vue2/vue-component.html
    },
    decreaseCart:function(){
      this.food.count--
    },
    test:function(){
      console.log("ddddddddweisheme")
    }
  }

}
</script>

<style lang="stylus" type="text/stylus">
@import "cartControl.styl";
</style>
