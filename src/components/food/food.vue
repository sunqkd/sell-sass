<!-- 商品详情页 -->
<template>
    <transition name="move">
        <div v-show="showFlag" class="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image" alt="">
                    <div class="back" @click="hide()">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    props:{
        food:{
            type:Object
        }
    },
    data() {
        return {
            showFlag: false
        }
    },
    methods:{
        show(){ // 父组件调用子组件的方法
            this.showFlag = true; // 详情页显示
        },
        hide(){
            this.showFlag = false; 
        }
    }
};
</script>
<style lang="scss" scoped="" type="text/scss">
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
      
    }
</style>
