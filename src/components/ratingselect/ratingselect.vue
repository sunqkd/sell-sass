<template>
    <div class="ratingselect">
        <div class="rating-type border-1px">
            <span class="block positive" @click="select(2,$event)" :class="{'active':selectType == 2}">
                {{desc.all}}<span class="count">{{ratings.length}}</span>
            </span>
            <span  @click="select(0,$event)"  class="block positive" :class="{'active':selectType == 0}">
                {{desc.positive}}<span class="count">{{positives.length}}</span>
            </span>
            <span  @click="select(1,$event)"  class="block negative" :class="{'active':selectType == 1}">
                {{desc.negative}}<span class="count">{{negatives.length}}</span>
            </span>
        </div>
        <div class="switch" :class="{'on':onlyContent == true}" @click="toggleContent($event)">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>
<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    props: {
        ratings: {
            // 评价
            type: Array,
            default() {
                return []; // 数组和对象都要 default return
            }
        },
        selectType: {
            // 类型
            type: Number,
            default: ALL // 默认选择所有的
        },
        onlyContent: {
            // 读内容 不读内容
            type: Boolean,
            default: false
        },
        desc: {
            // 描述
            type: Object,
            default() {
                // 默认
                return {
                    all: "全部",
                    positive: "满意",
                    negative: "不满意"
                };
            }
        }
    },
    computed:{ // 计算属性
        positives(){ // 正向评价数组
            // 返回 正向评价数组 
            return this.ratings.filter( (item) => {
                return item.rateType === POSITIVE;
            })
        },
        negatives(){ // 负面评价数组
            return this.ratings.filter( (item) => {
                return item.rateType === NEGATIVE;
            })
        }
    },
    methods:{
        select(type,event){  // 需要通知父元素
            if(!event._constructed){
                return;
            }
            // this.selectType = type;
            // 派发事件
            this.$emit('ratingtypechange', type);
        },
        toggleContent(event){ // 需要通知父元素
            if(!event._constructed){
                return;
            }
            // this.onlyContent = !this.onlyContent;
            this.$emit('onlyContentchange', this.onlyContent);
        }
    }
};
</script>
<style lang="scss" scoped="" type="text/scss">
    @import "../../common/stylus/mixin";
    .ratingselect{
        .rating-type{
            padding: 18px 0;
            margin: 0 18px;
            @include border-px(rgba(7,17,27,0.1));
            font-size: 0;
            .block{
                display: inline-block;
                padding: 8px 12px;
                margin-right: 8px;
                border-radius: 1px;
                color:rgb(77,85,93);
                font-size:12px;
                line-height:16px;
                &.active{
                    color:#fff;
                }
                &.positive{
                    background:rgba(0,160,220,0.2);
                    &.active{
                        background:rgb(0,160,220);
                    }
                } 
                &.negative{
                    background:rgba(77,85,93,0.2);
                    &.active{
                        background:rgb(77,85,93);
                    }
                }
                .count{
                    font-size: 8px;
                    margin-left: 2px; 
                }
            }
        }
        .switch{
            padding: 12px 18px;
            line-height: 24px;
            border-bottom: rgba(7,17,27,0.1);
            border-bottom:1px solid rgba(7,17,27,0.1);
            color:rgb(147,153,159);
            font-size:0;
            .icon-check_circle{
                margin-right: 4px;
                font-size: 24px;
                display: inline-block;
                vertical-align: top;
            }
            .text{
                display: inline-block;
                vertical-align: top;
                font-size:12px;
            }
            &.on{
                .icon-check_circle{
                    color:#00c850;
                }
            }
        }
    }
</style>
