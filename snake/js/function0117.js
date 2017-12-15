function getClass(classname,father){//(传入的类名，需要的范围)
	father=father||document;//没有范围限制的时候能全文检索，如果没有传入参数，则默认为传入father，如果只传入一个参数时为father
	if(father.getElementsByClassName){//判断是否是现代浏览器，是否兼容呢
	return father.getElementsByClassName(classname);//是现代浏览器则执行原生方式
	}
	else{//不是现代浏览器则用以下程序解决其不兼容问题
	var all=father.getElementsByTagName("*");//在father这个盒子的范围内用标签名获取无兼容性问题
	var newarr=new Array;//将把取到的所有标签名的集合放入该数组内
		for(var i=0;i<all.length;i++){
			if(checkPre(all[i].className,classname)){//只要是类名是存进去的classname则应用
				newarr.push(all[i]);
			}
		};
		return newarr;
	}
}
function checkPre(str,classname){//定一个检测多类名中是否包括需要的类名
	var arr=str.split(" ");//将多类名分割成数组,空格号为分隔符
	for(var i in arr){//遍历数组
		if(arr[i]==classname){//对每一个类名进行比较，只要有一个满足则返回true
			return true;
		}					
	};return false;
}
// //解决ie8及以下浏览器不兼容类名获取和多类名取用的问题
 
// 三、获取id名，类名，标签名的通用方式（2016年8月8号上午）

function $(selecter,father){
	if(typeof selecter=="string"){
		father=father||document;
		selecter=selecter.replace(/^\s*|\s*$/g,"");//正则
		if(selecter.charAt(0)=="."){
			return getClass(selecter.slice(1),father);
		}
		else if(selecter.charAt(0)=="#"){
			return document.getElementById(selecter.slice(1));
		}
		else if(/^[a-z]+\d*$/g.test(selecter)){
			return father.getElementsByTagName(selecter);
		}
	}
	else if(typeof selecter=="function"){
		window.onload=function(){
			selecter();
		}
	}	
}
// 三改版、根据下面十一函数改形式，改了‘else if’处：window强制加载.
// 三、再升级，引入了trim()，可对传入的参数去俩端的空格操作（2017.2.13pm）
// function $(selecter,father){//$(". box")
// 	if(typeof selecter=="string"){
// 		selecter=trim(selecter,0);//传入的字符串去空操作，调用第十八个函数trim(a,b)
// 		father=father||document;
// 		selecter=selecter.replace(/^\s*|\s*$/g,"");//正则
// 		if(selecter.charAt(0)=="."){
// 			return getClass(selecter.slice(1),father);
// 		}
// 		else if(selecter.charAt(0)=="#"){
// 			return document.getElementById(selecter.slice(1));
// 		}
// 		else if(/^[a-z]+\d*$/g.test(selecter)){
// 			return father.getElementsByTagName(selecter);
// 		}
// 	}
// 	else if(typeof selecter=="function"){
// 		addEvent(window,"load",selecter);
// 	}	
// }
// 三再再升级、对$()的扩充，使其可以传后代选择器eg:$(".box span")（2017.2.14am）
// function $(selecter){
// 	if(typeof selecter=="string"){
// 		// selecter=trim(selecter,0);//传入的字符串去空操作，调用第十八个函数trim(a,b)
// 		// father=father||document;
// 		// selecter=selecter.replace(/^\s*|\s*$/g,"");//正则
// 		var reg=/[\.,#]?[a-zA-Z][a-zA-Z0-9]{0,4}[-,_]?[a-zA-Z0-9]{0,4}/g;
// 		var arr=[];//装所有满足reg条件的字符串，即选择器:.box span
// 		arr=selecter.match(reg);

// 		var newarr=[];
// 		for(var i=0;i<arr.length;i++){
// 			if (i==0) {
// 				newarr.push(getElement(arr[i],[document]))//找document的下的所有选择器.box
// 			}else{
// 				newarr.push(getElement(arr[i],newarr[i-1]));
// 				// 找.box下的所有span
// 			}
// 		}
		
// 		return newarr[arr.length-1]//找到了最后那个具体的标签了
// 		// if(selecter.charAt(0)=="."){
// 		// 	return getClass(selecter.slice(1),father);
// 		// }
// 		// else if(selecter.charAt(0)=="#"){
// 		// 	return document.getElementById(selecter.slice(1));
// 		// }
// 		// else if(/^[a-z]+\d*$/g.test(selecter)){
// 		// 	return father.getElementsByTagName(selecter);
// 		// }
// 	}
// 	else if(typeof selecter=="function"){
// 		addEvent(window,"load",selecter);
// 	}
// }
// 找ranger下面的selecter
function getElement(selecter,ranger){//ranger与father意义相同
	var first=selecter.charAt(0);
	var arr1=[];
		if(first=="."){
			for(var i=0;i<ranger.length;i++){
				arr1.push(getClass(selecter.slice(1),ranger[i]));//二维的，因为getclass返回的是一个数组
				for(var j=0;j<arr1[i].length;j++){
					arr1.push(arr1[i][j]);

				}
			}
			return arr1;			
		}
		else if(first=="#"){
			arr1.push(document.getElementById(selecter.slice(1)))
			// return document.getElementById(selecter.slice(1));
		}
		// else if(/^[a-z]+\d*$/g.test(selecter)){
		// 	return ranger.getElementsByTagName(selecter);
		// }
	
}



