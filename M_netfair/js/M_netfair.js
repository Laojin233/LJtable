//*由于运用了插件，所以此页面的click事件用 on('tapClick',fun(){...})代替
//
//
//背景画布
var canvas = document.getElementById('indexCanvas');
var ctx = canvas.getContext('2d');
var _width = canvas.width = canvas.offsetWidth;
var _height = canvas.height = canvas.offsetHeight;
var leftDot = rightDot = _height * 0.7  //起始点和终点高度
var leftDotSpeed = 0.2;
var rightDotSpeed = 0.16;
var n = 0;
window.requestAnimationFrame =  window.requestAnimationFrame ||window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame ||window.msRequestAnimationFrame;
run();
function drawWater(n,color, leftDot, rightDot){
	var angle = n * Math.PI / 180;
	var deltaHeight = Math.sin(angle) * _height / 8;
	var deltaHeightRight = Math.cos(angle) * _height / 7;
	ctx.beginPath();
	ctx.moveTo(0, leftDot);
	ctx.bezierCurveTo(_width / 4, leftDot + deltaHeight, _width * 3 / 4, rightDot + deltaHeightRight, _width, rightDot);
	ctx.lineTo(_width,- _height);
	ctx.lineTo(0, -_height); //使得下半个矩形闭合
	ctx.fillStyle = color;
	ctx.fill();
}
function run() {
	ctx.clearRect(0, 0, _width, _height);
	n+=1;
	leftDot += leftDotSpeed
	rightDot += rightDotSpeed
	if(leftDot>_height*0.8 || leftDot<_height*0.6){
		leftDotSpeed *= -1
	}
	if(rightDot>_height*0.8 || rightDot<_height*0.6){
		rightDotSpeed *= -1
	}
	drawWater(n+40,'#e6f9f2', leftDot, rightDot)
//			drawWater(n,'#92dcd8', leftDot, rightDot)
	drawWater(n,'#6083f7', leftDot, rightDot)
	requestAnimationFrame(run);
}
//--------Iscroll滚动插件--------//
var outScroll;
function loaded () {
	outScroll = new IScroll('#wrapper', 
		{ 
			bounceEasing: 'elastic', 
			bounceTime: 200,
			mouseWheel:true,
			click:true,
			tap:'tapClick',
			probeType: 3,
//			preventDefault: false,
		});
		innerScroll=new IScroll('.main_list-jobs-fix',
			 {
			 	bounce: false, 
			 	mouseWheel:true,
			 	click:true,
			 	tap:'tapClick',
			 }
		)
		innerScrolltwo=new IScroll('.main_list-person-fix',
			 {
			 	bounce: false, 
			 	mouseWheel:true,
			 	click:true,
			 	tap:'tapClick',
			 }
		)
	outScroll.on('scroll', updatePosition);
	outScroll.on('scrollEnd', updatePosition);
}
//切换大厅
//
function showJobList(){
	$('.main_list-jobs').first().css('display', 'none')
	$('.main_list-person').first().css('display', 'block')
	$('.hall_company').addClass('change_active')
	$('.hall_personal').removeClass('change_active')
	outScroll.refresh();//更改dom之后需要重新计算
}
function showPerList(){
	$('.main_list-jobs').first().css('display', 'block')
	$('.main_list-person').first().css('display', 'none')
	$('.hall_company').removeClass('change_active')
	$('.hall_personal').addClass('change_active')
	outScroll.refresh();	
}
$('#hall_company').on('click', function() {
		showJobList()
})
$('#hall_personal').on('click', function() {
	showPerList()	
})
$('.hall_company').on('tapClick', function() {
	showJobList()
});
$('.hall_personal').on('tapClick', function() {
	showPerList()	
});

//-------滚动事件-------
var _isFolwADDing=false
function updatePosition () {
//	console.log('1')
	//滚动置顶搜索栏；
	if(this.y<(-250)){
			$('#change_hall-top').show()
	}
	else{
			$('#change_hall-top').hide()
				}
	//如果到底了-执行流加载
	//	console.log(this.y)
	if(this.y<=(this.wrapperHeight-this.scrollerHeight-110)&&_isFolwADDing==false){
	// console.log('到底并继续下拉，触发流加载')
          	flowAddElem()
         
	}
 	
}

