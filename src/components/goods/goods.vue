<template>
    <div class="goods">
        <!-- 菜单栏 -->
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" :key="index" class="menu-item" :class = "{'current': currentIndex == index}" @click="selectMenu(index,$event)">
                    <span class="text border-1px">
                       <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span> {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <!-- 商品区域 -->
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="(item,index) in goods" :key="index" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="(food,index) in item.foods" :key="index" class="food-item border-1px" @click="selectFood_Detail(food,$event)">
                            <!-- 左侧图片-->
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon" alt="">
                            </div> 
                            <!--右侧内容-->
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <!-- 控制按钮加减号 -->
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food = "food" @add="addFood"></cartcontrol>
                                </div>
                            </div> 
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- 购物车 -->
        <shopcart ref="shopcart" :selectfood = "selectfood" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
        <!-- 商品详情页 -->
        <food :food="selectFoodDetail" ref="food"></food>
    </div>
</template>
<script>
const ERROR_OK = 0;
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart.vue';  // 购物车
import cartcontrol from '../cartcontrol/cartcontrol.vue'; // 控制按钮
import food from '../food/food.vue'; // 商品详情界面

export default {
    data(){
        return {
            goods:[],
            listHeight:[], // 区块高度
            classMap:["decrease","discount","special","invoice","guarantee"],
            scrollY: 0, // 右侧y轴值
            selectFoodDetail:{} // 选中的商品 用于商品详情
        }
    },
    created(){
        this.getGoods()
    },
    computed:{
        currentIndex() {
            for(let i=0;i<this.listHeight.length;i++){
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if( !height2  || (this.scrollY >= height1 && this.scrollY < height2)  ){
                    return i;
                }
            }
            return 0;
        },
        selectfood(){
            let foods = [];
            this.goods.forEach( (good) => {
                good.foods.forEach( (food)=>{
                    if(food.count){
                        foods.push(food);
                    }
                })
            });
            return foods;
        }
    },
    mounted(){
        
    },
    methods:{
        getGoods(){
            this.$ajax.get("/apis/goods")
                .then((response)=>{
                    if(response.data.errno == ERROR_OK){
                        this.goods = response.data.data;
                        this.$nextTick( () => {
                            this._initScroll();
                            this._calculateHeight();
                        } )
                    }
                })
                .catch((response) =>{
                    console.log(response)
                })
        },
        _initScroll(){ // 实例化
            this.menuScroll = new BScroll(this.$refs.menuWrapper,{ 
                click:true
            });
            this.foodScroll = new BScroll(this.$refs.foodsWrapper,{ 
                click:true, // 点击事件生效（购买增加商品）
                probeType: 3 // 配置项 监听位置
            })

            // 监听滚动
            this.foodScroll.on('scroll',(pos) => {
                this.scrollY = Math.abs( Math.round(pos.y) );  // 四舍五入取绝对值
                // console.log( Math.round(pos.y) )
            })
        },
        _calculateHeight(){ // 计算高度(最后多有一个)
            let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
            let height = 0;
            this.listHeight.push(height);
            for(let i=0;i<foodList.length;i++){
                let item = foodList[i];
                height+= item.clientHeight;
                this.listHeight.push(height);
            }
            // console.log(this.listHeight)
        },
        selectMenu(index,event) {
            // better-scroll 会覆盖掉点击事件等默认事件 实例化的时候需要传入参数
            // console.log(index)
            // console.log(event)
            let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
            let el = foodList[index];
            this.foodScroll.scrollToElement(el,300);
        },

        addFood(target){
            // target 为点击的加号节点
            // console.log(target)
            this._drop(target);
        },
        _drop(target){ // 下落动画函数(传入节点)
            // 体验优化，异步执行下落动画
            this.$nextTick( () => {
                this.$refs.shopcart.drop(target);
            })
        },
        selectFood_Detail(food,event){ // 用于详情页
            this.selectFoodDetail = food;
            this.$refs.food.show(); // 详情页面显示
        }
    },
    components:{
        "shopcart":shopcart, // 购物车
        "cartcontrol":cartcontrol, // 控制按钮
        "food":food // 商品详情页
    },
    props:{
        seller:{
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
                &.current{
                    position:relative;
                    margin-top:-1px;
                    z-index: 10;
                    background: #fff;
                    font-weight: 700;
                    .text{
                        @include border-none();
                    }
                }
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
                    margin-right: 10px;
                }
                .content{
                    flex:1;
                    .name{
                        margin: 2px 0 8px 0;
                        height:14px;
                        line-height: 14px;
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                    }
                    .desc{
                        margin-bottom: 8px;
                        line-height: 12px;
                        font-size: 10px;
                        color:rgb(147, 153, 159);
                    }
                    .extra{
                        line-height: 10px;
                        font-size: 10px;
                        color:rgb(147, 153, 159);
                        .count{
                            margin-right: 12px;
                        }
                    }
                    .price{
                        font-weight: 700;
                        line-height: 24px;
                        .now{
                            margin-right: 8px;
                            font-size: 14px;
                            color:rgb(240,20,20);
                        }
                        .old{
                            text-decoration: line-through;
                            font-size:10px;
                            color:rgb(147, 153, 159);
                        }
                    }
                    .cartcontrol-wrapper{
                        position:absolute;
                        right:0;
                        bottom:12px;
                    }
                }
            }
        }
    }
</style>
