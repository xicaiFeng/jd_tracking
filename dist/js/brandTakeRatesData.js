var brandTakeConfig = {
	slSubkey: $(".sl-subkey-event"),
	init: function(type) {
		if(type){
			this.getEchartJson(type);
		}else{
		this.getEchartJson("休闲裤");
		}
		this.slSubkeyEvent();
	},

	slSubkeyEvent: function() {
		var that = this;
		$(".sl-subkey-selected").click(function(){
			$(this).addClass("selected").siblings().removeClass("selected")
				//更新数据
			var type = $(this).html()
			console.log(type)
			that.getEchartJson(type)
			competingDataConfig.getCompetingJson(type)
		})
	
		/*this.slSubkey.children("li").click(function() {
		
		})*/
	},
	getEchartJson: function(type) {
		var that = this;
		$.getJSON("dist/js/inflowOutflow.json", function(json) {
			//console.log(json)

			for(var i in json) {
				if(json[i].type == type&&json[i].event == "inflow") {
					var inflow = json[i].data;
				}else if(json[i].type == type&&json[i].event == "outflow"){
					var outflow = json[i].data;
					
				}
			}
			that.echartAnalyse(inflow, outflow)
		})
	},
	echartAnalyse: function(inflow, outflow) {

		var obj = inflow;
		var leftChart = echarts.init(document.getElementById('leftPanel'));
		console.log(outflow);
		var brandName = []
		for(var i in inflow){
			brandName.push(inflow[i].name)
		}
		// 指定图表的配置项和数据
		var leftOption = {
			title: {
				text: '其他品牌流入到九牧王比例图',
				subtext: '数据单位(%)',
				x: '20%'
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				x: 'center',
				y: 'bottom',
				data: brandName
			},
			toolbox: {
				show: true,
				feature: {
					mark: {
						show: true
					},
					dataView: {
						show: true,
						readOnly: false
					},
					magicType: {
						show: true,
						type: ['pie', 'funnel']
					},
					restore: {
						show: true
					},
					saveAsImage: {
						show: true
					}
				}
			},
			calculable: true,
			series: [{
				name: '面积模式',
				type: 'pie',
				radius: [30, 110],
				center: ['50%', '50%'],
				roseType: 'area',
				label: {
					normal: {
						show: true
					}
				},
				precision: 1,
				data: [{
					value: obj[0].value,
					name: obj[0].name
				}, {
					value: obj[1].value,
					name: obj[1].name
				}, {
					value: obj[2].value,
					name: obj[2].name
				}, {
					value: obj[3].value,
					name: obj[3].name
				}, {
					value: obj[4].value,
					name: obj[4].name
				}, {
					value: obj[5].value,
					name: obj[5].name
				}, {
					value: obj[6].value,
					name: obj[6].name
				}, {
					value: obj[7].value,
					name: obj[7].name
				}, {
					value: obj[8].value,
					name: obj[8].name
				}, {
					value: obj[9].value,
					name: obj[9].name
				}],
				itemStyle: {
					normal: {
						label: {
							show: true,
							formatter: '{b} :{d}%',
						},
						labelLine: {
							show: true
						}
					}
				}
			}]
		};

		// 使用刚指定的配置项和数据显示图表。
		leftChart.setOption(leftOption);

		// 基于准备好的dom，初始化echarts实例
		var obj = outflow;
		var rightChart = echarts.init(document.getElementById('rightPanel'));

		// 指定图表的配置项和数据
		var rightOption = {
			title: {
				text: '九牧王流出到其他品牌比例图',
				subtext: '数据单位(%)',
				x: '20%'
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				x: 'center',
				y: 'bottom',
				data: brandName
			},
			toolbox: {
				show: true,
				feature: {
					mark: {
						show: true
					},
					dataView: {
						show: true,
						readOnly: false
					},
					magicType: {
						show: true,
						type: ['pie', 'funnel']
					},
					restore: {
						show: true
					},
					saveAsImage: {
						show: true
					}
				}
			},
			calculable: true,
			series: [{
				name: '面积模式',
				type: 'pie',
				radius: [30, 110],
				center: ['50%', '50%'],
				roseType: 'area',
				label: {
					normal: {
						show: true
					}
				},
				precision: 1,
				data: [{
					value: obj[0].value,
					name: obj[0].name
				}, {
					value: obj[1].value,
					name: obj[1].name
				}, {
					value: obj[2].value,
					name: obj[2].name
				}, {
					value: obj[3].value,
					name: obj[3].name
				}, {
					value: obj[4].value,
					name: obj[4].name
				}, {
					value: obj[5].value,
					name: obj[5].name
				}, {
					value: obj[6].value,
					name: obj[6].name
				}, {
					value: obj[7].value,
					name: obj[7].name
				}, {
					value: obj[8].value,
					name: obj[8].name
				}, {
					value: obj[9].value,
					name: obj[9].name
				}],
				itemStyle: {
					normal: {
						label: {
							show: true,
							formatter: '{b} :{d}%',
						},
						labelLine: {
							show: true
						}
					}
				}
			}]
		};

		// 使用刚指定的配置项和数据显示图表。
		rightChart.setOption(rightOption);
	}
}
brandTakeConfig.init()