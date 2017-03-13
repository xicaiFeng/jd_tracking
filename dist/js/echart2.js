//图一 竞品关系图配置项

var relationEchart = {
	dom : document.getElementById("brandSelation"),
	myChart : null,
	jsonData : null,
	init : function(){
		this.myChart = echarts.init(this.dom);
		this.getJson()
	},
	//更改创建图表的json数据
	getJson: function(){
		var that = this;
		$.getJSON('dist/js/test.json',function(json){
			var edges = json.edges
			for(var i in json.nodes){
				json.nodes[i].label = dataBrand[i].name + dataBrand[i].scale + "%"
				if( dataBrand[i].scale > 0 && dataBrand[i].scale <= 0.05){
					// 占比 0~0.05 的为红色
					json.nodes[i].color = "#73da1b";
					json.nodes[i].size = 10;
				}else if( dataBrand[i].scale > 0.05 && dataBrand[i].scale <= 0.1){
					//占比 0.05~0.1的为 蓝色
					json.nodes[i].color = "#ae1bba";
					json.nodes[i].size = 20;
				}else if( dataBrand[i].scale > 0.1 && dataBrand[i].scale <= 0.15){
					//占比 0.1~0.15的为绿色
					json.nodes[i].color = "#1b91da";
					json.nodes[i].size = 30;
				}else if( dataBrand[i].scale > 0.15){
					//占比大于0.15的为黑色
					json.nodes[i].color = "#da1b73";
					json.nodes[i].size = 40;
				}
			}
			for(var j in dataCompare){
				//互相访问量小与20不显示链接关系
				if(dataCompare[j].visit < 20){
					
					for(var k in edges){
						
						
						if(dataCompare[j].x == +edges[k].sourceID + 1&&dataCompare[j].y == +edges[k].targetID + 1){
								edges.splice(k,1)
						}
					}
			}
			}
			json.edges = edges;
			that.relationOption(json);
			that.myChart.setOption(option);
		})
	},
	relationOption : function (json) {
		    this.myChart.hideLoading();
		    this.myChart.setOption(option = {
		        title: {
		            text: '竞品关系图'
		        },
		        animationDurationUpdate: 1500,
		        animationEasingUpdate: 'quinticInOut',
		        series : [
		            {
		                type: 'graph',
		                layout: 'none',
		                
		                
		                roam: true, 
		                links : [
		                	{
		                		lineStyle : {
		                			normal : {
		                				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										  offset: 0, color: 'red' // 0% 处的颜色
										}, {
										  offset: 1, color: 'blue' // 100% 处的颜色
										}], false)
		                			}
		                		}
		                	}
		                ],
		                
		                // progressiveThreshold: 700,
		                data: json.nodes.map(function (node) {
		                    return {
		                        x: node.x,
		                        y: node.y,
		                        id: node.id,
		                        name: node.label,
		                        symbolSize: node.size,
		                        itemStyle: {
		                            normal: {
		                                color: node.color
		                            }
		                        }
		                    };
		                }),
		                edges: json.edges.map(function (edge) {
		                    return {
		                        source: edge.sourceID,
		                        target: edge.targetID
		                    };
		                }),
		                label: {
		                    emphasis: {
		                        position: 'right',
		                        show: true
		                    }
		                },
		                roam: true,
		                focusNodeAdjacency: true,
		                lineStyle: {
		                    normal: {
		                        width: 0.5,
		                        curveness: 0.3,
		                        opacity: 0.7 ,
		                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										  offset: 0, color: 'red' // 0% 处的颜色
										}, {
										  offset: 1, color: 'blue' // 100% 处的颜色
										}], false)
		                    }
		                }
		            }
		        ]
		    }, true);
		}
}




