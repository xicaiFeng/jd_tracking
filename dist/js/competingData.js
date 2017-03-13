/*
 *   author : xicai
 *   date : 3.1.2017 
 * 	 qq : 249655302
 * 	 竞品分析图例
 * 
 * ## 需要从后台请求过来的数据
 * 
 * #需要的数据  1 商品名称  2 商品访问量   3.两商品共同访问量
 * dataBrand = [{name:商品名称，visit : 商品访问量 , id ： 自定义商品id}]
 * 
 * dataCompare = [{x ： 商品id , y : 商品 id , visit : xy两商品交互访问量 }]  // 根据以后项目发展加上商品类型进行商品分类 type : "休闲裤"
 * 
 * ##根据项目需求  
 * 
 * #需要计算出  平均占有率   = 单独商品访问量 / 总访问量；
 * #平均重叠率 = 重叠访问人数/ 两商品各自访问量和  + ....  /   ( 10*9/2 )
 * 
 * 
 * 1 图需要数据   
 * 		平均占有率   =  X1 、 
 *  	平均重叠率   = 
 * 	 	品牌总数量   = 
 * 2 图需要数据 
 * 		A品牌访问人数 = X1 ；
 * 		B品牌访问人数 = X2 ；
 * 		公共访问人数 = 	X3 ；
 *      A消费者占比  = X1 /  (X1 + X2 + X3 ) ;
 * 	    B 消费者占比 = X2  /  (X1 + X2 + X3 ) ;
 *      重叠比例 = X3 / (X1 + X2 + X3 )
 * */
var dataBrand = [];
var dataCompare= [];
var competingDataConfig = {
	init : function(type){
		if(type){
			this.getCompetingJson(type)
		}else{
		this.getCompetingJson("休闲裤")
		}
	},
	getCompetingJson : function(type){
		$.getJSON("dist/js/competingData.json",function(json){
			for(var i in json){
				if(json[i].datatype == type){
				dataBrand =  json[i].dataBrand
				dataCompare = json[i].dataCompare
				
				countScale(dataBrand)
				
				//初始化两个图表
				relationEchart.init();
				echartTwoConfig.init();
				}
			}
		})
	}
}
competingDataConfig.init()

//图二数据 百分比计算  1参：品牌1id  2参 ： 品牌2id
function DataCount(id1,id2){
  	this.id1 = id1 ; //品牌1 id
  	this.id2 = id2 ; // 品牌2 id
  	this.X1 = 0;     //品牌1 总访问量
  	this.X2 = 0;     //品牌2 总访问量
  	this.X3 = 0;     //重合访问量
  	this.brand1Name = "";
  	this.brand2Name = "";
  	this.brand1Scale = 0 ;     // 品牌1 占比
  	this.brand2Scale = 0 ;     // 品牌2 占比
  	this.brandRepeatScale = 0; // 重复部分占比
  	this.init();     //初始化 数据
  	
	}
	DataCount.prototype = {
		init : function(){
		//获取重合访问量
		for(var i = 0 , length = dataCompare.length; i < length ; i ++){
	  		if(this.id1 > this.id2){
	  			if(dataCompare[i].x == this.id2&&dataCompare[i].y == this.id1){
	  				this.X3 = dataCompare[i].visit ;
	  				break;
	  			}else{
	  				this.X3 = 0
	  			}
	  		}else{
	  			if(dataCompare[i].x == this.id1&&dataCompare[i].y == this.id2){
	  				this.X3 = dataCompare[i].visit ;
	  				break;
	  			}else{
	  				this.X3 = 0
	  			}
	  		}
  		}
		//获取单个访问量
		this.visitCount(this.id1,this.id2)
		//计算比例
		this.brandScale(this.X1 , this.X2 , this.X3)
	},
	visitCount : function(id1,id2){
		for(var i = 0 , length = dataBrand.length; i < length ; i ++){
			if(dataBrand[i].id == id1){
				this.X1 = dataBrand[i].visit ;
				this.brand1Name = dataBrand[i].name
			}
			if(dataBrand[i].id == id2){
				this.X2 = dataBrand[i].visit ;
				this.brand2Name = dataBrand[i].name
			}
		}
	},
	brandScale: function(x1,x2,x3){
		var count = x1 + x2 + x3 ;
		this.brand1Scale = (x1 / count * 100).toFixed(2) ; //保留两位小数
		this.brand2Scale = (x2 / count * 100).toFixed(2) ;
		this.brandRepeatScale = (x3 / count * 100).toFixed(2) ;
	}
}
	
