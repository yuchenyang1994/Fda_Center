export default{
    title:{
        text:"合约会员持仓汇总",
        textStyle: {fontSize: '14'},
        left: 'center',
        padding: 0
    },
    tooltip:{
        trigger:'axis'
    },
    legend:{
        show:false,
        top:'4%',
        data:[]
    },
    grid:{
		    top:'20%',
        left:'1%',
        right:'1%',
        bottom:'20%',
        containLabel:true
    },
    xAxis:{
        type:'category',
        boundaryGap:false,
        data:[]
    },
    yAxis:{
        type:'value'
    },
	color:['#FFB6C1','#DC143C','#DB7093','#FF69B4','#C71585','#4B0F0F','#40219B',
		'#1F9D34','#BA55D3','#4b0082','#7B68EE','#0000FF','#191970','#4169E1',
		'#708090','	#1E90FF','#4682B4','#87CEEB','#00BFFF','#5F9EA0','#00FFFF',
		'#2F4F4F','#008080','#40E0D0','#7FFFAA','#2E8B57','#32CD32','#F5860B',
		'#00FF00','#ADFF2F','#556B2F','#FFD700','#505021','#FF4500','#901AD6',
		'#FF0000','#696969','#000000','#9D4848','#D8F20A','#EA5F1F','#CE6A7C',
		'#D2B48C','#3CB371','#20B2AA','#4682B4','#FFB6C1','#DDA0DD','#1E90FF','#FA170A'
	],
    series:[]
}
