 // 浏览器通知//
 var markList = [
    'ubrowser', // UC
    'taobrowser', // 淘宝
    'lbbrowser', // 猎豹
    'qqbrowser', // QQ
    'maxthon', // 遨游
    'bidubrowser' // 百度
];

var mimeTypeList = [
    'application/vnd.chromium.remoting-viewer', // 360
    'application/sogou-native-widget-plugin' // 搜狗
]

function isChrome() {
    var ua = navigator.userAgent.toLowerCase();
    var mimeTypes = navigator.mimeTypes;
    return (ua.indexOf('chrome') !== -1)
        && !hasOtherMark(ua)
        && !isInMimeList(mimeTypes);
}

function hasOtherMark(ua) {
    var flag = false;
    $.each(
        markList,
        function (index, item) {
            if (ua.indexOf(item) !== -1) {
                flag = true;
                return false;
            }
        }
    );
    return flag;
}

function isInMimeList(mimeTypes) {
    var flag = false;
    while (mimeTypeList.length) {
        if (flag) {
            return flag;
        }
        var mimeType = mimeTypeList.pop();
        $.each(
            mimeTypes,
            function (index, item) {
                if (item.type.toLowerCase() === mimeType) {
                    flag = true;
                    return false;
                }
            }
        );
    }
    return flag;
}

 $(function(){
    if($.browser.msie) {
    // alert("这是IE"+$.browser.version);
    BrowerTip()
    }else if($.browser.opera) {
        BrowerTip()
    // alert("这是opera"+$.browser.version);
    }else if($.browser.mozilla){
        BrowerTip()
    // alert("这是mozilla"+$.browser.version);
    }else if($.browser.safa){
        BrowerTip()
    // alert("这是safa"+$.browser.version);
    }else if(isChrome()==true){
        // alert("这是谷歌"+isChrome())
    }else{
        BrowerTip()
        // alert("其他"+$.browser)
    };
});
function BrowerTip(){
    $('.header').prepend(`<div id="BrowerTips">
    <div class="notChrome" style="margin: 0px auto; width: 1200px; display: flex; justify-content: center; align-items: center;">
        <span style="font-size: 14px;">
                为了您更好的体验，建议使用“谷歌浏览器、火狐浏览器”访问，以获取最佳的浏览效果。<a style="color:#03a9f4" href="https://www.google.cn/intl/zh-CN/chrome/">点此下载谷歌浏览器</a>
        </span>
        <div id="BrowerTipClose"></div>
    </div>
</div>`)
$(document).on('click','#BrowerTipClose',function(){
    $('#BrowerTips').remove()
})
}
