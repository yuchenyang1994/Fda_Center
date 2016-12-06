<template>
    <div id="con">
        <!--主要内容-->
        <mt-tab-container swipeable v-model="selected">
            <mt-tab-container-item id="curr">
                <CurrView></CurrView>
            </mt-tab-container-item>
            <mt-tab-container-item id="position">
                <PositionView></PositionView>
            </mt-tab-container-item>
            <mt-tab-container-item id="member">
                <MemberView></MemberView>
            </mt-tab-container-item>
            <mt-tab-container-item id="about">
                <h1>i am yuchenyang</h1>
            </mt-tab-container-item>
        </mt-tab-container>
        <!--选项卡-->
        <mt-tabbar fixed v-model="selected">
            <mt-tab-item id="curr">
                <img src="../assets/bar-chart-fall.png" slot="icon">
                市场全景
            </mt-tab-item>
            <mt-tab-item id="position">
                <img src="../assets/chart-arrow.png" slot="icon">
                会员分布
            </mt-tab-item>
            <mt-tab-item id="member">
                <img src="../assets/pie-chart-2.png" slot="icon">
                会员持仓
            </mt-tab-item>
            <mt-tab-item id="about">
                <img src="../assets/about.png" slot="icon">
                关于我
            </mt-tab-item>
        </mt-tabbar>
    </div>
    
</template>

<script>
    import CurrView from '../components/CurrView.vue'
    import PositionView from '../components/PositionView.vue'
    import MemberView from '../components/MemberView.vue'
    export default {
        data (){
            return {
                selected:'curr'
            }
        },
        components: {CurrView, PositionView,MemberView}
    }

    
</script>

<style>

</style>