// 四、获得节点中的子节点
//"a"子节点只有元素节点
//"b"子节点只有元素节点与非空的文本节点
function getChilds(father,type){//此处father为形参
	type=type||"a";
	var all=father.childNodes;
	var newarr=[];
	for (var i = 0; i < all.length; i++) {
		if(type=="a"){
			if(all[i].nodeType==1){//元素节点
			newarr.push(all[i]);//错误示范newarr[].push=all[i];
			}
		}
		else if(type=="b"){//元素节点或非空文本节点
			if(all[i].nodeType==1||(all[i].nodeType==3 && all[i].nodeValue.replace(/^\s*|\s*$/g,"")!="")){
				newarr.push(all[i]);
			}
		}		
	};return newarr;
}


// 五、获得节点中的第一个子节点（2016年8月10号下午）
function getFirst(father){
	return getChilds(father)[0];
}

// 六、获得节点中的最后一个子节点
function getLast(father){
	return getChilds(father)[getChilds(father).length-1];
}

// 七、获得指定的子节点
function getNum(father,num){
	return getChilds(father)[num];
}

// 八、获得下一个的兄弟节点
function getNext(obj){
	var next=obj.nextSibling;
	if(!next){
		return false;
	}
	while(next.nodeType==3||next.nodeType==8){
		next=next.nextSibling;
		if(!next){
			return false;
		}
	}
	return next;
}

// 九、获得上一个的兄弟节点
function getPre(obj){
	var pre=obj.previousSibling;
	if(!pre){
		return false;
	}
	while(pre.nodeType==3||pre.nodeType==8){
		pre=pre.nextSibling;
		if(!pre){
			return false;
		}
	}
}


//十、插入到某个对象之后（2016年8月11号上午）
function insertAfter(father,newobj,oldobj){//(父容器，要插入的对象，之后的对象)
	var next=getNext(oldobj);//定义next
	if(next){
		father.insertBefore(newobj,next);
	}
	else{
		father.appendChild(newobj);
	}
}

//十一、绑定事件的兼容函数（2016年8月11号下午）
// function addEvent(obj,event,fun){
// 	if(obj.attachEvent){
// 		obj.attachEvent("on"+event,function(){
// 			fun.call(obj);
// 		})
// 	}else{
// 		obj.addEventListener(event,fun,false);
// 	}
// }

// 十一改版、添加事件和删除函数（2017年1月17号下午）
function addEvent(obj,event,fun){
	if(obj.attachEvent){
		obj.attachEvent("on"+event,fun)
	}else{
		obj.addEventListener(event,fun,false);
	}
}
function removeEvent(obj,event,fun){
	if(obj.attachEvent){
		obj.detachEvent("on"+event,fun)
	}else{
		obj.removeEventListener(event,fun,false);
	}
}

//十二、兼容鼠标滚轮的函数（2016年8月15号下午）
// function mouseWheel(obj,upfun,downfun){
// 	if(obj.attachEvent){
// 		obj.attachEvent("onmousewheel",scrollFn);//IE、opera
// 	}else if(obj.addEventListener){
// 		obj.addEventListener("mousewheel",scrollFn,false);//chrome.safari -webkit-
// 		obj.addEventListener("DOMMouseScroll",scrollFn,false);//forefox -moz-
// 	}
// 	function scrollFn(e){
// 		var eve=e||window.event;
//      if(eve.preventDefault){eve.preventDefault();}  //阻止浏览器默认行为
//        else{eve.returnValue=false}
// 		var fangxiang=eve.wheelDelta||eve.detail;
// 		if(fangxiang==-3||fangxiang==120){
// 			if(upfun){
// 				upfun();
// 			}
// 		}
// 		if(fangxiang==3||fangxiang==-120){
// 			if(downfun){
// 				downfun();
// 			}
// 		}
// 	}
// }

// 十二改版、滚轮兼容函数，新增apply(obj)与call(obj)（2017.1.19）
function mousewheel(obj,upFn,downFn){
	if(obj.addEventListener){//高版本浏览器
		obj.addEventListener('mousewheel',scrollFn,false);//谷歌
		obj.addEventListener('DOMMouseScroll',scrollFn,false);//火狐
	}else if(obj.attachEvent){//IE低版本浏览器
		obj.attachEvent('onmousewheel',scrollFn);
	}
	function scrollFn(e){
		var eve=e||window.event;
		if(eve.preventDefault){eve.preventDefault();}  //阻止浏览器默认行为
        else{eve.returnValue=false}
		var dir=eve.wheelDelta||eve.detail;
		if(dir==120||dir==-3){
			upFn.call(obj);//用call(obj)使html调用this时执行环境正确
		}else if(dir==-120||dir==3){
			downFn.apply(obj);//用apply(obj)与call(obj)同理，区别是call()集合的形式，而apply()是数组的形式
		}
	}
}


//十三、hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//十四、判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*十五、
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
// 十六、
 function getEvent (e) {
      return e||window.event;
 }
/********************************/
// 十七、getStyle（）函数（2017.1.18拷贝）
function getStyle(obj,attr){
		if(window.getComputedStyle){
			return getComputedStyle(obj,null)[attr];
			/*return getComputerStyle(obj,null).arrt
			  获取属性的两种方法：对象.属性；
			  					  对象[“属性”]
			  最后不能是.arrt，因为调用函数时参数是一个字符串
			*/;
		}else{
			return obj.currentStyle[attr];
		}
}

//十八、trim函数去空，使传入的标签名可以有空格，结合$函数用（2017年2月13号下午写） 
	function trim(str,num){
		if(num==1){
			// 去左边的空
			return str.replace(/^\s+/g,"");
		}
		else if(num==2){
			// 去右边的空
			return str.replace(/\s+$/g,"");
			
		}else if(num==0){
			// 去左右俩边的空
			return str.replace(/^\s+|\s+$/g,"");

		}
	}