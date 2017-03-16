/**
 * Created by Hasee on 2017/3/2.
 */
var indexPage={
        oLoginInput : $("._input_login"),
        oRegInput : $("._input_reg"),
        oBtnLoginIn : $("#loginIn"),
        oBtnRegister : $("#register"),
        oUserLoginName :document.getElementById("loginUser").value,
        oUserRegName : document.getElementById("regUser").value,
        init:function(){
        	var that = this ;
        	$("input").focus(function(){
        		$(this).css("border","none")
        	})
            this.oLoginInput.blur(function(){
           		var oInput = this
            	console.log(that.onLoginBlur(oInput));
            })
            this.oRegInput.blur(function(){
            	var oInput = this;
            	console.log(this)
            	console.log(that.onRegBlur(oInput))
            	
            })
            this.oBtnLoginIn.click(function(){
            	 that.clickLogin();
            })
            this.oBtnRegister.click(function(){
            	that.clickReg();
            })
            document.getElementById("userName").innerHTML =11111 //localStorage.getItem("userName");
           
        },
        onLoginBlur:function(oInput){
        	var count = 0 ;
        	console.log(oInput)
        	console.log(oInput.id)
            var flag = false;
            switch(oInput.id){
            	case "loginUser" :var reg = /^[\u4e00-\u9fa5|\d|A-z]{4,16}$/ ;flag = this.checkBlur(oInput.id,oInput.placeholder,reg); break;
            	case "loginPWD" :var reg = /^\w{4,16}$/ ;flag = this.checkBlur(oInput.id,oInput.placeholder,reg) ; break;
            };
            return flag ;
        },
        onRegBlur : function(oInput){
        	var count = 0 ;
        	console.log(oInput)
        	console.log(oInput.id)
            //var isTure = true;
            var flag = false;
            switch(oInput.id){
            	case "regUser" :var reg = /^[\u4e00-\u9fa50-9A-z_]{4,16}$/ ; flag = this.checkBlur(oInput.id,oInput.placeholder,reg); break;
            	case "regPWD" :var reg = /^\w{4,16}$/ ;flag =  this.checkBlur(oInput.id,oInput.placeholder,reg); break;
            	case "repeatRegPWD" : var reg = new RegExp("^" + $("#regPWD")[0].value + "$") ;flag =  this.checkBlur(oInput.id,oInput.placeholder,reg); break;
            	case "regEmail" :var reg =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ ; flag = this.checkBlur(oInput.id,oInput.placeholder,reg);  break;
            };
            return flag ;
        },
        checkBlur : function(id,tt,zz){
        	
        	
        	var oId = $("#"+id)
	   		var v =  oId.val();
	   		if(v == ""){
	   			
	   			oId.css("border","1px solid red")
	   			
	   			
	   			layer.open({
                                content: '不能为空'
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            })
	           return false;
	     	}
	     	var reg = zz
	     	console.log(reg)
	     	if(reg.test(v)){
	     		
	     		 return true;
	     	}else{
	     		
	     		oId.css("border","1px solid red")
	     		 
	     		 
	     		 layer.open({
                                content: tt
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            })
	     		 return false;
	     	}
       },
       clickLogin : function(){
       		var that = this;
       		for(var i = 0  ; i < this.oLoginInput.length ; i ++){
       			var oInput = this.oLoginInput[i];
            	//that.onBlur(oInput)
            	console.log(that.onLoginBlur(oInput))
       			//console.log(this.onBlur(oInput))
       			if(!that.onLoginBlur(oInput)){
       				return
       			}
       		}
       		//-------------------------------------------------------发送请求登录成功
       		alert("登录成功");
       		localStorage.setItem("userName",document.getElementById("loginUser").value);
       		document.getElementById("userName").innerHTML = document.getElementById("loginUser").value;
       		$("#myModal").fadeOut(500);
       		$(".modal-backdrop").fadeOut(500);
       		$(".userLoginMenu").hide()
            $(".successLogin").show()
       },
       clickReg : function(){
       		var that = this;
       		for(var i = 0  ; i < this.oRegInput.length ; i ++){
       			var oInput = this.oRegInput[i];
            	//that.onBlur(oInput)
            	console.log(that.onRegBlur(oInput))
       			//console.log(this.onBlur(oInput))
       			if(!that.onRegBlur(oInput)){
       				return
       			}
       		}
       		//---------------------发送请求--------------------------------------------------
       		alert("注册成功")
       		localStorage.setItem("userName",document.getElementById("regUser").value)
       		console.log(this.oUserRegName)
       		document.getElementById("userName").innerHTML =document.getElementById("regUser").value;
       		$("#myModal").fadeOut(500)
       		$(".modal-backdrop").fadeOut(500);
       		$(".userLoginMenu").hide()
            $(".successLogin").show()
       }
    }
    indexPage.init();
    

$("#userCenter").click(function(){
	
})
