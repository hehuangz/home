window.onload=function(){


var denglu=$(".denglu")[0];
var nameagain=$(".nameagain")[0];
var passagain=$(".passagain")[0];
var passagaina=$(".passagaina")[0];
var username=$("#username");
var password=$("#password");
var passworda=$("#passworda");
var flagU=false,flagP=false,passPA=false;

var regU=/^[a-zA-Z]\w{2,9}/i;//不区分大小写的3~10位的用户名
var regP=/^\w{6,16}$/;//6~16位的数字密码
// var user=username.value.trim();//将去空的字符串给user保存
var pass=password.value.trim();//将去空的字符串给user保存
var passa=passworda.value.trim();//将去空的字符串给user保存
var user=username.value.trim();//将去空的字符串给user保存

username.onkeyup=function(){
	user=this.value.trim();
	clearTimeout(window.t);
	window.t=setTimeout(function(){//给个时间延迟函数，让它隔0.5秒再发送数据，期间用户持续输入，延迟函数任然会给每一次发送数据，只是延迟点发送，因此在上一行加清楚函数，这样就不会发送那些过掉的数据了，减轻服务器的压力。
	  ajax({url:"checkusername.php",
		 method:"get",
		 asynch:true,
		 dataType:'string',
		 data:{U:user},
		 success:function(data){
		 	data=data.trim();//后台返回的是‘N ’,N后不明原因的有空格，所以不执行，因此用trim方法对其修整去空
		 	if(data=='N'){//该用户名存在
				nameagain.style.display='block';
		 	}else if(data=='Y'){//该用户名不存在
				nameagain.style.display='none';
		 		// alert("用户名或密码不匹配");
		 	}	 	
		 }
	  })
	},500);	
	flagU=true;
}
password.onkeyup=function(){
// password.onblur=function(){
	// 判断密码格式是否正确
	if(regP.test(password.value)){
		passagain.style.display="none";
		flagP=true;		
	}else{
		passagain.style.display="block";
		return;		
	};
}
passworda.onkeyup=function(){
	//判断再次输入的密码是否一致
	if(password.value==passworda.value){
		passagaina.style.display="none";
		flagPA=true;		
	}else{
		passagaina.style.display="block";
		return;		
	};
}	
// 注册时发送数据
denglu.onclick=function(){	
	// 都没输入时不放松数据
	if(username.value==""||password.value==""||passworda.value==""){
		return;
	}
	// 用户名和密码和再次输入的密码都输入符合规则就开始与后台数据对接
	if(flagU && flagP && flagPA){
		pass=password.value;
		ajax({url:"register.php",
			 method:"get",
			 asynch:true,
			 dataType:'string',
			 data:{U:user,P:pass},
			 success:function(data){
			 	data=data.trim();
			 	if(data=='Y'){
			 		alert('成功注册，页面将会回到登录页登录')
			 		location.href='login.html';
			 		// alert("注册成功");
			 	}else if(data=='N'){
			 		alert('N')
			 		document.myform.reset();//表单重置，因为d整个bix是用form标签而不是div，form中有reset()方法
			 		// alert("注册失败");
			 	}	 	
			 }
		})
	}	

}


}
