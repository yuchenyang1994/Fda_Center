export default {
			title: {
				text: '最新持仓数据',
				textStyle: {fontSize: '10'},
				left: 'left',
				padding: 0,
                bottom:2
			},
            legend: {
                data:['空头持仓', '多头持仓']
            },
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
                top: '10%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'value'
				}
			],
			yAxis: [
				{
					type: 'category',
					axisTick: {show: false},
					data: []
				}
			],
			series: [
				{
					name: '多头持仓',
					type: 'bar',
					stack: '持仓量',
					label: {
						normal: {
							show: true
						}
					},
					data: []
				},
				{
					name: '空头持仓',
					type: 'bar',
                    stack: '持仓量',
					label: {
						normal: {
							show: true
						}
					},
					data: []
				}

			]
		};