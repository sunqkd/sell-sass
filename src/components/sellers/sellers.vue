<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">
                    {{seller.name}}
                </h1>
                <div class="desc border-1px">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">
                    公告与活动
                </h1>
                <div class="content-wrapper border-1px">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-item border-1px" v-for="(item,index) in seller.supports" :key="index">
                        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="text">{{seller.supports[index].description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picwrapper">
                    <ul class="pic-list"  ref="picUl">
                        <li class="pic-item" v-for="(item,index) in seller.pics" :key="index">
                            <img :src="item" alt="" width="120" height="90"/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import star from '../star/star.vue';
import split from '../split/split.vue';
import BScroll from 'better-scroll';
export default {
    data(){
        return{
            classMap:["decrease","discount","special","invoice","guarantee"]
        }
    },
    watch:{ // 监听值得变化
        seller(){ //检测seller变化
            this._initScroll();
            this._initPic();
        }
    },
    mounted(){ // dom 结构渲染完成
       this._initScroll();  // 切换 seller没有发生变化
       this._initPic();
    },
    methods:{
        _initScroll(){
            if(!this.scroll){
                this.scroll = new BScroll(this.$refs.seller,{
                    click:true
                })
            }else{
                this.scroll.refresh();
            }
        },
        _initPic(){
        // 图片横向滚动
            if(this.seller.pics){
                // 对ul设置宽度
                let picWidth = 120;
                let margin = 6;
                let width = (picWidth + margin) * this.seller.pics.length - margin;  // ul 的宽度
                this.$refs.picUl.style.width = width + 'px';
                this.$nextTick(()=>{

                    if(!this.picScroll){
                        this.picScroll = new BScroll(this.$refs.picwrapper,{
                            scrollX:true,
                            eventPassthrough:'vertical'  // 滚动嵌套  横向滚动的时候忽略垂直方向的滚动
                        })
                    }else{
                        this.picScroll.refresh();
                    }

                });
            }
        }
    },
    props:{
        seller:{
            type:Object
        }
    },
    components:{
        'star': star,
        'split': split
    }
}
</script>
<style lang="scss" scoped="" type="text/scss">
    @import "../../common/stylus/mixin";
    .seller{
        position: absolute;
        top:174px;  // top和bottom来限定高度
        bottom:0;
        left:0;
        width:100%;
        overflow: hidden;
        .overview{
            padding:18px;
            .title{
                margin-bottom:8px;
                line-height:14px;
                color:rgb(7,17,27);
                font-size: 14px;
            }
            .desc{
                padding-bottom: 18px;
                font-size: 0;
                @include border-px(rgba(7,17,27,0.1));
                .star{
                    display:inline-block;
                    vertical-align: top;
                    margin-right: 8px;
                }
                .text{
                    margin-right: 12px;
                    display:inline-block;
                    vertical-align: top;
                    line-height: 18px;
                    font-size: 10px;
                    color:rgb(77,85,93);
                }
            }
            .remark{
                display:flex;
                padding-top: 18px;
                .block{
                    flex:1;
                    text-align:center;
                    border-right: 1px solid rgba(7,17,27,0.1);
                    &:last-child{
                        border: none
                    }
                    h2{
                        margin-bottom:4px;
                        line-height: 10px;
                        font-size:10px;
                        color:rgb(147,153,159);
                    }
                    .content{
                        line-height: 24px;
                        font-size: 10px;
                        color:rgb(7,17,27);
                        .stress{
                            font-size: 24px;
                        }
                    }
                }
            }

        }
        .bulletin{
            padding:18px 18px 0 18px;
            .title{
                margin-bottom: 8px;
                line-height: 14px;
                color:rgb(7,17,27);
                font-size: 14px;
            }
            .content-wrapper{
                padding: 0 12px 16px 12px;
                @include border-px(rgba(7,17,27,0.1));
                .content{
                    line-height: 24px;
                    font-size: 12px;
                    color:rgb(240,20,20);
                }
            }
            .supports{
                .support-item{
                    padding: 16px 12px;
                    font-size:0;
                    @include border-px(rgba(7,17,27,0.1));
                    &:last-child{
                        // border:none;
                        @include border-none()
                    }
                    .icon{
                        display: inline-block;
                        vertical-align: top;
                        width:16px;
                        height:16px;
                        margin-right:6px;
                        background-size:16px 16px;
                        background-repeat: no-repeat;
                        &.decrease{
                            @include bg-image("decrease_4")
                        }
                        &.discount{
                            @include bg-image("discount_4")
                        }
                        &.guarantee{
                            @include bg-image("guarantee_4")
                        }
                        &.invoice{
                            @include bg-image("invoice_4")
                        }
                        &.special{
                            @include bg-image("special_4")
                        }
                    }
                    .text{
                        line-height: 16px;
                        font-size: 12px;
                        color:rgb(7,17,27);
                    }
                }
            }
        }
        .pics{
            padding: 18px;
            .title{
                margin-bottom:12px;
                line-height: 14px;
                color:rgb(7,17,27);
                font-size: 14px;
            }
            .pic-wrapper{
                width:100%;
                overflow:hidden;
                white-space: nowrap; // 图片超出宽度的时候不会被折行
                .pic-list{ // ul
                    font-size: 0;
                    .pic-item{ // li
                        display: inline-block;
                        margin-right: 6px;
                        width:120px;
                        height:90px;
                        &:last-child{
                            margin:0;
                        }
                    }
                }
            }
        }
    }
</style>