//商品重叠率图表
var echartTwoConfig = {
	  	dom : $(".compareBrandType")[0],
	  	dom2 : $(".compareBrandType")[1],
	  	init : function(){
	  			this.EchartOverLap(this.dom,0,1);
	  			this.eventChartBirth();
	  		},
	  	myChart : function(){
	  		
	  	},
	  	EchartOverLap: function(dom,goods1id,goods2id){
				var goodsMsg = new DataCount(goods1id,goods2id)
				this.myChart = echarts.init(dom);
			  this.echartOption = {
					    title: {
					        subtext: '（单位：%）',
					        sublink: 'http://e.weibo.com/1341556070/AjQH99che'
					        
					    },
					    tooltip : {
					        trigger: 'axis',
					        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					        },
					        formatter: function (params) {
					            var tar = params[1];
					            return tar.name     +( tar.value ) + "%";
					        }
					    },
					    grid: {
					        left: '3%',
					        right: '4%',
					        bottom: '3%',
					        containLabel: true
					    },
					    xAxis: {
					        type : 'category',
					        splitLine: {show:false},
					        data : [goodsMsg.brand1Name + '占比','公共部分占比',goodsMsg.brand2Name + '占比']
					    },
					    yAxis: {
					        type : 'value'
					    },
					    series: [
					        {
					            name: '辅助',
					            type: 'bar',
					            stack:  '总量',
					            itemStyle: {
					                normal: {
					                    barBorderColor: 'rgba(0,0,0,0)',
					                    color: 'rgba(0,0,0,0)'
					                },
					                emphasis: {
					                    barBorderColor: 'rgba(0,0,0,0)',
					                    color: 'rgba(0,0,0,0)'
					                }
					            },
					            data: [100 - +goodsMsg.brand1Scale, +goodsMsg.brand2Scale , 0]   // 柱状图起始点
					        },
					        {
					            name: '占比',
					            type: 'bar',
					            stack: '总量',
					            label: {
					                normal: {
					                    show: true,
					                    position: 'inside'
					                }
					            },
					            data:[+goodsMsg.brand1Scale, +goodsMsg.brandRepeatScale, +goodsMsg.brand2Scale]  //柱状图长度
					        }
					    ]
					}
			    this.myChart.setOption(this.echartOption);
			},
			//第一个图表下拉菜单生成  - 菜单点击事件- 
			eventChartBirth : function(){
				//1 -- 根据商品名称生成下拉菜单   数据在 ajaxdata.js --- dataBrand
				$(".dropdownMenuItem").html(" ")
				var that = this ;
				$("#dropdownMenu1")[0].innerHTML = dataBrand[0].name + "<span class='caret'></span>";
				$("#dropdownMenu1").attr("brandid",dataBrand[0].id);
				$("#dropdownMenu2")[0].innerHTML = dataBrand[1].name + "<span class='caret'></span>";
				$("#dropdownMenu2").attr("brandid",dataBrand[1].id);
				console.log(document.getElementById("dropdownMenu2"))
				for(var i in dataBrand){
					var oli = "<li class='selectedLi' brandId=" + dataBrand[i].id + " >" + dataBrand[i].name + "</li>" ;
//					$(oli).appendTo($(".leftbBrand"))
//					$(oli).appendTo($(".rightBrand"))
					$(oli).appendTo($(".dropdownMenuItem"))
				}
				//2 ----绑定点击事件
				$(".selectedItem").delegate(".selectedLi","click",function(){
				var text = this.innerHTML;
				console.log(text)
				var oid = $(this).attr("brandId");
				$(this).parents(".selectedItem").find("button").html(text + "<span class='caret'></span>").attr("brandId",oid)
				})
				
				//3 -- 查询按钮点击事件
				$(".seoSelectedBrand").click(function(){
					var pid1 = $("#dropdownMenu1").attr("brandId");
					var pid2 = $("#dropdownMenu2").attr("brandId");
					if(pid1 == pid2){
					}
				//	var dom1  = document.getElementsByClassName("compareBrandType")[1]
					that.EchartOverLap(that.dom,pid1,pid2)
				})
			}

	  }