//-------弹出层-------//
//	----查看会议详情----
$('#showFairMore').on('tapClick',function(){
	console.log('11111')
	layer_ShowFairMore()
})
function layer_ShowFairMore () {
	layer.open({
		type: 1,
		title: false,
//		shadeClose: true, //点击遮罩关闭层//移动端最好关闭此配置
		area: ['80%', '7rem'],
		content: $('#layer_FairDetails'),
		skin: 'layer-dudu-class',

	});
	
}
//----弹出搜索栏------//
//$('#search_icon').on('click',function() {
//	console.log('xxx')
////	$('#search_icon').css('-webkit-animation', 'lachang 1.3s linear')
////  $('#search_icon').css('border-radius','0.6rem 0 0 0.6rem')
////	$('.header_search').toggle()
//
//})
//Vue动态绑定
var indexLoad
var _company = new Vue({
  el: '#jobList',
  beforeCreate:function(){
  	//console.log('xxx111')
  	indexLoad = layer.open({
  		type: 3,
		title: false,
		offset: ['10rem', '42%'],
//		shadeClose: false, //点击遮罩关闭层//移动端最好关闭此配置
		shade:false,
//		area: ['80%', '7rem'],
//		content: $('#layer_FairDetails'),
		//		content:'http://baidu.com',
		//style: 'background-color:#09C1FF; color:#fff; border:none;',
  })
  },
  data: {
   		 comInfos: [
	      { name: '广州市东洲有限公司' ,logo:'img/1.png'},
	      { name: '广州市西洲有限公司' ,logo:'img/huojian.png'},
	      { name: '广州市南洲有限公司' ,logo:'img/111.png'},
	      { name: '广州市北洲有限公司' ,logo:'img/111.jpg'},
	       { name: '广州市东洲有限公司' ,logo:'img/111.jpg'},
//	      { name: '广州市西洲有限公司' ,logo:'img/huojian.png'},
//	      { name: '广州市南洲有限公司' ,logo:'img/111.png'},
//	      { name: '广州市北洲有限公司' ,logo:'img/111.jpg'},
//	       { name: '广州市东洲有限公司' ,logo:'img/111.jpg'},
//	      { name: '广州市西洲有限公司' ,logo:'img/huojian.png'},
//	      { name: '广州市南洲有限公司' ,logo:'img/111.png'},
//	      { name: '广州市北洲有限公司' ,logo:'img/111.jpg'},
	    ]
  },
mounted:
	function(){
	  	layer.close(indexLoad); 
	  },
	updated:function(){
		outScroll.refresh()
	}
})
var _peason = new Vue({
	el: '#peasonList',
	beforeCreate:function(){
	  	//console.log('xxx111')
	  	indexLoad = layer.open({
	  		type: 3,
			title: false,
			offset: ['10rem', '42%'],
	//		shadeClose: false, //点击遮罩关闭层//移动端最好关闭此配置
			shade:false,
	  	})
	 },
	data: {
	   		 perInfos: [
		      { name: '陈大大',logo:'img/111.jpg', },
		      { name: '陈大小',logo:'img/no_photo_female.png', },
		      { name: '陈小小',logo:'img/no_photo_male.png', },
		      { name: '陈小大',logo:'img/no_photo_female.png', },
		      { name: '陈小大',logo:'img/no_photo_male.png', },
		    ]
	},
 	mounted:function(){
	  	layer.close(indexLoad); 
	  },
	updated:function(){
		outScroll.refresh()
	}
})
console.log(window,window.location.pathname)
//流加载
var _tmpData=[{ name: '广州市啊啊有限公司' ,logo:'img/huojian.png'},
	      { name: '广州市爸爸有限公司' ,logo:'img/111.png'},
	      { name: '广州市出差有限公司' ,logo:'img/111.jpg'},
	       { name: '广州市到底有限公司' ,logo:'img/111.jpg'},
	      { name: '广州市方法有限公司' ,logo:'img/huojian.png'},
	      { name: '广州市嗯嗯有限公司' ,logo:'img/111.png'},
	      { name: '广州市哦哦有限公司' ,logo:'img/111.jpg'},]
var _tmpData1=[
		{ name: '陈大小',logo:'img/no_photo_female.png',},
	    { name: '陈小小',logo:'img/no_photo_male.png', },
	    { name: '陈小大',logo:'img/no_photo_female.png', },
	    { name: '陈小大',logo:'img/no_photo_male.png', },
]
function flowAddElem(){	
//		console.log('准备流加载中...')
		var a=$('#jobList').css('display')
		//判断是在哪个列表,触发流加载-插入元素
		if(a=='block'){
//			console.log('准备加载jobList中...')
			if (_company._data.comInfos.length<32) {
				_isFolwADDing=true;
				//生成load动画，禁止用户操作
				var	_indexLoad = layer.open({
				  		type: 3,
						title: false,
						offset: ['10rem', '42%'],
						shade: [0.5,'#fff'],
				  })

				console.time("耗时")//计算耗时用的-start
				//模拟插入，此处实际应为 ajax请求  //此处是一个会请求远程的ajax 异步操作;
				setTimeout(function() {	
					for(i=0;i<7;i++){
						_company._data.comInfos.push(_tmpData[i])
					}
					console.log(_company._data.comInfos)
					layer.close(_indexLoad)
					_isFolwADDing=false;
					console.log('加载完毕',_isFolwADDing)
					console.timeEnd("耗时")//计算耗时用的-end
				},1000)
			}else{
				console.log('超出列表长度！')
			}					
		}
		if(a=='none'){
			console.log('准备加载perList中...')
			if (_peason._data.perInfos.length<21) {
				_isFolwADDing=true;
				var	_indexLoad = layer.open({
				  		type: 3,
						title: false,
						offset: ['10rem', '42%'],
						shade: [0.5,'#fff'],
				  })
				console.time("耗时");//计算耗时用的-start
				//模拟插入，此处实际应为 ajax请求  //此处是一个会请求远程的ajax 异步操作;
				setTimeout(function() {	
					console.log('加载中...')
					for(i=0;i<4;i++){
						_peason._data.perInfos.push(_tmpData1[i])
					}
					console.log(_peason._data.perInfos)
					layer.close(_indexLoad)
					_isFolwADDing=false;
					console.log('加载完毕',_isFolwADDing)
					console.timeEnd("耗时")//计算耗时用的-end
				},1000)
				
			}else{
				console.log('超出列表长度！')
			}
		}
		
}

//function throttle(fun){
//      if(fun.timeoutId) {window.clearTimeout(fun.timeoutId);}
//      fun.timeoutId = window.setTimeout(function(){
//          fun();
//         fun.timeoutId = null;
//      }, 1000);
//  }






//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
//	capture: false,
//	passive: false
//} : false)
//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
//	capture: false,
//	passive: false
//} : false);

///
//		window.onload = function () {
//      document.querySelector("#roll1").onclick = function () {
//          document.querySelector("#roll_top").scrollIntoView(false);
//      };
//      document.querySelector("#roll2").onclick = function () {
//          document.querySelector("#roll_top").scrollIntoView(true);
//      };
// }