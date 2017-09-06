<template>
  <div class="star">
    <div :class="starType">
      <span class="starItem" v-for="(itemClass,index) in itemClasses" :class="itemClass"></span>
    </div>
  </div>
</template>

<script>
  const star_length=5;
  const cls_on="on";
  const cls_off="off";
  const cls_half="half";
  export default({
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType(){
        return "star-" + this.size;
      },
      itemClasses(){
        let itemClasses=[];
        let score=Math.floor(this.score*2)/2;
        let hasDecimal=score%1!==0;
        let integer=Math.floor(score);
        for(let i=0;i<integer;i++){
          itemClasses.push(cls_on);
//          console.log("dsdfdshgf")
        }
        if(hasDecimal){
          itemClasses.push(cls_half)
        }
        while(itemClasses.length<star_length){
          itemClasses.push(cls_off)
        }
//        console.log(itemClasses);
        return itemClasses;
      }
    }

  })
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./star.styl";
</style>
