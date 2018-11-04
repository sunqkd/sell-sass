<template>
    <div class="ratings" ref="ratings">
       <div class="ratings-content">
            <div class="overview">
                    <div class="overview-left">
                        <h1 class="score">
                            {{seller.score}}
                        </h1>
                        <div class="title">
                            综合评分
                        </div>
                        <div class="rank">
                            高于周边商家{{seller.rankRate}}%
                        </div>
                    </div>
                    <div class="overview-right">
                        <div class="score-wrapper">
                            <span class="title">服务态度</span>
                            <star :size="36" :score="seller.serviceScore"></star>
                            <span class="score">{{seller.serviceScore}}</span>
                        </div>
                        <div class="score-wrapper">
                            <span class="title">商品评分</span>
                            <star :size="36" :score="seller.foodScore"></star>
                            <span class="score">{{seller.foodScore}}</span>
                        </div>
                        <div class="delivery-wrapper">
                            <span class="title">送达时间</span>
                            <span class="delivery">{{seller.deliveryTime}}分钟</span>
                        </div>
                    </div>
            </div>
            <!-- 分割线 -->
            <split></split>

            <ratingselect @ratingtypechange="typeChangeR" @onlyContentchange="contentChangeR" :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li v-for="(item,index) in ratings" :key="index" class="rating-item border-1px" v-show="needShow(item.rateType,item.text)">
                        <div class="avatar">
                            <img width="28" height="28" :src="item.avatar" />
                        </div>
                        <div class="content">
                            <h1 class="name"> 
                                {{item.username}}
                            </h1>
                            <div class="star-wrapper">
                                <star :size="24" :score="item.score"></star>
                                <span class="delivery" v-show="item.deliveryTime">{{item.deliveryTime}}</span>
                            </div>
                            <p class="text">{{item.text}}</p>
                            <div class="recommend" v-show="item.recommend.length && item.recommend">
                                <span class="icon-thumb_up"></span>
                                <span v-for="(recommend,indexs) in item.recommend" :key="indexs" class="itemspan">{{recommend}}</span>
                            </div>
                            <div class="time">
                                {{item.rateTime | formaDate}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
       </div>
    </div>
</template>
<script>
import star from '../../components/star/star.vue'
import split from '../../components/split/split.vue' // 分割线
import ratingselect from '../../components/ratingselect/ratingselect.vue' // 
import { formaDateTransform } from '../../common/js/date';// 引入方法
import BScroll from 'better-scroll';  // 滚动组件

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
const ERR_OK = 0;

export default {
    data(){
        return{
            ratings: [], // 评论内容
            selectType:ALL, // 选择项
            onlyContent:true, // 仅显示有内容评论
        }
    },
    created(){
        this.getratings(); //  请求评论数据
    },
    methods:{
        getratings(){
            this.$ajax.get('/apis/ratings').then( (response) =>{
                // console.log(response);
                if(response.data.errno === ERR_OK){
                    this.ratings = response.data.data; // 评论数据 虽然已经发生变化但是 dom 并没有更新
                    // 在下一个 eventLop 中去做这个事情
                    // 拿到数据后初始化高度
                    this.$nextTick(()=>{
                        this.scroll = new BScroll(this.$refs.ratings,{
                            click:true
                        })
                    })
                }
            }).catch( (response)=>{
                console.log(response);
            })
        },
        typeChangeR(type){ // 子组件派发事件
            this.selectType = type;
            this.$nextTick(() => {
                this.scroll.refresh();
            })
        },
        contentChangeR(onlyContent){ // 子组件派发事件
            this.onlyContent = !onlyContent;
            this.$nextTick(() => {
                this.scroll.refresh();
            })
        },
        needShow(type,text){
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
    filters:{ // 过滤器
        formaDate(time){ // 时间戳 改成固定格式
            let date = new Date(time);
            // console.log(date);  // Sat Jul 23 2016 21:52:44 GMT+0800 (中国标准时间)
            return formaDateTransform(date,'yyyy-MM-dd hh:mm'); // 日期白名单
        }
    },
    props:{
        seller:{
            type:Object
        }
    },
    components:{
        "star": star,
        'split': split,
        'ratingselect': ratingselect
    }
}
</script>
<style lang="scss" scoped="" type="text/scss">
    @import "../../common/stylus/mixin";
    .ratings{
        position: absolute;
        top:174px; // header 组件的高度
        bottom:0px;
        width:100%;
        left:0;
        overflow:hidden;
        .overview{
            display: flex;
            padding: 18px 0;
            .overview-left{
                padding:6px 0;
                flex: 0 0 137px;// 宽度为137px
                width:137px; // 兼容性
                border-right: 1px solid rgba(7,17,27,0.1);
                text-align:center;
                @media only screen and  (max-width: 320px){
                    flex: 0 0 120px;
                    width: 120px;
                }
                .score{
                    margin-bottom:6px;    
                    line-height: 28px;
                    font-size: 24px;
                    color:rgb(255,153,0);                
                }
                .title{
                    margin-bottom: 8px;
                    line-height: 12px;
                    font-size: 12px;
                    color:rgb(7,17,27);
                }
                .rank{
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147,153,159);
                }
            }
            .overview-right{
                flex:1;
                padding:6px 0 6px 24px;
                @media only screen and (max-width: 320px){ // 适配iphone5
                    padding-left: 6px;
                }
                .score-wrapper{
                    margin-bottom:8px;
                    font-size: 0;
                    .title{
                        display:inline-block;
                        vertical-align: top;
                        line-height: 18px;
                        font-size: 12px;
                        color:rgb(7,17,27);
                    }
                    .star{  // 设置子组件的样式
                        margin:0 12px;
                        display:inline-block;
                        vertical-align: top;
                    }
                    .score{
                        display: inline-block;
                        vertical-align: top;
                        font-size: 12px;
                        color: rgb(255,153,0);
                        line-height:18px;
                    }
                }
                .delivery-wrapper{
                    font-size: 0;
                    .title{
                        line-height: 18px;
                        vertical-align: top;
                        font-size: 12px;
                        color:rgb(7,17,27);
                    }
                    .delivery{
                        margin-left:12px;
                        font-size: 12px;
                        color:rgb(147,153,159);
                        vertical-align: top;
                        line-height: 18px;
                    }
                }
            }
        }
        .rating-wrapper{
            padding: 0 18px;
            .rating-item{
                display: flex;
                padding: 18px 0;
                @include border-px(rgba(7,17,27,0.1));
                .avatar{
                    flex: 0 0 28px;
                    width: 28px;
                    margin-right: 12px;
                    img{
                        border-radius: 50%;
                    }
                }
                .content{
                    flex: 1;
                    position: relative;
                    .name{
                        line-height: 12px;
                        font-size: 10px;
                        color:rgb(7,17,27);
                        margin-bottom: 4px;
                    }
                    .star-wrapper{
                        margin-bottom: 6px;
                        font-size: 0;
                        .star{
                            display: inline-block;
                            vertical-align: top;
                            margin-right: 6px;
                        }
                        .delivery{
                            display: inline-block;
                            vertical-align: top;
                            font-size:10px;
                            color:rgb(147,153,159);
                        }
                    }
                    .text{
                        line-height: 18px;
                        color:rgb(7,17,27);
                        font-size: 12px;
                        margin-bottom: 8px;
                    }
                    .recommend{
                        line-height: 16px;
                        font-size: 0;
                        .icon-thumb_up,.itemspan{
                            display: inline-block;
                            margin:0 8px 4px 0;
                            font-size: 9px;
                        }
                        .icon-thumb_up{
                            color:rgb(0,160,200);
                        }
                        .itemspan{
                            padding: 0 6px;
                            border: 1px solid rgba(7,17,27,0.1);
                            border-radius: 1px;
                            color:rgb(147,153,159);
                            background: #fff;
                        }
                    }
                    .time{
                        position:absolute;
                        top:0;
                        right:0;
                        line-height: 12px;
                        font-size:10px;
                        color:rgb(147,153,159);
                    }
                }
            }
        }
    }
</style>
