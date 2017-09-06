<template>
  <div class="ratingsWrapper">
    <div class="ratingsType">
      <span class="type all" :class="{'active':selType===2}" @click="selectType(2,$event)">{{desc.all}}<i class="num">{{ratings.length}}</i></span>
      <span class="type good" :class="{'active':selType===1}" @click="selectType(1,$event)">{{desc.good}}<i class="num">{{good.length}}</i></span>
      <span class="type bad" :class="{'active':selType===0}" @click="selectType(0,$event)">{{desc.bad}}<i class="num">{{bad.length}}</i></span>
    </div>
    <div class="switch" @click="changeContent($event)">
      <span class="iconfont icon-gou" :class="{'active':oContent}"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const Good=0;
  const Bad=1;
  const All=2;
  export default{
    data(){
      return{
        selType:this.selectedType,
        oContent:this.onlyContent
      }
    },
    computed:{
      good() {
        return this.ratings.filter((item) => {
            return item.rateType === Good;
      });
      },
      bad() {
        return this.ratings.filter((item) => {
            return item.rateType === Bad;
      });
      }
    },
    props:{
      ratings:{
        type:Array,
        default(){
          return [];
        }
      },
      selectedType: {//不能对props值直接进行更改，否则数据虽然会正确显示，但会报错。（需要借助data方法来更改）
        type:Number,
        default:All
      },
      onlyContent:{
        type:Boolean,
        default:false
      },
      desc:{
        type:Object,
        default(){
          return{
            good:"满意",
            bad:"不满意",
            all:"全部"
          }
        }
      }
    },
    methods:{
      selectType(type,event){
        if (!event._constructed){
          return;
        }
        this.selType=type;
        this.$emit("typeChange",type);
        this.$root.eventHub.$emit("aaa",type)
      },
      changeContent(event){
        if (!event._constructed){
          return;
        }
        this.oContent=!this.oContent;
        this.$emit('contentChange',this.oContent)
        this.$root.eventHub.$emit("bbb",this.oContent)
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
@import "./evaluation.styl";
</style>
