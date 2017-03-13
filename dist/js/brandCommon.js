var commonConfig = {
	slidebarItem :$(".slidebarItem") ,
	activeType : $(".sl-subkey-selected").html(),
	init : function(){
		this.sliedeEvent();
	},
	sliedeEvent : function(){
		//初始化两个图表
		var that = this;	
		this.slidebarItem.click(function(){
			
			var type = $(".sl-subkey-selected.selected").html()
			console.log(this.getAttribute("slidebar"))
			$(this).addClass("active").siblings(".slidebarItem").removeClass("active")
			if($(this).index() == 0){
				document.getElementById("navTitle").innerText = this.getAttribute("slidebar")
			}else if($(this).index() == 1){
				competingDataConfig.init(type);
				$(".showEchartThree").css("display","none")
				$(".showEchartTwo").css("display","block");
				document.getElementById("navTitle").innerText = this.getAttribute("slidebar")
				//$(".showEchartTwo").show(500).siblings(".echartBox").hidden(500)
			}else if($(this).index() == 2){
				brandTakeConfig.init(type)
				$(".showEchartTwo").css("display","none");
				$(".showEchartThree").css("display","block")
				document.getElementById("navTitle").innerText = this.getAttribute("slidebar")
				//$(".showEchartThree").show(500).siblings(".echartBox").hidden(500)
			}
		})
	}
}
commonConfig.init()




//function versionCompare(v1,v2){
//	var version1 = v1.split(".");
//	var version2 = v2.split(".");
//	alert( version1 + "---" + version2)
//	var v3 ;
//	for(var i = 0 ,length = version1.length ; i < length ; i ++){
//		version1[i] - version2[i] > 0 ?  v3 = v1 : version1[i] - version2[i] < 0 ? v3 =  v2 : v3 = "相等" 
//	}
//}
//
//
//alert(versionCompare("1.2.11","2.0.1"))


