<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'heightlight': totalCount > 0 }">
                        <i class="icon-shopping_cart" :class="{'heightlight': totalCount > 0 }"></i>
                    </div>
                    <div class="num" v-show="totalCount > 0"> <!--上面小标-->
                        {{totalCount}}
                    </div>
                </div>
                <div class="price" :class="{'heightlight': totalPrice > 0 }">
                    ￥{{totalPrice}}
                </div>
                <div class="desc">
                    另需配送费 ￥{{deliveryPrice}}元
                </div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass">
                   {{payDsc}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    computed:{
        totalPrice(){ // 总价
            let total = 0;
            this.selectfood.forEach((food) => {
                total += food.price * food.count;
            });
            return total;
        },
        totalCount(){ // 总数量
            let count = 0;
            this.selectfood.forEach((food) => {
                count+= food.count;
            })
            return count;
        },
        payDsc(){ // 计算差价
            if(this.totalPrice === 0 ){ // 多少元起送
                return `￥${this.minPrice}元起送`;
            }else if(this.totalPrice < this.minPrice){
                let diff = this.minPrice - this.totalPrice;
                return `还差 ￥${diff}元起送`;
            }else{
                return `去结算`
            }
        },
        payClass(){ // 去结算样式
            if(this.totalPrice < this.minPrice){
                return `not-enough`
            }else{
                return `enough`
            }
        }
    },
    props:{
        selectfood:{ // 传过来的商品
            type:Array,
            default(){
                return [
                    {
                        price:10,
                        count:1
                    }
                ];
            }
        },
        deliveryPrice:{ // 配送
            type:Number,
            default:0
        },
        minPrice:{ // 起送
            type:Number,
            default:0
        }
    }
}
</script>
<style  lang="scss" scoped="" type="text/scss">
    .shopcart{
        position: fixed;
        left:0;
        bottom: 0;
        z-index: 50;
        width: 100%;
        height: 48px;
        .content{
            display:flex;
            background: #14172d;
            font-size:0;
            .content-left{
                flex:1;
                .logo-wrapper{
                    display: inline-block;
                    position: relative;
                    top:-10px;
                    margin: 0 12px;
                    padding: 6px;
                    width:56px;
                    height:56px;
                    box-sizing: border-box;
                    vertical-align: top;
                    border-radius: 50%;
                    background: #14172d;
                    .logo{
                        width:100%;
                        height:100%;
                        border-radius: 50%;
                        background:#2b343c;
                        text-align: center;
                        &.heightlight{
                            background: rgb(0,160,220);
                        }
                        .icon-shopping_cart{
                            color:#80858a;
                            font-size:24px;
                            line-height: 44px;
                            &.heightlight{
                                color:#fff;

                            }
                        }
                    }
                    .num{
                        position: absolute;
                        top:0;
                        right: 0;
                        width: 24px;
                        height: 16px;
                        line-height: 16px;
                        text-align: center;
                        border-radius: 16px;
                        font-size: 9px;
                        font-weight: 700;
                        color:#fff;
                        background: rgb(240,20,20);
                        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
                    }
                }
                .price{
                    display: inline-block;
                    vertical-align: top;
                    line-height: 24px;
                    margin-top:12px;
                    box-sizing: border-box;
                    padding-right: 12px;
                    color:rgba(255,255,255,0.4);
                    border-right: 1px solid rgba(255,255,255,0.1);
                    font-size: 16px;
                    font-weight: 700;
                    &.heightlight{
                        color:#fff;
                    }
                }
                .desc{
                    display: inline-block;
                    vertical-align: top;
                    line-height: 24px;
                    margin: 12px 0 0 12px;
                    line-height: 24px;
                    color: rgba(255,255,255,0.4);
                    font-size: 10px;
                }
            }
            .content-right{
                flex: 0 0 105px;
                width:105px;
                .pay{
                    height: 48px;
                    line-height: 48px;
                    text-align: center;
                    font-size: 12px;
                    color:rgba(255,255,255,0.4);
                    font-weight: 700;
                    background: #2b333b;
                    &.not-enough{
                        background:#2b333b;
                    }
                    &.enough{
                        background: #00b43c;
                        color:#fff;
                    }
                }
            }
        }
    }
</style>
