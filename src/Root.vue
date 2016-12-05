<template>
    <div id="home">
        <mt-header fixed title="FDA数据中心">
            <mt-button icon="back" slot="left"></mt-button>
            <mt-button slot="right">关于</mt-button>
        </mt-header>
        <tab></tab>
    </div>   
</template>

<script>
import Tab from './components/Tabbar.vue'
export default {
    data () {
        return {

        }
    },
    components:{Tab}
}
</script>

<style>

</style>