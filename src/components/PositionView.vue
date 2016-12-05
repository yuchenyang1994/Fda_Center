<template>
   <div id="position-view">
        <div id="position">
        
        </div>
        <div id="position-btn-warp">
            <mt-button type="primary" size="large" @click.native="popSymbol">选择品种</mt-button>
        </div>

        <mt-popup
            popup-transition="popup-fade"
            v-model="popupVisible" 
            position="bottom">
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
            
        </mt-popup>
        
        
    </div>
  
</template>

<script>
import echarts from 'echarts'
import pooptions from '../charts/position_option'
export default {
    data () {
        return {
            poCharts:null,
            popupVisible:false,
            slots:[
                {
                    flex:1,
                    values:['还没做好','还没做好','敬请期待'],
                    className:'postion',
                }
            ]
        }
    },
    mounted:function(){
        this.poCharts = echarts.init(document.getElementById('position'))
        this.poCharts.showLoading();
        this.poCharts.setOption(pooptions,true);
        this.$http.get('http://139.196.6.151/api/position_kiik_com_history/A/1').then((response) => {
            let datelist = response.data.datelist;
            let memberlist = response.data.memberlist;
            var myseries = [];
            var selected = {};
            let openInterest = response.data.openInterest;
            console.log(openInterest)
            for (var k of Object.keys(openInterest)){
                var Interest = {
                    name: k,
                    type:"line",
                    data:openInterest[k],
                    symbol:'roundRect'
                };
                myseries.push(Interest);
            }
            
            for (let i=0; i<=memberlist.length;i++){
                if (i < 3) {
                    selected[memberlist[i]] = true;
                }
                else {
                    selected[memberlist[i]] = false;
                }
            }
            let last_date = datelist[datelist.length -1];
            let new_options = {
                title: {
                    text: "A" + ' ' + "多头" + '持仓汇总 - ' + last_date
                },
                legend: {
                    data: memberlist,
                    selected: selected
                },
                xAxis: {
                    data: datelist
                },
                series: myseries
            };
            this.poCharts.hideLoading();
            this.poCharts.setOption(new_options);


        },(response) => {
            console.log(response)
        })
    },
    methods:{
        onValuesChange(picker,values){

        },
        popSymbol(e){
            this.popupVisible = true
        }

    }
}

</script>

<style>
    #position {
        margin: 0 auto;
        margin-top: 35px;
        margin-bottom: 10px;
        width: 360px;
        height: 500px;

    }

</style>