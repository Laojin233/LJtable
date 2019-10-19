//切换大厅
//('.hall_company') 展示公司及职位
//('.hall_personal') 展示优秀毕业生
$('.change_hall input').on('click', function() {

	if(this.id == 'hall_personal') {
		//点击 招聘大厅 按钮时			
		$('.main_list-jobs').first().css('display', 'block')
		$('.main_list-person').first().css('display', 'none')
		//$('.change_hall').css("border-bottom","10px solid #e6f9f2")
		$('.hall_company').first().addClass('change_active_c')
		$('.hall_personal').first().addClass('change_active_b')
		$('.hall_company').first().removeClass('change_active_a')
		//改变搜索栏说明
		$('#search_input').attr('placeholder','输入期望的职位名称')
	} else {
		//点击 求职大厅 按钮时
		$('.main_list-jobs').first().css('display', 'none')
		$('.main_list-person').first().css('display', 'block')
		//$('.change_hall').css("border-bottom","10px solid #eaf4f8")
		$('.hall_company').first().addClass('change_active_a')
		$('.hall_personal').first().removeClass('change_active_b')
		$('.hall_personal').first().addClass('change_active_c')
		$('#search_input').attr('placeholder','输入想要查看的专业或求职者名称')
	}

})

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
	switch(arguments.length) {
		case 1:
			return parseInt(Math.random() * minNum + 1, 10);
			break;
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
			break;
		default:
			return 0;
			break;
	}
}
//随机人物
$(function() {
	for(i = 0; i < $('.img_boy').length; i++) {
		var girl = ".img_girl:eq(" + i + ")"
		var boy = ".img_boy:eq(" + i + ")"
		var path1 = 'img/boy_' + randomNum(1, 10) + '.png';
		var path2 = 'img/girl_' + randomNum(1, 10) + '.png';
		//      	 		console.log($(obj))
		$(boy).attr("src", path1);
		$(girl).attr("src", path2);

	}

})
//阻止默认行为

var test = 
function stopDefault( e )
{ 
   if ( e && e.preventDefault ) 
      e.preventDefault(); 
     else 
        window.event.returnValue = false;  
} 
$('.item_info_box a').onclick = function(e)
{ 
     stopDefault(e); 
} 
//------------Vue 动态绑定-------------//
var app = new Vue({
  el: '#main_list-jobs',
  data: {
   		 comInfos: [
	      { name: '广州市东洲有限公司',num:'20-99人'},
	      { name: '广州市西洲有限公司',num:'100-199人' },
	      { name: '广州市南洲有限公司',num:'10-30人' },
	      { name: '广州市北洲有限公司',num:'100-300人' },
	    ]
  },
  components:{
  //	call:RongCall.call
  }
})



//--------------------弹出层----------------------//
//小提示-1
layer.ready(function() {
	layer.tips('点击此处可切换大厅', '#hall_company', {
		time: 5000,
		tips: [2, '#3595CC'],
		tipsMore: true,
	});
})
//小提示-2
var _is_tips1 = 0;
$('#hall_company').on('click', function() {
	if(_is_tips1 == 0) {
		layer.tips('企业可在此大厅浏览优秀人才！', this, {
			time: 2000,
			tips: [2, '#3595CC']
		}); //在元素的事件回调体中，follow直接赋予this即可
		_is_tips1 = 1
	} else {}
});
//小提示-3
//规则tips
var tip_index = 0;
$(document).on('mouseenter', '.online-social-btn', function() {
	tip_index = layer.tips("<span style='color:#000'>在线聊天！</span>", this, {
		tips: [3, '#fff'],
		area: ['auto', 'auto'],
		tipsMore: true,
		time: 10000
	});
}).on('mouseleave', '.online-social-btn', function() {
	layer.close(tip_index);
});
$(document).on('mouseenter', '.video-btn', function() {
	tip_index = layer.tips("<span style='color:#000'>视频沟通！</span>", this, {
		tips: [3, '#fff'],
		area: ['auto', 'auto'],
		tipsMore: true,
		time: 10000
	});
}).on('mouseleave', '.video-btn', function() {
	layer.close(tip_index);
});
$(document).on('mouseenter', '.apply-jobs-btn', function() {
	tip_index = layer.tips("<span style='color:#000'>投递简历！</span>", this, {
		tips: [3, '#fff'],
		area: ['auto', 'auto'],
		tipsMore: true,
		time: 10000
	});
}).on('mouseleave', '.apply-jobs-btn', function() {
	layer.close(tip_index);
});

