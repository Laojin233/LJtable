//显示邀请弹窗
function inviteShow() {
    var _count = 20
    var _timer = setInterval(function () {
        //console.log(_count)
        $('#video_overTime').text(_count)
        if (_count == 20) {
        	//console.log(document.getElementsByClassName('layui-layer-content'))
        	document.getElementsByClassName('layer_video_intive')[0].style.animation = 'doudong 0.5s infinite'
        }
        if (_count == 1) {
            layer.close(_yaoqing)
            layer.msg('超时，自动挂断');
            sendCloseVideoMsg("invite")
        }
        _count -= 1;
    }, 1000)
    $('#intiverLogo').attr('src',arguments[1])
    $('#intiverName').text(arguments[0])
    _yaoqing = layer.open({
        type: 1,
        title: false,
        closeBtn: 0, //不显示关闭按钮
        shade: false,
        skin: 'layer_video_intive',
        area: ['280px', 'auto'],
        offset: ['50%', '50%'], //右下角弹出
        time: 0, //20秒后自动关闭
        anim: 2,
        scrollbar: false,
        content: $('#layer_video_intive'),
        //当弹窗消失会发生的事
        end: function () {
            clearInterval(_timer)
            clearTimeout(_lastTimer)
        }
    });
    //关闭邀请弹窗
    // layer.close(_yaoqing)
    //鼠标移入动画停止，移出继续
    document.getElementsByClassName('layer_video_intive')[0].onmouseover = function () {
        this.style.animationPlayState = 'paused'
    }
    document.getElementsByClassName('layer_video_intive')[0].onmouseout = function () {
        this.style.animationPlayState = ''
    }

}
//显示视频
function videoShow(){
    console.log('运行了videoShow()显示视频',_tim_myselfId,'房间号',_tim_roomId)
    if(arguments){
        changeRemoteInfo(arguments[0],arguments[1])
    }else{}
    _callingWindow = layer.open({
        type: 1,
        title: false,
        closeBtn: 0, //不显示关闭按钮
        shade: [0.6, '#000'],
        skin: 'layer_video_calling',
        area: ['880px', '550px'],
        anim: 1,
        scrollbar: false,
        move:'.video_initiator_logo',
        content: $('#layer_video_calling'),
        success: function () {
            if (rtc){}
            else{
                const config = genTestUserSig(_tim_myselfId);
                rtc = new RtcClient({
                    userId:_tim_myselfId,
                    roomId:_tim_roomId,
                    sdkAppId: config.sdkAppId,
                    userSig: config.userSig
                });
                console.log(`创建了Client实例，uid=${_tim_myselfId},roomid=${_tim_roomId}`) 
            }
            console.log('房间号',_tim_roomId)
            rtc.join()
            _callingWindowThumb = layer.open({
                type: 1,
                title: false,
                closeBtn: 0, //不显示关闭按钮
                shade: false,
                skin: 'layer_video_thumb',
                area: ['180px', '120px'],
                offset: ['198px', '60.6%'],
                // offset:, //右下角弹出
                move: '.layui-layer-content',
                // moveOut:true,
                resize: false,
                anim: 0,
                scrollbar: false,
                content: $('#layer_videoCall_thumb'),
            })
        },
        //当弹窗消失会发生的事
        end: function () {
            rtc.leave();
            layer.close(_callingWindowThumb)
            rtc = null;
            console.log(rtc)
            layer.close(_resume)
            layer.close(_videoReady)
        }
    });
}

//这是视频通话中的挂断按钮
$(document).on('click', '#video_call_refuse', function () {
    sendCloseVideoMsg('video') 
    if(_callingWindow!=''){
        console.log('_callingWindow',_callingWindow)
        layer.close(_callingWindow)//关闭视频窗口
    }
    if(_voiceWindow!=''){
        console.log('_voiceWindow',_voiceWindow)
        layer.close(_voiceWindow)//关闭语音
    }	
    layer.msg('已挂断');
    layer.close(_resume)//关闭简历			
    _isBeauty=false;//重置美颜
    _isProhibitions=false;//重置静音
    $('.video_prohibitions').css('background-color', 'rgba(0, 0, 0, 0.6)')
});

