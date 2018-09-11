<template>
    <div v-show = "$store.state.show">
        {{aaa}}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                aaa: '我是子组件'
            }
        }
    }
</script>
<style>

</style>