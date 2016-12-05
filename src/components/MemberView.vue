<template>
     <div id="member-view">
        <div id="member">
        
        </div>
        <div id="member-btn-warp">
            <mt-button type="primary" size="large" @click.native="popMember">选择期货公司</mt-button>
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
import labeloption from '../charts/labeloption'
import color_calculator from '../charts/color_calculator'
import create_member_data_options from '../charts/memberDataOption'
export default {
    data () {
        return {
            labelCharts:null,
            popupVisible:false,
            slots:[
                {
                    flex:1,
                    values:[],
                    className:'member',
                }
            ]
        }
    },
    mounted:function(){
        this.labelCharts = echarts.init(document.getElementById('member'));
        this.labelCharts.setOption(labeloption);
        this.labelCharts.showLoading();
        this.$http.get('http://139.196.6.151/api/position_kiiik_member/中信期货/0').then((response) => {
            let data = response.data
            var lengend_list = [];
            var lengend_data = [];
            lengend_list.push(data.all.long.name);
            lengend_list.push(data.all.short.name);
            lengend_data.push(data.all.long);
            lengend_data.push(data.all.short);

            let member_data = data.data;
            let data_len_long = data.data_len.long;
            let data_len_short = data.data_len.short;
            let color_list_long = color_calculator('#FF0000', '#FFAEB9', data_len_long)
                .concat(color_calculator('#98FB98', '#008B00', data_len_short));
            let data_obj_list = [];
            for (let i = 0; i < member_data.length; i++) {
                if (i <= data_len_long) {

                    let long_series = {
                        value: member_data[i].value,
                        name: member_data[i].name,
                        itemStyle: {
                            normal: {
                                color: color_list_long[i]
                            }
                        }

                    };
                    data_obj_list.push(long_series)
                } else {
                    let short_series = {
                        value: member_data[i].value,
                        name: member_data[i].name,
                        itemStyle: {
                            normal: {
                                color: color_list_long[i]
                            }
                        }

                    };
                    data_obj_list.push(short_series)
                }
            };
            let new_option = create_member_data_options(lengend_list,lengend_data,data_obj_list);
            this.labelCharts.setOption(new_option);
            this.labelCharts.hideLoading();




            
        }, (response) => {
            console.log(response)
        });
        //获取会员列表
        this.$http.get('http://139.196.6.151/api/position_kiiik/get_member_list').then((response)=>{
            this.slots[0].values=response.data.data
        },(response)=>{
            console.log(response)
        })
        
        

    },
    methods:{
        onValuesChange(picker,values){
            let memberName = values[0];
            this.labelCharts.setOption(labeloption);
            this.labelCharts.showLoading();
            this.$http.get('http://139.196.6.151/api/position_kiiik_member/'+memberName+'/0').then((response) => {
                let data = response.data
                var lengend_list = [];
                var lengend_data = [];
                lengend_list.push(data.all.long.name);
                lengend_list.push(data.all.short.name);
                lengend_data.push(data.all.long);
                lengend_data.push(data.all.short);

                let member_data = data.data;
                let data_len_long = data.data_len.long;
                let data_len_short = data.data_len.short;
                let color_list_long = color_calculator('#FF0000', '#FFAEB9', data_len_long)
                    .concat(color_calculator('#98FB98', '#008B00', data_len_short));
                let data_obj_list = [];
                for (let i = 0; i < member_data.length; i++) {
                    if (i <= data_len_long) {

                        let long_series = {
                            value: member_data[i].value,
                            name: member_data[i].name,
                            itemStyle: {
                                normal: {
                                    color: color_list_long[i]
                                }
                            }

                        };
                        data_obj_list.push(long_series)
                    } else {
                        let short_series = {
                            value: member_data[i].value,
                            name: member_data[i].name,
                            itemStyle: {
                                normal: {
                                    color: color_list_long[i]
                                }
                            }

                        };
                        data_obj_list.push(short_series)
                    }
                };
                let new_option = create_member_data_options(lengend_list,lengend_data,data_obj_list);
                this.labelCharts.setOption(new_option);
                this.labelCharts.hideLoading();




            
        }, (response) => {
            console.log(response)
        });

      
             
        },
        popMember(e){
            this.popupVisible = true
        }

    }
 }
</script>

<style>
.member{
        width:400px;
    }
#member {
        margin: 0 auto;
        margin-top: 35px;
        margin-bottom: 10px;
        width: 360px;
        height: 500px;
    }
</style>