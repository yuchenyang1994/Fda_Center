<template>
    <div class="view">
        <div id="curr">
        
        </div>
        <div class="btn">
            <mt-button type="primary" size="large" @click.native="popOptions">选择类型</mt-button>
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
import categoryoption from '../charts/curroption.js'
import echarts from 'echarts'
import sortByOpenInterest from '../charts/positions_tools'
import sortScaleaData from '../charts/sortrank'
export default {
    data () {
        return {
            currCharts:null,
            popupVisible:false,
            slots:[
                {
                    flex:1,
                    values:['持仓排名','持仓差排名','持仓比例排名'],
                    className:'slot2',
                }
            ]
        }
    },
    mounted:function(){
        this.currCharts = echarts.init(document.getElementById('curr'));
        this.currCharts.setOption(categoryoption,true);
        this.currCharts.showLoading();
        this.$http.get('http://139.196.6.151/api/position_curr').then((response)=>{
            let symbols = [];
            let l_total = [];
            let s_total = [];
            let report_date = "";
            let data_value = sortByOpenInterest(response.data.value,1);
            for (let data of data_value){
                let longOI = data.long['totalOI'];
                let shortOI = data.short['totalOI'];
                if (longOI > 10000 && shortOI > 10000) {
                    symbols.push(data.long['symbol']);
                    l_total.push(longOI);
                    s_total.push(shortOI * (-1));
                }
                // 日期
                report_date = data.long['reportDate'];
            }
            this.currCharts.setOption({
                  title: {
                        text: '最新持仓数据 - ' + report_date
                    },
                    yAxis: [
                        {
                            data: symbols
                        }
                    ],
                    series: [
                        {
                            data: l_total
                        },
                        {
                            data: s_total
                        }
                    ]
            })
            this.currCharts.hideLoading();
            
        },(response)=>{
            console.log(response)
        })

    },
    methods:{
        onValuesChange(picker,values){
            switch(values[0]){
                case '持仓排名':
                    this.currCharts.setOption(categoryoption,true);
                    this.currCharts.showLoading();
                    this.$http.get('http://139.196.6.151/api/position_curr').then((response)=>{
                        let symbols = [];
                        let l_total = [];
                        let s_total = [];
                        let report_date = "";
                        let data_value = sortByOpenInterest(response.data.value,1);
                        for (let data of data_value){
                            let longOI = data.long['totalOI'];
                            let shortOI = data.short['totalOI'];
                            if (longOI > 10000 && shortOI > 10000) {
                                symbols.push(data.long['symbol']);
                                l_total.push(longOI);
                                s_total.push(shortOI * (-1));
                            }
                            // 日期
                            report_date = data.long['reportDate'];
                        }
                        this.currCharts.setOption({
                            title: {
                                    text: '最新持仓数据 - ' + report_date
                                },
                                yAxis: [
                                    {
                                        data: symbols
                                    }
                                ],
                                series: [
                                    {
                                        data: l_total
                                    },
                                    {
                                        data: s_total
                                    }
                                ]
                        })
                        this.currCharts.hideLoading();
                        
                    },(response)=>{
                        console.log(response)
                    });
                    break;
                case '持仓比例排名':
                    this.currCharts.setOption(categoryoption,true);
                    this.currCharts.showLoading();
                    this.$http.get('http://139.196.6.151/api/position_curr').then((response) => {
                        let rank_data = response.data.rank;
                        let symbol_list = [];
                        let long_list = [];
                        let short_list = [];
                        for(let rank of rank_data){
                            if(rank.scale<0){
                                short_list.push(rank.scale);
                                long_list.push(0);
                                symbol_list.push(rank.symbol);

                            }else if(rank.scale==0){
                            console.log('奥，在这停顿')
                            } else {
                                long_list.push(rank.scale);
                                short_list.push(0);
                                symbol_list.push(rank.symbol);

                            }
                        }
                        let new_option = {
                                title: {
                                    text: '最新持仓数据 - '
                                },
                                legend: {
                                data:['负持仓', '正持仓']
                                },
                                yAxis: [
                                    {
                                        data: symbol_list
                                    }
                                ],
                                series: [
                                    {
                                        label: {
                                            normal: {
                                                show: true,
                                                formatter: '{c}%'
                                            }
                                        },
                                        data: long_list


                                    },
                                    {
                                        label: {
                                            normal: {
                                                show: true,
                                                formatter: '{c}%'
                                            }
                                        },
                                        data: short_list
                                    }
                                ]
                            };
                        this.currCharts.setOption(new_option);
                        this.currCharts.hideLoading();
                    },(response)=>{
                        console.log(response)
                    });
                    break;
                case '持仓差排名':
                    this.currCharts.setOption(categoryoption,true);
                    this.currCharts.showLoading();
                    this.$http.get('http://139.196.6.151/api/position_curr').then((response) => {
                        let rank_data = response.data.rank;
                        let sort_rank = sortScaleaData(rank_data);
                        let symbol_list = [];
                        let long_list = [];
                        let short_list = [];
                        for(let rank of rank_data){
                            if(rank.scale<0){
                                short_list.push(rank.scale);
                                long_list.push(0);
                                symbol_list.push(rank.symbol);

                            }else if(rank.scale==0){
                            console.log('奥，在这停顿')
                            } else {
                                long_list.push(rank.scale);
                                short_list.push(0);
                                symbol_list.push(rank.symbol);

                            }
                        }
                         let new_option = {
                            title: {
                                text: '最新持仓数据 - '
                            },
                            legend: {
                            data:['负持仓', '正持仓']
                            },
                            yAxis: [
                                {
                                    data: symbol_list
                                }
                            ],
                            series: [
                                {
                                    data: long_list
                                },
                                {
                                    data: short_list
                                }
                            ]
                        };
                        this.currCharts.setOption(new_option);
                        this.currCharts.hideLoading();
                    },(response)=>{
                        console.log(response)
                    });
                    break;

                
                


            }

        },
        popOptions(e){
            this.popupVisible = true
        }
    }

}
    
</script>

<style>
    .slot2{
        width:476px;
    }
    #curr {
        margin: 0 auto;
        margin-top: 35px;
        margin-bottom: 10px;
        width: 360px;
        height: 500px;
    }
</style>