//切换大厅
//('.hall_company') 展示公司及职位
//('.hall_personal') 展示优秀毕业生
$('.change_hall input').on('click',function(){
	
	if(this.id=='hall_personal') {
		//点击 招聘大厅 按钮时			
		$('.main_list-jobs').first().css('display','block')		
		$('.main_list-person').first().css('display','none')
		$('.hall_company').first().addClass('change_active_c')
		$('.hall_personal').first().addClass('change_active_b')
		$('.hall_company').first().removeClass('change_active_a')
	} else{
		//点击 求职大厅 按钮时
		$('.main_list-jobs').first().css('display','none')		
		$('.main_list-person').first().css('display','block')
		$('.change_hall').css("border-bottom","10px solid #eaf4f8")
		$('.hall_company').first().addClass('change_active_a')
		$('.hall_personal').first().removeClass('change_active_b')
		$('.hall_personal').first().addClass('change_active_c')
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


//--------------------弹出层----------------------//
//小提示-1
window.onload=function() {
	layer.tips('点击此处可切换大厅','#hall_company',{
		time:5000,
		tips: [2, '#3595CC'],
//		cancel:true,
//		shade: [0.1,'#fff'],
//		style:'background-color:#09C1FF',
	});
  
}
//小提示-2
var _is_tips1=0;
$('#hall_company').on('click', function(){
	console.log(this.checked)
	if(_is_tips1==0){
		 layer.tips('企业可在此大厅浏览优秀人才！', this,{
		  	time:2000,
		  	tips:[2,'#3595CC']
		  }); //在元素的事件回调体中，follow直接赋予this即可
		_is_tips1=1
	}else{ 
	}
});
//查看会议须知
$('.fair-info input').on('click', function() {
	//弹出一个iframe层
	layer.open({
		type: 2,
		title: false,	
		//maxmin: true,
		shadeClose: true, //点击遮罩关闭层
		area: ['600px', '500px'],
		// content: '\<\div style="padding:20px;">自定义内容\<\/div>',
		content: './iframe_notice.html',
//		content:'http://baidu.com',
		//style: 'background-color:#09C1FF; color:#fff; border:none;',
		skin: 'layer-dudu-class',
		
	});

});

//招聘简章
$('.item_info_fix').on('click', function() {
	//弹出一个iframe层
	layer.open({
		type: 2,
		title: false,	
		//maxmin: true,
		shadeClose: true, //点击遮罩关闭层
		area: ['580px', '750px'],
		// content: '\<\div style="padding:20px;">自定义内容\<\/div>',
		content: './iframe.html',
//		content:'http://baidu.com',
		//style: 'background-color:#09C1FF; color:#fff; border:none;',
		skin: 'layer-dudu-class',
		
	});

});
//--------------------弹出层end----------------------//
//		content: 'http://baidu.com' //通过超链接访问
//		content: './iframe.html' //通过引入一个Html
//		content:$('#layui-layer-move')//这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
//var initCode = $("#initCode").val();
//      if(initCode == "0") {
//          console.log($("#initMsg").val());
//      }
//
//      var alertId = $("#alertId").val();
//      var loginType = $("#loginType").val();
//      var mId = $("#meetingId").val();
//      if (alertId == "appointmentMeeting" && loginType == "3") {
//      	var loginUserId = $("#loginUserId").val();
//      	$.ajax({
//              type: 'post',
//              data: {'eId':loginUserId, 'mId':mId},
//              dataType: 'json',
//              url: '/schoolreception/cloudCompany/queryReserve',
//              success: function (data) {
//                  if (data.code == 200) {
//                  	if (data.body) {
//                  		appointmentMeeting(mId,false,'company');
//                      	$("#alertId").val("");
//                  	}
//                  }
//              }
//          });
//      }
// 
// function showLayuiOpen(url, width, height, classname) {
//          layer.open({
//              type: 2,
//              title: false,
//              area: [width, height],
//              fixed: false, //不固定
//              content: url,
//              maxmin: false,
//              resize: false,
//              skin: classname
//          });
//      }
    
//$('.more-btn input').on('click', function() {
//	//弹出一个iframe层
//	layer.open({
//		type: 2,
//		title: false,											      
//		//maxmin: true,
//		shadeClose: true, //点击遮罩关闭层
//		area: ['550px', '750px'],
////		 content: 'http://baidu.com' //
//	});
//
//});


//弹出一个页面层
$('#test2').on('click', function() {

});

//弹出一个loading层
$('#test4').on('click', function() {
	var ii = layer.load();
	//此处用setTimeout演示ajax的回调
	setTimeout(function() {
		layer.close(ii);
	}, 1000);
});

//弹出一个tips层
$('#test5').on('click', function() {
	layer.tips('Hello tips!', '#test5');
});

//滚动公告
//console.log($('#realtime_data span').length)
//	var _rightValue=-70;
//for (i=0;i<$('#realtime_data span').length;i++) {
//	var str="#realtime_data span:eq("+i+")"
//	var item=$(str)
//	console.log(item.text())
//	item.css('right',_rightValue-=30)
//}

function noticeUp(obj, value, time) {
	$(obj).animate({
		right: value
	}, time, function() {
		$(this).css({ right: "-1050px" }).appendTo(this);
	})
};
var _d = -1050

$(function() {
	// 调用 公告滚动函数
	setInterval(function() {
		$('#roll_box').css("right", _d)
		_d += 2;
		if(_d >= 900) {
			_d = -1050
		}
	}, 1000 / 30);
});

//var msg = $('#realtime_data span').first()
//var s=0
// setInterval(
// 	function(){
// 		if (msg.css('left')==(-120)) {
// 			console.log(xxx)
// 		}
// 	msg.css('left',s) 
// 	s-=3;
// 	console.log(msg.)
// 	}
// ,100)