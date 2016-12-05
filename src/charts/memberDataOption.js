export default (lengend_list, lengend_data, member_data)=> {
    let member_data_options = {
        legend:{
            data:lengend_list
        },
        series: [
            {
                name: '多空占比',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '30%'],

                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: lengend_data
            },
            {
                name: '持仓手数',
                type: 'pie',
                radius: ['40%', '55%'],

                data: member_data
            }
        ],
        color: ['#FF0000', '#98FB98']
    };
    return member_data_options
};