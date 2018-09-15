<template>
    <div class="goods">
        <!-- 菜单栏 -->
        <div class="menu-wrapper">
            <ul>
                <li v-for="(item,index) in goods" :key="index" class="menu-item">
                    <span class="text border-1px">
                       <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span> {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <!-- 商品区域 -->
        <div class="foods-wrapper">
            <ul>
                <li v-for="(item,index) in goods" :key="index" class="food-list">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="(food,index) in item.foods" :key="index" class="food-item border-1px">
                            <!-- 左侧图片-->
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon" alt="">
                            </div> 
                            <!--右侧内容-->
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span>月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}}</span>
                                </div>
                                <div class="price">
                                    <span>￥{{food.price}}</span>
                                    <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                            </div> 
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
const ERROR_OK = 0;
export default {
    data(){
        return {
            goods:[],
            classMap:["decrease","discount","special","invoice","guarantee"]
        }
    },
    created(){
        this.getGoods()
    },
    methods:{
        getGoods(){
            this.$ajax.get("/apis/goods")
                .then((response)=>{
                    if(response.data.errno == ERROR_OK){
                        this.goods = response.data.data;
                        console.log(this.goods)
                    }
                })
                .catch((response) =>{
                    console.log(response)
                })
        }
    },
    props:{
        sellers:{
            type:Object
        }
    }
}
</script>
<style lang="scss" scoped="" type="text/scss">
    @import "../../common/stylus/mixin";
    .goods{
        width:100%;
        position:absolute;
        top:174px;
        left:0;
        bottom: 46px; // 定义视口高度
        display:flex;
        overflow: hidden;
        .menu-wrapper{
            flex: 0 0 80px;
            width:80px;
            background: #f3f5f7;
            .menu-item{
                display: table;
                height:54px;
                width:56px;
                line-height:14px;
                padding: 0 12px;
                .text{
                    display: table-cell;
                    width:56px;
                    vertical-align: middle;
                    font-size: 12px;
                    @include border-px(rgba(7,17,27,0.2));
                    .icon{
                        display: inline-block;
                        vertical-align: top;
                        width:12px;
                        height:12px;
                        margin-right:2px;
                        background-size:12px 12px;
                        background-repeat: no-repeat;
                        &.decrease{
                            @include bg-image("decrease_3")
                        }
                        &.discount{
                            @include bg-image("discount_3")
                        }
                        &.guarantee{
                            @include bg-image("guarantee_3")
                        }
                        &.invoice{
                            @include bg-image("invoice_3")
                        }
                        &.special{
                            @include bg-image("special_3")
                        }
                    }
                }
            }
        }
        .foods-wrapper{
            flex: 1;
            .title{
                padding-left: 14px;
                height:26px;
                line-height:26px;
                border-left:2px solid #d9dde1;
                font-size:12px;
                color:rgb(147, 153, 159);
                background:#f3f5f7;
            }
            .food-item{
                display:flex;
                margin:18px; // 上下margin 重叠
                padding-bottom:18px;
                @include border-px(rgba(7,17,27,0.2));
                &:last-child{
                    @include border-none();
                    margin-bottom: 0px;
                }
                .icon{
                    flex: 0 0 57px;
                }
            }
        }
    }
</style>
