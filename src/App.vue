<template>
	<div id="app">
		<v-header :seller='seller'></v-header>
		<div class="tab border-1px">
			<ul>
				<router-link tag="li" class="tab-item" to="/goods"><a>商品</a></router-link>
				<router-link tag="li" class="tab-item" to="/ratings"><a>评论</a></router-link>
				<router-link tag="li" class="tab-item" to="/seller"><a>商家</a></router-link>
			</ul>
		</div>
    <keep-alive>
      <!--记录各组件状态:会缓存不活动的组件实例，而不是销毁它们,避免重新渲染。-->
      <router-view :seller="seller"></router-view>
    </keep-alive>
	</div>
</template>

<script>
	import Header from "./components/header/header.vue"
  import {urlParse} from "./assets/js/utils.js"
	const ERR_OK=0
	export default {
		name: 'app',
		data(){
			return{
				seller:{}
//        id:(()=>{
//          let queryParam=urlParse();//获取对象形式的url参数；
//          console.log(queryParam);
//          return queryParam.id;
//        })(),
			}
		},
		created:function(){
      //vue-resource请求数据
//			this.$http.get('/api/seller').then((response)=>{
//				response=response.body;
//				console.log(response);
//				if(response.errno===ERR_OK){
//					this.seller=response.data;
//					console.log(this.seller);
//				}
//			})
      //axios请求数据
      this.$axios.get('static/data/data.json').then((res) => {
        this.seller = res.data.seller
        this.seller=Object.assign({},this.seller,{id:12345});
        console.log(this.seller)
       })
    },
		components: {
			'v-header': Header
		},
		beforeCreate:function(){
			this.$router.push('/ratings')
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
/*css书写规范 :布局(display,position.etc)写在前面,接着宽高,可被继承的样式(字体,颜色,.etc)写在后面*/
/*tab--flex布局*/
	@import './assets/stylus/mixin';
.tab{
	width: 100%;
	height: 40px;
	line-height: 40px;
	border-1px(rgba(7,17,27,0.1))
	/*导航底部1px的问题，不能直接设置border-bottom为1px*/
}

.tab ul{
	display: flex;
}
.tab-item{
	flex: 1;
	text-align: center;
}
/*必须将a转换成块级元素,才能是a的宽度达到页面的三分之一（转换成display:inline-block无效）*/
.tab-item a{
	display: block;
	font-size: 14px;
	color: rgb(77,85,93);
}

.tab-item a:hover{
	color: rgb(240,20,20);
}

</style>
