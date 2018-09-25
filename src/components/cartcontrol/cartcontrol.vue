<template>
    <div class="cartcontrol">
        <!-- 减号 -->
        <transition name="move">
            <div class="cart-decrease" v-show="food.count > 0" @click="decreaseCart()">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count > 0">
            {{food.count}}
        </div>
        <!-- 加号 -->
        <div class="cart-add icon-add_circle" @click="addCart()">
            
        </div>
    </div>
</template>
<script>
/**关联购买的商品 */
import Vue from 'vue';
export default {
    data(){
        return{
            
        }
    },
    created(){
        // console.log(this.food)
    },
    methods:{
        addCart(){ // 增加商品
           // console.log("click");
            // if(!event._constructed){ // 不是自己派发的，浏览器无_constructed属性，防止多次触发(此处不用禁用)
            //     return;
            // }

            //  vue中不存在的属性 无法监听变化所以用到Vue.set
            // if(!this.food.count){ // 第一次点击  
            //     this.food.count = 1;
            // }else{
            //     this.food.count++;
            // }

            if(!this.food.count){
                Vue.set(this.food,'count',1); // 这样就可以监听count的变化
            }else{
                this.food.count++;
            }

        },
        decreaseCart(){ // 减少商品
            if(this.food.count){
                this.food.count--;
            }else{

            }
        }
    },
    props:{ // 购买的关联商品 
        food:{
            type:Object
        }
    }
}
</script>
<style  lang="scss" scoped="" type="text/scss">
    .cartcontrol{
        font-size:0;
        .cart-decrease{
            display:inline-block;
            padding:6px;
            .inner{
                display:inline-block;
                line-height:24px;
                font-size:24px;
                color:rgb(0,160,220);
                transition: all 0.4s linear;
                transform: rotate(0);
            }
            &.move-enter-active, &.move-leave-active{
                transition: all 0.4s linear
            }
            &.move-enter, &.move-leave-active{ // 进入动画和退出动画
                opacity: 0; // 动画开始透明度为零， 结束的时候透明度也为零
                transform: translate3d(24px, 0, 0);
                .inner{
                    transform: rotate(180deg);
                }
            }
        }
        .cart-count{
            display:inline-block;
            font-size:10px;
            vertical-align:top;
            width:12px;
            padding-top:6px;
            line-height:24px;
            text-align:center;
            color:rgb(147,153,159);
        }
        .cart-add{
            display:inline-block;
            line-height:24px;
            font-size:24px;
            padding:6px;
            color:rgb(0,160,220);
        }
    }
</style>
