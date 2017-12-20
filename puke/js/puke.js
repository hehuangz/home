$(function(){
	var poke=[];//放牌,因为有52张牌，每张牌都是一个对象
	var biao={};//标识，有没有这张牌
	var color=['s','h','d','c'];//花色从这取
	var center=$('.centerBox');
	var toRight=$('.moveRight');
	var toLeft=$('.moveLeft');
	// 洗牌
	while(poke.length<52){
		var shuzi=Math.ceil(Math.random()*13);
		var huase=color[Math.floor(Math.random()*4)];
		if(!biao[shuzi+'_'+huase]){//去重
			biao[shuzi+'_'+huase]=true;
			poke.push({//放牌
				'huase':huase,
				'shuzi':shuzi
			})
		}
		
	}//while
	// 名称对应
	var dirs={
		'1':'A','2':2,'3':3,'4':4,'5':5,'6':6,'7':7,
		'8':'8','9':9,'10':'T','11':'J','12':'Q','13':'K'
	}
	// 发牌
	for(var i=0,index=0;i<7;i++){		
		for(j=0;j<i+1;j++){
			index++;
			var item=poke[index];//记录发的牌
			var url="url(images/"+dirs[item.shuzi]+item.huase+".png)";
			// console.log(url)
			$('<li>').addClass('pai center')
			.attr({'id':i+'_'+j})
			.data('num',item.shuzi)
			.css('backgroundImage',url)
			.appendTo(center)
			.delay(index*60)
			.animate({left:(300-i*50)+j*100,top:i*50,opacity:1})

		}
	}
	// 发牌，下左边区域
	for(;index<poke.length;index++){
		var item=poke[index];//记录发的牌
		var url="url(images/"+dirs[item.shuzi]+item.huase+".png)";
		// console.log(url)
		$('<li>').addClass('pai zuo').css('backgroundImage',url)
		.appendTo(center)
		.delay(index*60)
		.animate({left:150,top:450,opacity:1})
		.attr({'id':i+'_'+j})
		.data('num',item.shuzi)

	}

	// 消牌
	var first=null;//记录第一次点击的对象
	$('.pai').on('click',function(){
		var coord=$(this).attr('id').split('_');//id名切割
		var i=parseInt(coord[0]);
		var j=parseInt(coord[1]);
		if(i<6){//中间最下排永不被压，左下区域的牌不被压
			if($('#'+(i+1)+'_'+j).length || $('#'+(i+1)+'_'+(j+1)).length){
			// 被压住了
			// alert(1)
			return;
			}
		}
		// 没被压住的情况
		if($(this).data('num')===13){//是K的话
			$(this).animate({
				top:0,
				right:0,
				opacity:0,
			}).queue(function(){
				$(this).remove();
			})
			return;
		}else{//不是K的话
			$(this).toggleClass('active');
			if($(this).hasClass('active')){
				$(this).animate({
					top:'-=20'
				})
			}else{
				$(this).animate({
					top:'+=20'
				})
			}
			// 俩者相加,第一次点击为first,并保存下first的值				
			if(!first){
				first=$(this);
			}else{
				if(parseInt($(this).data('num'))+parseInt(first.data('num'))==13){
					$('.pai.active').each(function(index,obj){
						$(obj).animate({
							top:0,
							right:0,
							opacity:0
						}).queue(function(){
							$(this).remove();
						})
					})
				}else{
					$('.pai.active').removeClass('active').each(function(index,obj){
						$(obj).animate({
							top:'+=20',
							// opacity:1
						})
					})
				}//4e;se
				first=null;
			}//3esle

		}//2else
		
	})//消牌

// 点击toRight按钮，牌向右搬送一张
var zindex=1;

toRight.click(function(){
	 $('.pai.zuo').eq(-1).addClass('you').removeClass('zuo')
	 .css({zIndex:++zindex})
	 .delay($(this)*50)
     .animate({
           left:'+=300'
      })
})
// 点击toLeft按钮，牌向左搬送一张
toLeft.click(function(){
	 $('.pai.you').eq(0).addClass('zuo').removeClass('you')
	 .css({zIndex:++zindex})
	 .delay($(this)*50)
     .animate({
           left:'-=300'
      })
})

})