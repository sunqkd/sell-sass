<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo">
                        <i class="icon-shopping_cart"></i>
                    </div>
                    <div class="num">
                        
                    </div>
                </div>
                <div class="price">
                    ￥{{totalPrice}}
                </div>
                <div class="desc">
                    另需配送费 ￥{{deliveryPrice}}元
                </div>
            </div>
            <div class="content-right">
                <div class="pay">
                   ￥{{minPrice}}元 起送
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
        totalCount(){
            let count = 0;
            this.selectfood.forEach((food) => {
                count+= food.count;
            })
            return count;
        }
    },
    props:{
        selectfood:{
            type:Array,
            default(){
                return [];
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
                        .icon-shopping_cart{
                            color:#80858a;
                            font-size:24px;
                            line-height: 44px;
                        }
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
                }
            }
        }
    }
</style>
