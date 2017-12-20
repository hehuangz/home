window.onload=function(){

var denglu=$(".denglu")[0];
var nameagain=$(".nameagain")[0];
var passagain=$(".passagain")[0];
var flagU=false,flagP=false;//用户名和密码是否正确的开关
var username=$("#username");
var password=$("#password");
// 定义提示信息是否开启的开关
// var flagUtip=false,
t=setInterval(function(){//把提示信息隐藏了
	nameagain.style.display="none";
	passagain.style.display="none";		
},3000)
denglu.onclick=function(){
	if(username.value==""||password.value==""){//没输入时显示提示
		// nameagain.style.display="block";
		// passagain.style.display="block";
			// 让提示框三秒后消失		
		return;
	}	
	var regU=/^[a-zA-Z]\w{2,9}/i;//不区分大小写的3~10位的用户名
	var regP=/^\w{6,16}$/;//6~16位的数字密码
	// var user=trim(username.value,0);//将去空的字符串给user保存
	// var pass=trim(password.value,0);//将去空的字符串给user保存
	var user=username.value.trim();//将去空的字符串给user保存
	var pass=password.value.trim();//将去空的字符串给user保存

	//判断用户名
	if(regU.test(user)){
		flagU=true;
	}
	else{
		nameagain.style.display="block";
		return;
	};
	//判断密码
	if(regP.test(pass)){
		flagP=true;		
	}else{
		passagain.style.display="block";
		return;		
	};


	// 用户名和密码都输入符合规则就发数据
	if(flagU && flagP){
		ajax({url:"login.php",
			 method:"get",
			 asynch:true,
			 dataType:'string',
			 data:{U:user,P:pass},
			 success:function(data){
			 	// alert(data)//是一大推div和css样式
			 	data=data.trim();//后台返回的是‘N ’,N后不明原因的有空格，所以不执行，因此用trim方法对其修整去空
			 	if(data=='Y'){
			 		alert("成功登录！进入游戏ing");
			 		self.location="snake.html";
			 	}else if(data=='N'){
			 		alert("用户名或密码不匹配");
			 	}	 	
			 }
		})
	}


}//onclick

}
