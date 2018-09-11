<template>
    <div>
        <button @click="showHide()">点击显示和隐藏</button>
        <button @click="text()">请求接口</button>
        <childone></childone>
    </div>
</template>
<script>
    import childone from "./childone";
    export default {
        data() {
            return {
                flag: "父组件"
            };
        },
        methods: {
            text() {
                this.$ajax.get("/apis/seller")
                    .then(response => {
                        console.log(response)
                    })
                    .catch(response => {
                        console.log(response);
                    });

            },
            showHide() {
                console.log(this.$store.state.show);
                this.$store.commit("changeShow");
                console.log(this.$store.state.show);
            }
        },
        components: {
            childone: childone
        }
    };
</script>