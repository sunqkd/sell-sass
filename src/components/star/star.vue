<template>
    <div class="star" :class="starType">
        <span v-for="(itemClass,index) in itemClasses" :key="index" :class="itemClass" class="star-item"></span>
    </div>
</template>
<script>
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_HALF = 'half'
    const CLS_OFF = 'off'

export default {
   

    data(){
        return{

        }
    },
    props:{
        size:{ // 星星的尺寸
            type:Number
        },
        score:{ // 分数
            type:Number
        }
    },
    computed:{
        starType(){
            return "star-" + this.size;
        },
        itemClasses(){
            let result = [];
            let score = Math.floor(this.score*2) / 2;  // 向下取5倍数的值
            let hasDecimal = score % 1 !==0;  // 是否有半星
            let integer = Math.floor(score);  // 有多少个全星星
            for(let i=0;i<integer;i++){
                result.push(CLS_ON); // 全星
            }
            if(hasDecimal){
                result.push(CLS_HALF); // 半星
            }

            while(result.length < LENGTH){  // 零颗星
                result.push(CLS_OFF);
            }

            return result;

        }
    }
    
}
</script>
<style lang="scss" scoped="" type="text/scss">
    @import "../../common/stylus/mixin";

    .star{
        font-size: 0;
        .star-item{ // span 标签
            display: inline-block;
            background-repeat: no-repeat
        }
        &.star-48{ // div
            .star-item{ // span
                width:20px;
                height:20px;
                margin-right:20px;
                background-size: 20px 20px;
                &:last-child{
                    margin-right:0
                }
                &.on{
                    @include bg-image("star48_on")
                }
                &.half{
                    @include bg-image("star48_half")
                }
                &.off{
                    @include bg-image("star48_off")
                }
            }
        }
        &.star-36{
            .star-item{ // span
                width:15px;
                height:15px;
                margin-right:6px;
                background-size: 15px 15px;
                &:last-child{
                    margin-right:0
                }
                &.on{
                    @include bg-image("star36_on")
                }
                &.half{
                    @include bg-image("star36_half")
                }
                &.off{
                    @include bg-image("star36_off")
                }
            }
        }
        &.star-24{
            .star-item{ // span
                width:10px;
                height:10px;
                margin-right:3px;
                background-size: 10px 10px;
                &:last-child{
                    margin-right:0
                }
                &.on{
                    @include bg-image("star24_on")
                }
                &.half{
                    @include bg-image("star24_half")
                }
                &.off{
                    @include bg-image("star24_off")
                }
            }
        }
        
    }
</style>
