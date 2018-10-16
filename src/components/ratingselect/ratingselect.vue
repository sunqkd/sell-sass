<template>
    <div>
        
    </div>
</template>
<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    props:{
        ratings:{ // 评价
            type:Array,
            default(){
                return [];  // 数组和对象都要 default return
            }
        },
        selectType:{ // 类型
            type:Number,
            default:ALL
        },
        onlyContent:{ // 读内容 不读内容
            type:Boolean,
            default:false
        },
        desc:{ // 描述
            type:Object,
            default(){
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped="" type="text/scss">

</style>