//视频通话中的静音按钮
$(document).on('click', '#video_prohibitions', function () {
    if (_isProhibitions) {
        layerMsg('取消静音');
        $('.video_prohibitions').css('background-color', 'rgba(0, 0, 0, 0.6)')
        _isProhibitions = false
    }
    else {
        layerMsg('静音');
        $('.video_prohibitions').css('background-color', '#5FB878')
        _isProhibitions = true
    }
});

$(document).on('click', '#video_beauty', function () {
    if (_isBeauty) {
        layerMsg('切换到视频通话')
        // $('#video_beauty').css('background-color', 'rgba(0, 0, 0, 0.6)')//背景变绿	
        layer.close(_voiceWindow)//关闭语音窗口
        layer.close(_resume)//关闭简历
        // video.videoShow()
        _isProhibitions=false;//重置静音
        $('.video_prohibitions').css('background-color', 'rgba(0, 0, 0, 0.6)')
        _isBeauty = false;
        
    }
    else {
        layerMsg('切换到语音通话')
        // $('#video_beauty').css('background-color', '#5FB878')
        layer.close(_callingWindow)//关闭视频窗口
        layer.close(_resume)//关闭简历
        // video.voiceShow()
        _isProhibitions=false;//重置静音
        $('.video_prohibitions').css('background-color', 'rgba(0, 0, 0, 0.6)')
        _isBeauty = true
    }
});

//接受视频邀请
$(document).on('click', '#video_accept', function () {
    //这是视频邀请的  接听  按钮
    layer.close(_yaoqing)
    if (rtc){} 
    else{
        const config = genTestUserSig(_tim_myselfId);
        rtc = new RtcClient({
            userId:_tim_myselfId,
            roomId:_tim_roomId,
            sdkAppId: config.sdkAppId,
            userSig: config.userSig
        });
        console.log(`创建了Client实例，uid=${_tim_myselfId},roomid=${_tim_roomId}`) 
    }
    let message = _tim.createCustomMessage({
        to: _tim_remoteId,//对方ID
        conversationType: TIM.TYPES.CONV_C2C,
        payload: {
        data:'acceptVideo', 
        description:'',
        extension:""
        }
    });
    // 3. 发送消息
    let promise = _tim.sendMessage(message);
    videoShow()
});

//拒绝视频邀请
$(document).on('click', '#video_refuse', function () {
    layer.msg('拒绝了对方的视频邀请');
    sendCloseVideoMsg('invite')
    layer.close(_yaoqing)//关闭邀请弹窗
});

function layerMsg(){
    _callWinTip=layer.msg(arguments[0],{
        time:arguments[1]===0?0:arguments[1]||1000,
        area:['auto','1.9em'],
        skin:'layer_video_tip',
        offset:MsgbindDom($('.layer_video_btns'),arguments[0])
    })
}
function sendCloseVideoMsg(type){
    //type=0为拒绝视频邀请;
    //type=1为挂断视频;
    // 创建消息实例，接口返回的实例可以上屏
    console.log(`由${_tim_myselfId}发往${_tim_remoteId}，type${type}`)
    let message = _tim.createCustomMessage({
        to: _tim_remoteId,//对方ID
        conversationType: TIM.TYPES.CONV_C2C,
        payload: {
        data:'closeVideo', 
        description:type,
        extension:""
        }
    });
    // 3. 发送消息
    let promise = _tim.sendMessage(message);
    promise.then(function(imResponse) {
    // 发送成功
        console.log('sendMessage 成功:', imResponse.data.message.payload);
    }).catch(function(imError) {
    // 发送失败
    console.warn('sendMessage error:', imError);
    });
}
function changeRemoteInfo(userName,img){
    console.log('对方的信息',userName,img)
    $('#remoteLogo').attr("src",img)
    $('#remoteName').text(userName) 
}