//---查看会议须知
$('.fair-info input').on('click', function() {
	//弹出一个iframe层
	layer.open({
		type: 2,
		title: false,
		shadeClose: true, //点击遮罩关闭层
		area: ['600px', '500px'],
		content: './iframe_notice.html',
		//		content:'http://baidu.com',
		//style: 'background-color:#09C1FF; color:#fff; border:none;',
		skin: 'layer-dudu-class',

	});

});

//---招聘简章
$('.item_info_fix').on('click', function() {
	//弹出一个iframe层
	layer.open({
		type: 1,
		title: false,
		//maxmin: true,
		shadeClose: true, //点击遮罩关闭层
		area: ['580px', '750px'],
		scrollbar:false,
		content:$('.layui-container'),
		skin: 'layer-dudu-class',

	});

});

//--视频/语音邀请弹窗--//
//调用 videoPopup() 出现弹窗
layer.ready(videoPopup())

$('#video_accept').onclick=function(){
	//这是视频邀请的  接听  按钮
}
	
$('#video_refuse').onclick=function(){
	//这是视频邀请的  挂断  按钮
}

function videoPopup() {
	var _count = 20
	var _timer = setInterval(function() {
		console.log(_count)
		$('#video_overTime').text(_count)
		if(_count == 20) {
			console.log(document.getElementsByClassName('layui-layer-content'))
			document.getElementsByClassName('layer_video_intive')[0].style.animation = 'doudong 0.5s infinite'
		}
		_count -= 1;
	}, 1000)
	var _yaoqing = layer.open({
		type: 1,
		title: false,
		closeBtn: 0, //不显示关闭按钮
		shade: false,
		skin: 'layer_video_intive',
		area: ['280px', 'auto'],
		offset: ['83%', '80%'], //右下角弹出
		time: 20000, //20秒后自动关闭
		anim: 2,
		content: $('#layer_video_intive'),
		//当弹窗消失会发生的事
		end: function() {
			clearInterval(_timer)
		}
	});
	//鼠标移入动画停止，移出继续
	document.getElementsByClassName('layer_video_intive')[0].onmouseover = function() {
		this.style.animationPlayState = 'paused'
	}
	document.getElementsByClassName('layer_video_intive')[0].onmouseout = function() {
		this.style.animationPlayState = ''
	} //好蠢的办法
}
//		content: 'http://baidu.com' //通过超链接访问
//		content: './iframe.html' //通过引入一个Html
// 		content:'\<\div style="padding:20px;">自定义内容\<\/div>'
//		content:$('#layui-layer-move')//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
//
//--------------------弹出层end----------------------//


//-----滚动公告
//var _d = -1050
//$(function() {
//	// 调用 公告滚动函数
//	setInterval(function() {
//		$('#roll_box').css("right", _d)
//		_d += 2;
//		if(_d >= 900) {
//			_d = -1050
//		}
//	}, 1000 / 30);
//});

////图表配置**
  var myDate = new Date;
  var year = myDate.getFullYear(); //获取当前年
  var mon = myDate.getMonth() + 1; //获取当前月
  var date = myDate.getDate()
var myChart = echarts.init(document.getElementById('main_1'));
var Chart_title=year + "年" + mon + "月" + date + "日"+'-实时数据'
option3 = {
	title:{
		text:Chart_title,
		left: 'center',
		top: 20,
		textStyle: {
			color: '#607d8b'
		}
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: { // 坐标轴指示器，坐标轴触发有效
			type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
		}
	},
	grid: {
		left: '0',
		right: '1%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: {
		type: 'value',
		splitNumber: 6,
	},
	yAxis: {
		type: 'category',
		data: ['面试邀请','参会企业', '在线企业', '在线人数', '求职人数']
	},
	series: [
		{
			//name: '求职人数',
			type: 'bar',
			stack: '总量',
			label: {
				normal: {
					show: true,
					position: 'insideRight'
				}
			},
			  itemStyle: {   
                //通常情况下：
                normal:{  
                     color: function (params){
                        var colorList = ['rgb(255,88,88)','rgb(42,170,227)','rgb(25,46,94)','#2dc1b7','#92dcd8'];
                        return colorList[params.dataIndex];
                    }
                },
                //鼠标悬停时：
                emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
           }, 
			data: [100, 258, 80, 1001, 2019,]
		}	
	]
}
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option3);