//计算品牌所在比例
function countScale(data){
	var addCount = 0 ;
	//------计算出总访问量
	for(var i = 0 , length = data.length ; i < length ; i ++){
		addCount += data[i].visit ;
	}
	//------计算各自占比
	for(var j in data){
		data[j].scale = (data[j].visit / addCount).toFixed(2) ;
	}
}
// 平均重叠率
function average(dataBrand,dataCompare){
	for(var i in dataBrand){
		for(var j in dataCompare){
			
		}
	}
}

//countScale(dataBrand)

//console.log(dataBrand)
// 平均占有率（感觉没有意义）
function aaa(dataBrand){
	var count = 0 ;
	for(var i in dataBrand){
		count += +dataBrand[i].scale
	}
	console.log(count/10)
};
//aaa(dataBrand)





/*
var dataBrand = [
				{name:'九牧王',visit: 801 ,id:0},
				{name:'红豆',visit: 1699 ,id:1},
				{name:'杉杉',visit:1412 ,id:2},
				{name:'花花公子',visit:415 ,id:3},
				{name:'威可多',visit:593 ,id:4},
				{name:'恒源祥',visit:634 ,id:5},
				{name:'传棨',visit:508 ,id:6},
				{name:'花花公子贵宾',visit:344 ,id:7},
				{name:'纱格',visit:503 ,id:8},
				{name:'领般',visit:266 ,id:9}
				];
var dataCompare = [{
					x : 0 , y : 1 , visit : 88 
					},{
					x : 0 , y : 2 , visit : 99 
					},{
					x : 0 , y : 3 , visit : 22
					},{
					x : 0 , y : 4 , visit : 53 
					},{
					x : 0 , y : 5 , visit : 59 
					},{
					x : 0 , y : 6 , visit : 37 
					},{
					x : 0 , y : 7, visit : 20 
					},{
					x : 0 , y : 8 , visit : 28 
					},{
					x : 0 , y : 9 , visit : 7 
					},
					
					{
					x : 1 , y : 2 , visit : 221 
					},{
					x : 1 , y : 3 , visit : 75
					},{
					x : 1 , y : 4 , visit : 42 
					},{
					x : 1 , y : 5 , visit : 62 
					},{
					x : 1 , y : 6 , visit : 81 
					},{
					x : 1 , y : 7, visit : 36 
					},{
					x : 1 , y : 8 , visit : 44 
					},{
					x : 1 , y : 9 , visit : 15 
					},
					
					{
					x : 2 , y : 3 , visit : 56
					},{
					x : 2 , y : 4 , visit : 83 
					},{
					x : 2 , y : 5 , visit : 103 
					},{
					x : 2 , y : 6 , visit : 80 
					},{
					x : 2 , y : 7, visit : 35 
					},{
					x : 2 , y : 8 , visit : 43 
					},{
					x : 2 , y : 9 , visit : 16 
					},
					
					
					
					{
					x : 3 , y : 4 , visit : 14 
					},{
					x : 3 , y : 5 , visit : 17 
					},{
					x : 3 , y : 6 , visit : 35 
					},{
					x : 3 , y : 7, visit : 12 
					},{
					x : 3 , y : 8 , visit : 14 
					},{
					x : 3 , y : 9 , visit : 2 
					},
					
					
					
					{
					x : 4 , y : 5 , visit : 107 
					},{
					x : 4 , y : 6 , visit : 27
					},{
					x : 4 , y : 7, visit : 34 
					},{
					x : 4 , y : 8 , visit : 21 
					},{
					x : 4 , y : 9 , visit : 9
					},
					
					
					{
					x : 5 , y : 6 , visit : 29
					},{
					x : 5 , y : 7, visit : 25 
					},{
					x : 5 , y : 8 , visit : 27 
					},{
					x : 5 , y : 9 , visit : 5
					},
					
					{
					x : 6 , y : 7, visit : 22 
					},{
					x : 6 , y : 8 , visit : 20 
					},{
					x : 6 , y : 9 , visit : 8
					},
					
					
					{
					x :  7, y : 8 , visit : 14 
					},{
					x :  7, y : 9 , visit : 7
					},
					
					
					{
					x :  8, y : 9 , visit : 16
					}
				]

*/