<!-- 商品详情页 -->
<template>
    <transition name="move">
        <div v-show="showFlag" class="food" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image" alt="">
                    <div class="back" @click="hide()">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food="food"></cartcontrol>
                    </div>
                    <transition name="fade">
                        <div class="buy"  v-show="!food.count  || food.count === 0" @click.stop.prevent="addFirst($event)">
                            加入购物车
                        </div>
                    </transition>
                </div>

                <split></split>

                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                
                <split v-show="food.info"></split>

                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect @onlyContentchange="onlyContentSelect"  @ratingtypechange="ratingtypeSelect" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
                    <!-- 评价列表 -->
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="needShow(item.rateType,item.text)" v-for="(item,index) in food.ratings" :key="index" class="rating-item border-1px">
                                <div class="user">
                                    <!-- 用户名 -->
                                    <span class="name">{{item.username}}</span>
                                    <img  class="avatar" alt="用户头像" width="12" height="12" :src="item.avatar">
                                </div>
                                <!-- 评价时间 -->
                                <div class="time">
                                    {{item.rateTime}}
                                </div>
                                <!-- 评论内容 -->
                                <p class="text">
                                    <span :class = "{'icon-thumb_up': item.rateType === 0 ,'icon-thumb_down': item.rateType === 1 }"></span>
                                    {{item.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
                            暂无评价
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol.vue';
import Vue from 'vue';
import split from '../split/split.vue';
import ratingselect from '../ratingselect/ratingselect.vue'; // 评价模块组件


const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    props:{
        food:{
            type:Object
        }
    },
    data() {
        return { 
            showFlag: false,
            selectType: ALL, // 默认为全部
            onlyContent: true, // 只看内容
            desc:{
                all: "全部",
                positive: "推荐",
                negative: "吐槽"
            }
        }
    },
    methods:{
        show(){ // 父组件调用子组件的方法
            this.showFlag = true; // 详情页显示
            this.$nextTick(() =>{ // 保证组件被渲染 高度可以计算
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.food,{
                        click:true
                    })
                }else{
                    this.scroll.refresh();
                }
            });
            // 详情页弹出后
            this.selectType = ALL; // 初始化 高亮第一个
            this.onlyContent = true; // 初始化  是否只看有内容的评论

        },
        hide(){
            this.showFlag = false; 
        },
        addFirst(event){ // 添加第一个尚品
            Vue.set(this.food,'count',1);
            this.$emit('addDetail',event.target);
        },
        ratingtypeSelect(type){  // 子组件的派发事件
            this.selectType = type;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        onlyContentSelect(onlyContent){ // 子组件的派发事件
            this.onlyContent = !this.onlyContent
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        needShow(type,text){ // v-show 绑定函数返回值
            if(this.onlyContent && !text){
                return false;
            }
            if(this.selectType === ALL){
                return true;
            }else{
                return type === this.selectType;
            }
        }
    },
    components:{
        "cartcontrol":cartcontrol,
        "split":split,
        "ratingselect":ratingselect
    }
};
</script>
<style lang="scss" scoped="" type="text/scss">
    @import "../../common/stylus/mixin";
    .food{
        position:fixed;
        left:0;
        top:0;
        bottom:48px;
        z-index:30;
        width:100%;
        background: #fff;
        transform: translate3d(0, 0, 0);
        &.move-enter-active, &.move-leave-active{
            transition: all 0.2s linear
        }
        &.move-enter, &.move-leave-to{
            transform: translate3d(100%, 0, 0)
        };
        .image-header{
            position:relative;
            width:100%;
            height:0;
            padding-bottom:100%; // padding-top:100%;
            img{
                position:absolute;
                top:0;
                left:0;
                width:100%;
                height:100%;
            }
            .back{
                position:absolute;
                top:10px;
                left:0;
                .icon-arrow_lift{
                    display:block;
                    padding:10px;
                    font-size:20px;
                    color:#fff
                }
            }
        }
        .content{
            padding:18px;
            position:relative;
            .title{
                line-height:14px;
                margin-bottom:8px;
                font-size: 14px;
                font-weight: 700;
                color:rgb(7,17,27);
            }
            .detail{
                margin-bottom:18px;
                line-height: 10px;
                font-size: 0;
                height:10px;
                .sell-count,.rating{
                    font-size:10px;
                    color:rgb(147,153,159);
                }
                .sell-count{
                    margin-right:12px;
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
                right:12px;
                bottom: 12px;
            }
            .buy{
                position:absolute;
                right: 18px;
                bottom:18px;
                z-index:10;
                height:24px;
                line-height:24px;
                padding:0 12px;
                box-sizing:border-box;
                font-size:10px;
                border-radius: 12px;
                color:#fff;
                background:rgb(0,160,220);
                opacity: 1;
                &.fade-enter-active,&.fade-leave-active{
                    transition: all 1s;
                }
                &.fade-enter,&.fade-leave-to{
                    opacity: 0;
                }   
            }
        }
        .info{
            padding:18px;
            .title{
                line-height: 14px;
                margin-bottom: 6px;
                font-size: 14px;
                color:rgb(7,17,27);
            }
            .text{
                line-height: 24px;
                padding:0 8px;
                font-size: 12px;
                color:rgb(77,85,93);
            }
        }
        .rating{
            padding-top:18px;
            .title{
                line-height: 14px;
                margin-left:18px;
                font-size: 14px;
                color:rgb(7,17,27);
            }
            .rating-wrapper{
                padding: 0 18px;
                .rating-item{
                    position: relative;
                    padding: 16px 0;
                    @include border-px(rgba(7,17,27,0.1));
                    .user{
                        position:absolute;
                        right:0;
                        top:16px;
                        font-size: 0;
                        line-height:12px;
                        .name{
                            display:inline-block;
                            font-size:10px;
                            color:rgb(147,153,159);
                            vertical-align: top;
                            margin-right: 6px;
                        }
                        .avatar{
                            border-radius: 50%;
                        }
                    }
                    .time{
                        margin-bottom:6px;
                        line-height: 12px;
                        font-size:10px;
                        color:rgb(147,153,159);
                    }
                    .text{
                        line-height: 16px;
                        font-size:12px;
                        color:rgb(7,17,27);
                        .icon-thumb_up, .icon-thumb_down{
                            line-height: 16px;
                            margin-right:4px;
                            font-size:12px;
                        }
                        .icon-thumb_up{
                            color:rgb(0,160,220);
                        }
                        .icon-thumb_down{
                            color:rgb(147,153,159);
                        }
                    }
                }
            }
        }
    }
</style>
