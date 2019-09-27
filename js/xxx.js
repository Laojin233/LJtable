"use strict";
var stuEdu, comOnLine = false,
	stuOnLine = false;
$(function() {
	/*
    layui.use('form', function () {
        var form = layui.form;
        form.on('switch(switchTest)', function (data) {
            comOnLine = data.elem.checked;
            serchInfo(1);
        })
        form.on('switch(switchTest1)', function (data) {
            stuOnLine = data.elem.checked;
            serchInfo(2);
        })
    });
	*/
	$('.nocheckcom').click(function() {
		$(this).hide()
		comOnLine = true
		serchInfo(1);
		$('.checkcom').show()
	})
	$('.checkcom').click(function() {
		$(this).hide()
		comOnLine = false
		serchInfo(1);
		$('.nocheckcom').show()
	})
	$('.nocheckstu').click(function() {
		$(this).hide()
		stuOnLine = true
		serchInfo(2);
		$('.checkstu').show()
	})
	$('.checkstu').click(function() {
		$(this).hide()
		stuOnLine = false
		serchInfo(2);
		$('.nocheckstu').show()
	})

	$('.register_on').hover(function() {
		$('.register_on_list').show()
	}, function() {
		//	$('.register_on_list').hide()
	});
	$('.register_on_list').hover(function() {
		$('.register_on_list').show()
	}, function() {
		$('.register_on_list').hide()
	});

	var $body = $("body")
	window.togglerView = function(viewMode) {
		$(".mode-switcher,.companyList,.studentList").attr("view-mode", viewMode);
		$("body").trigger("view-toggle", viewMode)
		if(viewMode == 2) {
			serchInfo(2);
		} else {
			serchInfo(1);
		}
	};
	if($('#loginType').val() == 3) {
		togglerView(2)
	} else {
		togglerView(1);
	}

	var $tbox = $(".site-title");
	var $tx = $tbox.find(".text");
	$(window).resize(function(_) {
		$tx.css({
			transform: "translate(-50%,-50%) scale(" + $tbox.width() / 1260 + ")"
		});
	}).resize();

	var vm1 = new Vue({
		el: '#vm1',
		data: {
			searchType: ""
		},
		watch: {
			searchType: function(type) {
				stuEdu = type;
				//$("#vm1").trigger(serchInfo())
				$body.trigger("searchTypeChange", type);
			}
		}
	});

	//鍒锋柊
	$(".renovate").click(function() {

		serchInfo(1);

		serchInfo(2);

	});

	$("#send_msg_text").keyup(function(event) {
		if(event.keyCode == '13') {
			onSendMsg();
		}
	});
});

var vm_title = new Vue({
	el: "#vm_title",
	data: {
		title: "",
		mqMode: false,
		txWidth: 0,
		optionLeft: {
			direction: 2,
			limitMoveNum: 2
		}
	},

	computed: {
		titleLs: function titleLs() {
			var m = this;
			var n = 3,
				ret = [];
			while(n--) {
				ret.push({ label: m.title });
			}
			return ret;
		}
	},
	mounted: function mounted() {
		var m = this;
		var $tx = $(m.$refs.tx);

		// $tx.css({marginLeft: - $tx.width()/2})

		var $el = $(m.$el);

		$(window).resize(function(_) {
			m.mqMode = $tx.width() > $el.width();
		}).resize();

		m.txWidth = $tx.width();

		m.title = $tx.text();
	}
});

Vue.component("mq", {
	template: "\n        <div ref=\"wrap\" class=\"wrap mq-allen-comp\">\n            <div ref=\"content\" class=\"content\" :class=\"animationClass\" :style=\"contentStyle\" @animationend=\"onAnimationEnd\" @webkitAnimationEnd=\"onAnimationEnd\">\n                <slot></slot>\n            </div>\n        </div>\n    ",
	props: {
		content: {
			default: ''
		},
		delay: {
			type: Number,
			default: 0.5
		},
		speed: {
			type: Number,
			default: 100
		}
	},
	mounted: function mounted() {},
	data: function data() {
		return {
			wrapWidth: 0, //鐖剁洅瀛愬搴�
			firstRound: true, //鍒ゆ柇鏄惁
			duration: 0, //css3涓€娆″姩鐢婚渶瑕佺殑鏃堕棿
			offsetWidth: 0, //瀛愮洅瀛愮殑瀹藉害
			animationClass: '' //娣诲姞animate鍔ㄧ敾
		};
	},

	computed: {
		contentStyle: function contentStyle() {
			return {
				//绗竴娆′粠澶村紑濮�,绗簩娆″姩鐢荤殑鏃跺€欓渶瑕佷粠鏈€鍙宠竟鍑烘潵鎵€浠ュ搴﹂渶瑕佸鍑虹埗鐩掑瓙鐨勫搴�
				paddingLeft: (this.firstRound ? 0 : this.wrapWidth) + 'px',
				//鍙湁绗竴娆＄殑鏃跺€欓渶瑕佸欢杩�
				animationDelay: (this.firstRound ? this.delay : 0) + 's',
				animationDuration: this.duration + 's'
			};
		}
	},
	watch: {
		content: {
			immediate: true,
			//鐩戝惉鍒版湁鍐呭,浠庡悗鍙拌幏鍙栧埌鏁版嵁浜�,寮€濮嬭绠楀搴�,骞惰绠楁椂闂�,娣诲姞鍔ㄧ敾
			handler: function handler(ct) {
				var _this = this;

				if(!ct) return;
				this.$nextTick(function() {
					var _$refs = _this.$refs,
						wrap = _$refs.wrap,
						content = _$refs.content;

					var wrapWidth = wrap.getBoundingClientRect().width;
					var offsetWidth = content.getBoundingClientRect().width;
					_this.wrapWidth = wrapWidth;
					_this.offsetWidth = offsetWidth;
					_this.duration = offsetWidth / _this.speed;
					_this.animationClass = 'animate';
				});
			}
		}
	},
	methods: {
		//杩欎釜鍑芥暟鏄涓€娆″姩鐢荤粨鏉熺殑鏃跺€�,绗竴娆℃病鏈変娇鐢╥nfinite,绗竴娆″姩鐢绘墽琛屽畬鎴愬悗寮€濮嬩娇鐢ㄦ坊鍔燼nimate-infinite鍔ㄧ敾
		onAnimationEnd: function onAnimationEnd() {
			this.firstRound = false;
			//杩欐槸鏃跺€欐牱寮忓鍑轰簡padding-left:this.wrapWidth;鎵€浠ヨ鎯抽€熷害涓€鏍烽渶瑕侀噸鏂拌绠楁椂闂�
			this.duration = (this.offsetWidth + this.wrapWidth) / this.speed;
			this.animationClass = 'animate-infinite';
		}
	}
});

//涓嬫粦鍔犺浇
! function(_) {
	var viewMode = 1;
	$("body").on("view-toggle", function(e, data) {
		viewMode = data;
		loadNext();
	});

	var $win = $(window);
	var $doc = $(document);
	var $d = 12;

	var isToBottom = function() {
		return scrollY + $win.height() > $doc.height() - $d;
	}

	var loadNext = _.debounce(function() {

		if(!isToBottom()) {
			return;
		}

		var list = dataList[viewMode];

		if(!list.length) {
			console.log("yijig quan jaizai ")
			return;
		}

		_.each(list.shift(), function(el) {

			$(el).show();
		});

		loadNext();

	}, 270)

	var dataList = [
		"",
		_.chunk($("._main>.view1>.item").hide().toArray(), 3),
		_.chunk($("._main>.view2>.ls .item").hide().toArray(), 3)
	]

	$win.scroll(loadNext)
	$win.resize(loadNext)

	loadNext();

}(_$)

function showYQH() {
	layer.open({
		type: 1,
		skin: 'layui-layer-nobg', //娌℃湁鑳屾櫙鑹�
		closeBtn: 0, //涓嶆樉绀哄叧闂寜閽�
		anim: 2,
		title: false,
		area: ['700px', '500px'], //瀹介珮
		shadeClose: true, //寮€鍚伄缃╁叧闂�
		content: $("#meetingYQH")
	});
}

//寮瑰嚭灞�  浼佷笟鎷涜仒绠€绔�
function bg(id, name) {
	$.ajax({
		url: 'company/recruitmentPost',
		data: {
			id: id
		},
		dataType: 'html',
		success: function(html) {
			//鍦ㄨ繖閲岄潰杈撳叆浠讳綍鍚堟硶鐨刯s璇彞
			layer.open({
				type: 1,
				skin: 'layui-layer-nobg', //娌℃湁鑳屾櫙鑹�
				closeBtn: 1, //涓嶆樉绀哄叧闂寜閽�
				anim: 2,
				title: false,
				area: ['580px', '90vh'], //瀹介珮
				shadeClose: true, //寮€鍚伄缃╁叧闂�
				content: html //a(id, name)
			});
		}
	});
	return;
	//鍦ㄨ繖閲岄潰杈撳叆浠讳綍鍚堟硶鐨刯s璇彞
	layer.open({
		type: 2,
		skin: 'layui-layer-nobg', //娌℃湁鑳屾櫙鑹�
		closeBtn: 1, //涓嶆樉绀哄叧闂寜閽�
		anim: 2,
		title: false,
		area: ['580px', '90vh'], //瀹介珮
		shadeClose: true, //寮€鍚伄缃╁叧闂�
		content: html //a(id, name)
	});

	function a(id, name) {
		var loginType = $("#loginType").val();
		var html = '<img src="img/22.png" class="layImg">';
		html += '<div class="layTitle">鎷涜仒绠€绔�</div>';
		var mid = $("#meetingId").val();
		$.ajax({
			method: 'POST',
			async: false,
			url: 'getEnterpriseJobInfo',
			data: {
				'etsId': id,
				'mId': mid
			},
			dataType: 'json',
			success: function(res) {
				if(res.code == 200) {
					res = res.body;
					var recruitmentBrief = res.recruitmentBrief;
					var collect = res.collectList ? res.collectList : 0;
					html += '<div class="layContant">';
					if($("#loginType").val() == 4)
						html += '<div id="ets_' + id + '" style="float:right;font-size:1.4vh;font-family:MicrosoftYaHei;font-weight:400;color:rgba(51,51,51,1);">' + collectBtn(id, mid, 'ets', collect.isCollect) + '</div>';
					else
						html += '<div style="float:right;font-size:1.4vh;font-family:MicrosoftYaHei;font-weight:400;color:rgba(51,51,51,1);"></div>';
					html += '<p style="font-size: 14px;font-family:MicrosoftYaHei;font-weight:400;color:rgba(51,51,51,1);line-height: 26px;">&nbsp;&nbsp;<span style="font-size: 16px;font-family:MicrosoftYaHei-Bold;font-weight:bold;color:rgba(66,107,87,1);">' + name + '</span><br>'
					var str = replaceStr(recruitmentBrief.nature, '') + '</span>' + replaceStr(recruitmentBrief.nature, '', ' | ') + '<span>' + replaceStr(recruitmentBrief.unitSize, '') + '</span>' + replaceStr(recruitmentBrief.unitSize, '', ' | ') + '<span>' + replaceStr(recruitmentBrief.industryName, '') + "";
					if(str.lastIndexOf(" | ") == str.length - " | <span>".length) {
						str = str.replace(/(.*)\|/, '$1');
					}
					html += '&nbsp;&nbsp;<span>' + str + '</span></br>'
					html += '&nbsp;&nbsp;<span>' + isNull(recruitmentBrief.address) + '</span></p>'
					html += '<p id="wst" style="margin-top:10px;line-height: 18px;"><span style="padding:0.5vh 1vh;background:rgba(66,107,87,1);font-size:1.4vh;color:rgba(255,255,255,1);">浼佷笟绠€浠�</span><br/><br/>' + bb(recruitmentBrief.enterpriseInfo, id) + '</p>';
					html += '<div id="wst1" style="margin-top:10px;line-height: 18px;"><span style="padding:0.5vh 1vh;background:rgba(66,107,87,1);font-size:1.4vh;color:rgba(255,255,255,1);">浼佷笟绠€浠�</span><br/><br/>' + isNull(recruitmentBrief.enterpriseInfo) + '<div class="zpjznone" onclick="zpjznone()">鏀惰捣</div></div>'
					html += '<span style="padding:0.5vh 1vh;background:rgba(66,107,87,1);font-size:1.4vh;color:rgba(255,255,255,1);">鎷涜仒鑱屼綅</span><br>'
					var img = recruitmentBrief.enterpriseImg;
					if(img == null || img == "") {
						img = "static/imgs/cloud/company_logo.png";
					} else {
						img = "xcimg/" + img;
					}
					var jobList = res.jobList;
					for(var i = 0; i < jobList.length; i++) {
						var job = jobList[i];
						html += "<div style='font-size: 1.4vh;border-bottom:1px solid rgba(175,222,206,1);margin-top:2vh'><p  style='margin-top:1vh;color:rgba(73,119,96,1);'>" +
							"<a style='color:rgba(73,119,96,1);' onclick='jobInfo1(" + JSON.stringify(job) + ",\"" + recruitmentBrief.userId + "\",\"" + recruitmentBrief.enterpriseName + "\",\"" + job.jobId + "\")'><b>" + job.jobName + "</b></p></a>";
						html += "<p style='height:3vh'><span style='float:left'>";
						var money = job.moneyRangeId;
						if(money == '1') {
							money = "2k-4k";
						} else if(money == '2') {
							money = "4k-6k";
						} else if(money == '3') {
							money = "6k-8k";
						} else if(money == '4') {
							money = "8k-10k";
						} else if(money == '12') {
							money = "10K浠ヤ笂";
						} else {
							money = "闈㈣";
						}
						html += money + "&nbsp;|&nbsp;";
						html += job.jobNature + "&nbsp;|&nbsp;";
						html += job.educationBackground + "&nbsp;|&nbsp;";
						html += "鎷�" + job.recruitingNumbers + "浜�";
						html += "</span>";
						html += "<img src='img/mssq.png' style='float:right;width:90px;height:30px;" + (loginType == 3 ? "cursor: no-drop" : " ") + "' onclick='sendVideo1(\"" + id + "\", 1,\"" + name + "\",\"" + img + "\", \"" + job.jobId + "\")' />";
						html += "<p>" + isNull(job.positionTempt) + "</p>"
						html += "</p></div>";
						/*html += "<p>鍙戝竷鏃堕棿锛�" + job.createTime + "</p>";*/

					}
					html += '</div>';
				} else {
					html += '<div class="layContant"></div>';
				}

			},
			error: function() {},
		});
		return html;
	}

	function bb(value, eId) {
		var html = "";
		if(value != null) {
			//value = value.replace(/\s*/g, "").replace(/@/g, "\\@").replace(/\./g, "\\.").replace(/\(/g,"\\(").replace(/\)/g,"\\)");
			// try{
			//     value = $(value).text() == ''? value : $(value).text();
			// }catch(err){
			value = value.replace(/</g, '&lt').replace(/>/g, '&gt');
			//}
			// 棰勫畾鐨勫瓧绗︿覆
			var saveNum = 100;

			var inner = value;
			// 鍘荤┖鏍间袱涓や箣闂村彧鐣欐湁涓€涓┖鏍�
			var str = inner.split('');
			for(var i = 0; i < str.length; i++) {
				if(str[i] == ' ') {
					str.splice(i, 1);
				}
			}
			// 鍘诲畬绌烘牸涔嬪悗鐨剆tring
			var newStr = str.join('');
			var len = newStr.length;
			// 澶т簬淇濈暀鐨勫瓧绗︽椂鏄剧ず鏌ョ湅鏇村鎴�...
			if(len >= saveNum) {
				html = newStr.slice(0, saveNum) + "... &nbsp;&nbsp; ";
			} else {
				html = newStr;
			}
		} else {
			html = "(鏆傛棤)";
		}
		html += "<div class='zpjzmore' onclick='zpjzmore()'>鏌ョ湅鏇村></div>"
		return html
	}
}
// 鎷涜仒绠€绔狅紝 鏀惰棌锛屽彇娑堟敹钘忔寜閽紝
function collectBtn(id, mid, type, isCollect) {
	var html = "";
	if(isCollect) {
		html = '<a href="javascript:changeCollect(\'' + id + '\',\'' + mid + '\',\'' + type + '\',0);" style="display: flex;justify-content: center;align-items: center;"><img src="img/companyLike.png" style="width:21px;height:21px;"><span>鍙栨秷鏀惰棌</span></a>';
	} else {
		html = '<a href="javascript:changeCollect(\'' + id + '\',\'' + mid + '\',\'' + type + '\',1);" style="display: flex;justify-content: center;align-items: center;" ><img src="img/companyUnlike.png" style="width:21px;height:21px;"><span>鏀惰棌</span></a>';
	}
	return html;
}

// 鏀惰棌|鍙栨秷鏀惰棌锛屼簨浠跺鐞�
function changeCollect(id, mid, type, isCollect) {
	var ajax_data = '';
	if(type == 'ets')
		ajax_data = { 'etsId': id, 'mId': mid, 'isCollect': isCollect };
	else if(type == 'job')
		ajax_data = { 'jobId': id, 'mId': mid, 'isCollect': isCollect };
	var isCollect = isCollect;
	$.ajax({
		type: 'post',
		data: ajax_data,
		dataType: 'json',
		url: 'collectEnterpriseOrJob',
		success: function(data) {
			if(data.code == 200) {
				var getType = '';
				if(type == 'ets')
					getType = 'ets_' + id;
				else if(type == 'job')
					getType = 'job_' + id;
				if(isCollect) {
					$("#" + getType + "").html('<a href="javascript:changeCollect(\'' + id + '\',\'' + mid + '\',\'' + type + '\',0);"><img src="img/companyLike.png" style="widrh:2.1vh;height:2.1vh;">鍙栨秷鏀惰棌</a>');
				} else
					$("#" + getType + "").html('<a href="javascript:changeCollect(\'' + id + '\',\'' + mid + '\',\'' + type + '\',1);""><img src="img/companyUnlike.png" style="widrh:2.1vh;height:2.1vh;">鏀惰棌</a>');
			}
		}
	});
}

function isNull(data) {
	if(data == null || data == "") {
		return "(鏆傛棤)";
	} else {
		return data;
	}
}

function zpjzmore() {
	$('#wst').hide();
	$('#wst1').show();
	$('.zpjzmore').hide();
}

function zpjznone() {
	$('#wst').show();
	$('#wst1').hide();
	$('.zpjzmore').show();
}

function getJobList(id, type, name, headurl) {
	console.log('aa');
	var loginType = $("#loginType").val();
	console.log(loginType)
	if(loginType == null || loginType == "") {
		if(type == 2) {
			showLoginQrcode("company");
		} else {
			showLoginQrcode("student");
		}
		return;
	}
	if(loginType == 4 && type == 2) {
		layer.msg("褰撳墠鐢ㄦ埛涓嶈兘瀵瑰鐢熷彂璧烽個绾﹂潰璇�");
		return;
	}

	if(loginType == 3 && type == 1) {
		layer.msg("褰撳墠鐢ㄦ埛涓嶈兘瀵逛紒涓氳繘琛岀敵璇烽潰璇�");
		return;
	}

	var meetingIsStrat = $("#meetingIsStrat").val();
	if(meetingIsStrat != 1) {
		layer.msg("褰撳墠缃戠粶浼氭湭鍦ㄥ紑濮嬫湡闂达紒");
		return;
	}

	var eId = id; // 瀛︾敓鐐瑰嚮浼佷笟
	if(type == 2) { // 浼佷笟鐐瑰嚮瀛︾敓
		eId = $("#loginUserId").val();
	}
	$.ajax({
		method: 'POST',
		url: 'getCompanyJobList',
		data: {
			'eId': eId,
			'mId': $("#meetingId").val()
		},
		dataType: 'json',
		success: function(res) {
			if(res.code != 200) {
				layer.msg(res.msg);
				return;
			}
			res = res.body;
			var ul = $("#jobNameList").find("ul");
			ul.html("");
			for(var index in res) {
				var info = res[index];
				ul.append(
					'<li class="cnm">' +
					'<div class="radio">' +
					'<label>' +
					'<input type="radio" name="jobName" value="' + info.job_id + '" style="margin-top: 1.6vh;"/>' + info.job_name + '</label>' +
					'</div></li>'
				);
			}
			$("#semdVideo").attr("onclick", "sendVideo('" + id + "', " + type + ",'" + name + "','" + headurl + "')");

			layer.open({
				type: 1,
				skin: 'layui-layer-nobg', //娌℃湁鑳屾櫙鑹�
				closeBtn: 0, //涓嶆樉绀哄叧闂寜閽�
				anim: 2,
				title: false,
				area: ['520px', '340px'], //瀹介珮
				shadeClose: true, //寮€鍚伄缃╁叧闂�
				content: $("#jobNameList")
			});
		},
		error: function() {},
	});

}

/**
 * 鑾峰彇浼佷笟鍦ㄦ嫑鑱屼綅
 * @returns
 */
function getJobSelect(selectId) {
	$.ajax({
		method: 'POST',
		url: 'getCompanyJobList',
		data: {
			'eId': $("#loginUserId").val(),
			'mId': $("#meetingId").val()
		},
		dataType: 'json',
		success: function(res) {
			if(res.code != 200) {
				layer.msg(res.msg);
				return;
			}
			res = res.body;
			var jobId = $("#jobId").val()
			var select = $("#" + selectId);
			select.attr("onchange", "selectOnChange(this,'" + selectId + "Text')");
			select.empty();
			select.append('<option value="">--璇烽€夋嫨--</option>');
			for(var index in res) {
				var info = res[index];
				if(jobId == info.jobId) {
					select.append('<option value="' + info.jobId + '" selected>' + info.workPositionsName + '</option>');
				} else {
					select.append('<option value="' + info.jobId + '">' + info.workPositionsName + '</option>');
				}
			}
			selectOnChange(select.html(), selectId + "Text")
		},
		error: function() {},
	});
}

function selectOnChange(tag, nameTag) {
	var text = $(tag).find("option:selected").text();
	$("#" + nameTag).val(text);
}

var indextagId
// 閫氱煡澶嶈瘯锛岄€氱煡褰曠敤
function openResumeResult(tagId, stuId, jobId) {
	var action = 'sendInterview';
	if(tagId == 'msResulttzms') {
		action = 'sendInterview';
	} else if(tagId == 'msResulttzly') {
		action = 'sendOffer';
	} else if(tagId == 'msResultbhs3') { // 闈㈣瘯鏈€氳繃
		action = 'sendRefuse';
	} else if(tagId == 'msResultbhs1') { // 绠€鍘嗘湭閫氳繃
		action = 'sendRefuse';
	}

	$.ajax({
		url: 'talents/' + action,
		data: {
			stuId: stuId,
			mId: $("#meetingId").val()
		},
		dataType: 'html',
		success: function(html) {
			//$("#"+tagId).html(html);
			indextagId = layer.open({
				type: 1,
				skin: 'layui-layer-nobg', //娌℃湁鑳屾櫙鑹�
				closeBtn: 0, //涓嶆樉绀哄叧闂寜閽�
				anim: 2,
				title: false,
				area: ['550px', ''], //瀹介珮
				shadeClose: true, //寮€鍚伄缃╁叧闂�
				content: html,
				success: function(layero, index) {
					if(action == 'sendInterview') {
						laydate.render({
							elem: '#interviewTime' //鎸囧畾鍏冪礌
								,
							type: 'datetime',
							trigger: 'click',
							isInitValue: false,
							format: 'yyyy-MM-dd HH:mm'
						});
					} else if(action == 'sendOffer') {
						laydate.render({
							elem: '#entryTime' //鎸囧畾鍏冪礌
								,
							type: 'datetime',
							trigger: 'click',
							isInitValue: false,
							format: 'yyyy-MM-dd HH:mm'
						});
					} else if(action == 'sendRefuse') {
						$(".reason-options input[type='checkbox']").unbind();
						$(".reason-options input[type='checkbox']").on("change", function() {
							if(4 == $(".reason-options input[type='checkbox']:checked").length) {
								layer.alert("鏈€澶氶€夋嫨涓夐」", { icon: 2 });
								$(this).prop("checked", false);
							}
							if($(this).val() == '鍏朵粬') {
								if($(this).prop("checked")) {
									$(this).siblings("input[type='text']").attr("disabled", false);
								} else {
									$(this).siblings("input[type='text']").attr("disabled", true);
								}
							}
						});
					}
				},
				end: function() {

				},
			});
		}
	});

	return;

	if(stuId != null) {
		var form = document.getElementById("msResulttzlyForm");
		if(tagId == "msResulttzly") {
			$.ajax({
				type: 'get',
				data: { 'etsId': $("#loginUserId").val() },
				url: '/schoolreception/cloudEnterpriseProfile/load',
				dataType: 'json',
				success: function(data) {
					if(data.code == 200) {
						var address = replaceStr(data.body.address, "");
						form.entryAddress.value = address;
					}
				}
			});
		} else if(tagId == "msResulttzms") {
			form = document.getElementById("msResulttzmsForm");
			$.ajax({
				type: 'get',
				data: { 'etsId': $("#loginUserId").val() },
				url: '/schoolreception/cloudEnterpriseProfile/load',
				dataType: 'json',
				success: function(data) {
					if(data.code == 200) {
						data = data.body;
						var address = replaceStr(data.address, "");
						var HRname = replaceStr(data.hrAdmin, "");
						var HRphone = replaceStr(data.hrPhone, "");
						form.interviewAddress.value = address;
						form.HRphone.value = HRphone;
						form.HRname.value = HRname;
					}
				}
			});
		}

		form.stuId.value = stuId;
		form.mId.value = $("#meetingId").val();
		form.jobId.value = jobId;
		form.jobName.value = $(form.jobId).find("option:selected").text();
		$("#tzmsStuName").html($("#stuName").val() + "鍚屽锛�");
		$("#tzlyStuName").html($("#stuName").val() + "鍚屽锛�");
	}

	indextagId = layer.open({
		type: 1,
		skin: 'layui-layer-nobg', //娌℃湁鑳屾櫙鑹�
		closeBtn: 0, //涓嶆樉绀哄叧闂寜閽�
		anim: 2,
		title: false,
		area: ['550px', ''], //瀹介珮
		shadeClose: true, //寮€鍚伄缃╁叧闂�
		content: $("#" + tagId),
		end: function() {
			$("#" + tagId).hide();
		},
	});
}

function updateResume(result) {
	var tagId = "";
	var param = {
		'resumeId': $("#resumeId").val()
	};

	var url = "";
	if(result == 3) { // 闈㈣瘯閫氱煡
		var form = document.getElementById("msResulttzmsForm");
		if(form.jobId.value == null || form.jobId.value == "") {

			return;
		}
		if(form.interviewTime.value == null || form.interviewTime.value == "") {

			return;
		}
		if(form.interviewAddress.value == null || form.interviewAddress.value == "") {

			return;
		}
		if(form.HRname.value == null || form.HRname.value == "") {

			return;
		}
		if(form.HRphone.value == null || form.HRphone.value == "") {

			return;
		}
		form = $("#msResulttzmsForm").serializeArray()
		$.each(form, function() {
			param[this.name] = this.value;
		});
		url = "talents/resumeMSTZ";
		tagId = "msResulttzms";
	} else if(result == 4) { // 闈㈣瘯鏈€氳繃(涓嶅悎閫�)
		form = $("#msResultbhsForm").serializeArray()
		$.each(form, function() {
			param[this.name] = this.value;
		});
		var desc = '';
		$(".reason-options input[type='checkbox']:checked").each(function() {
			console.log($(this).val());
			if($(this).val() == '鍏朵粬') {
				desc += $(this).siblings("input[type='text']").val() + ',';
			} else {
				desc += $(this).val() + ',';
			}
		});
		//		if (desc == null || desc == "") {
		//			layer.msg("涓嶅悎閫傜殑鍘熷洜涓嶈兘涓虹┖锛�");
		//			return;
		//		}
		param.desc = desc;
		url = 'talents/resumeBHS';
		tagId = "msResultbhs";
	} else if(result == 5) { // 閫氱煡褰曠敤

		var form = document.getElementById("msResulttzlyForm");
		if(form.entryTime.value == null || form.entryTime.value == "") {

			return;
		}
		if(form.entryAddress.value == null || form.entryAddress.value == "") {

			return;
		}
		if(form.entryDepart.value == null || form.entryDepart.value == "") {

			return;
		}
		if(form.jobId.value == null || form.jobId.value == "") {

			return;
		}
		if(form.probationMonth.value == null || form.probationMonth.value == "") {

			return;
		}
		if(form.entrySalary.value == null || form.entrySalary.value == "") {

			return;
		}
		if(form.probationPerent.value == null || form.probationPerent.value == "") {

			return;
		}
		form = $("#msResulttzlyForm").serializeArray()
		$.each(form, function() {
			param[this.name] = this.value;
		});
		url = "talents/resumeTZLY";
		tagId = "msResulttzly";
	} else if(result == 6) { // 寰呭畾
		var desc = $("#resumeDD").val();
		//		if (desc == null || desc == "") {
		//			layer.msg("寰呭畾鐨勫師鍥犱笉鑳戒负绌猴紒");
		//			return;
		//		}
		param.desc = desc;
		url = 'talents/resumeDD';
		tagId = "msResultdd";
	} else {
		return;
	}
	param.tagId = tagId;

	$.ajax({
		method: 'POST',
		url: url,
		data: param,
		dataType: 'json',
		success: function(res) {
			console.log(res);
			layer.close(indextagId);
			$("#jobId").val("");
		},
		error: function() {},
	});
}

function companyCollStudent(collTag, stuId) {
	$.ajax({
		method: 'POST',
		url: 'talents/companyCollResume',
		data: {
			'stuId': stuId,
			'mId': $("#meetingId").val()
		},
		dataType: 'json',
		success: function(res) {
			var html = $(collTag).text();
			if(html == "鏀惰棌绠€鍘�") {
				html = '<img src="img/like.png" alt="" style="margin-top: -0.5vh;margin-right: 0vh;">';
				html += '<span>鍙栨秷鏀惰棌</span>'
			} else {
				html = '<img src="img/like1.png" alt="" style="margin-top: -0.5vh;margin-right: 0vh;">';
				html += '<span>鏀惰棌绠€鍘�</span>'
			}
			$(collTag).html(html)
			console.log(res);
			layer.msg(res.msg);
		},
		error: function() {},
	});
}

function jobInfo(id) {
	$.ajax({
		url: 'company/jobInfo',
		data: {
			id: id
		},
		dataType: 'html',
		success: function(html) {
			//鍦ㄨ繖閲岄潰杈撳叆浠讳綍鍚堟硶鐨刯s璇彞
			layer.open({
				type: 1,
				skin: 'layui-layer-nobg', //娌℃湁鑳屾櫙鑹�
				closeBtn: 1, //涓嶆樉绀哄叧闂寜閽�
				anim: 0,
				title: false,
				area: ['580px', '90vh'], //瀹介珮
				shadeClose: true, //寮€鍚伄缃╁叧闂�
				content: html //a(id, name)
			});
		}
	});
}

function jobInfo1(json, enterpriseId, enterpriseName, enterpriseImg) {
	layer.open({
		type: 1,
		skin: 'layui-layer-nobg', //娌℃湁鑳屾櫙鑹�
		closeBtn: 1, //涓嶆樉绀哄叧闂寜閽�
		anim: 0,
		title: false,
		area: ['580px', '680px'], //瀹介珮
		shadeClose: true, //寮€鍚伄缃╁叧闂�
		content: b(json, enterpriseId, enterpriseName, enterpriseImg),
	});
}

function openQQ() {
	//var qq = $(this).attr('data-qq');//鑾峰彇qq鍙�
	var qq = 2457329168
	window.open('http://wpa.qq.com/msgrd?v=3&uin=' + qq + '&site=qq&menu=yes', '_brank');

}

//鑱屼綅璇︽儏
function b(job, enterpriseId, enterpriseName, enterpriseImg) {
	var collect = 0;
	var loginType = $("#loginType").val();
	var mid = $("#meetingId").val();
	$.ajax({
		type: 'post',
		async: false,
		data: { 'jobId': job.jobId, 'mId': mid },
		url: 'talents/getIsCollect',
		dataType: 'json',
		success: function(data) {
			if(data.code == 200) {
				collect = data.body ? data.body : 0;
			}
		}
	});
	var html = '<img src="img/22.png" class="layImg">';
	html += '<div class="layTitle">鑱屼綅璇︽儏</div>';
	html += '<div class="layContant">';
	html += '<div style="line-height:27px;font-size:1.4vh;font-family:MicrosoftYaHei;font-weight:bold;color:rgba(51,51,51,1);"><span style="font-size:1.6vh;font-family:MicrosoftYaHei-Bold;font-weight:bold;color:rgba(66,107,87,1);">' + job.jobName;
	html += "<img src='img/mssq.png' style='float:right;width:90px;height:30px;margin-left:1vh;" + (loginType == 3 ? "cursor: no-drop" : " ") + "' onclick='sendVideo1(\"" + enterpriseId + "\",\"" + enterpriseName + "\",\"" + enterpriseImg + "\",\"" + job.jobId + "\")' />";
	if($("#loginType").val() == 4)
		html += '<div id="job_' + job.jobId + '" style="float:right;font-size:1.4vh;font-family:MicrosoftYaHei;font-weight:400;color:rgba(51,51,51,1);margin-top: 0.3vh;">' + collectBtn(job.jobId, mid, "job", collect.isCollect) + '</div><br>';
	else
		html += '<div style="float:right;font-size:1.4vh;font-family:MicrosoftYaHei;font-weight:400;color:rgba(51,51,51,1);margin-top: 0.3vh;"></div><br>';
	var money = job.moneyRangeId;
	if(money == '1') {
		money = "2k-4k";
	} else if(money == '2') {
		money = "4k-6k";
	} else if(money == '3') {
		money = "6k-8k";
	} else if(money == '4') {
		money = "8k-10k";
	} else if(money == '12') {
		money = "10K浠ヤ笂";
	} else {
		money = "闈㈣";
	}

	var str = replaceStr(money, '') + '</span>' + replaceStr(money, '', ' | ') + '<span>' + replaceStr(job.address, '') + '</span>' + replaceStr(job.address, '', ' | ') + '<span>' + replaceStr(job.jobNature, '') + '</span>' + replaceStr(job.jobNature, '', ' | ') + '<span>' + replaceStr(job.educationBackground, '') + '</span>' + replaceStr(job.educationBackground, '', ' | ') + '<span>' + replaceStr(job.recruitingNumbers, '', '鎷�' + job.recruitingNumbers + '浜�') + "";
	if(str.lastIndexOf(" | ") == str.length - " | <span>".length) {
		str = str.replace(/(.*)\|/, '$1');
	}
	html += '<span>' + str + '</span><br>';
	html += '<span style="font-size:14px;font-family:MicrosoftYaHei;font-weight:400;color:rgba(102,102,102,1);">' + enterpriseName + '</span></div>'
	html += '<div style="margin-bottom:1vh"><div style="width:0.4vh;height:1.6vh;background:rgba(66,107,87,1);float:left;margin-top: 6px;margin-right: 1vh;"></div><span style="font-size:14px;font-family:MicrosoftYaHei;font-weight:bold;color:rgba(51,51,51,1);">鑱屼綅绂忓埄</span></div>'
	html += '<p style="padding-left:1vh">' + getPositionTempt(job.positionTempt) + '</p>'
	html += '<div style="margin-bottom:1vh"><div style="width:0.4vh;height:1.6vh;background:rgba(66,107,87,1);float:left;margin-top: 6px;margin-right: 1vh;"></div><span style="font-size:14px;font-family:MicrosoftYaHei;font-weight:bold;color:rgba(51,51,51,1);">鑱屼綅鎻忚堪</span></div>'
	html += '<p>' + isNull(job.description) + '<p>'
	html += '</div>';
	return html;
}

function getPositionTempt(positionTempt) {
	var html = '';
	if(positionTempt) {
		var positionTemptList = positionTempt.split(',');
		for(var i in positionTemptList) {
			if(positionTemptList[i]) {
				html += '<span class="jobfl">' + positionTemptList[i] + '</span>';
			}

		}
		return html;
	} else {
		return '<span class="jobfl">鏆傛棤</span>';
	}
}
//鏀瑰彉瀛﹀巻锛岃Е鍙戝鐢熸悳绱�
$("body").on("searchTypeChange", function(e, type) {
	serchInfo(2)
	stuEdu = type;
})
//杈撳叆妗嗗洖杞︽悳绱�
$("#comSerch,#stuSerch").keypress(function(e) {
	if(e.keyCode == 13) {
		if($(this).attr("id") == "comSerch") {
			serchInfo(1);
		} else if($(this).attr("id") == "stuSerch") {
			serchInfo(2);
		}
	}
});

// 鎼滅储瀛︾敓鎴栦紒涓�
function serchInfo(type, refresh) {

	var url, ulTag;
	if(type == 1) {
		url = "getCompanyAll";
		ulTag = $(".view1");
	} else {
		url = "getStudentAll";
		ulTag = $($(".view2").find("div[class='inner']")[0]);
	}
	var param = {
		'mId': $("#meetingId").val(), // 浼氳ID
		'stuType': stuEdu, // 瀛﹀巻
		'stuSerch': $("#stuSerch").val(), // 涓撲笟宀椾綅comOnLine, stuOnLine
		'comType': $("#comType").val(), // 浼佷笟绫诲瀷
		'comSerch': $("#comSerch").val(), // 浼佷笟鍚嶇О鎷涜仒鑱屼綅
		'stuOnLine': stuOnLine, // 鏄惁鍙煡鐪嬪湪绾垮鐢�
		'comOnLine': comOnLine // 鏄惁鍙煡鐪嬪湪绾夸紒涓�
	};
	if(refresh) {
		param = {
			'mId': $("#meetingId").val(),
			'stuOnLine': false, // 鏄惁鍙煡鐪嬪湪绾垮鐢�
			'comOnLine': false // 鏄惁鍙煡鐪嬪湪绾夸紒涓�
		};
	}
	$.ajax({
		method: 'POST',
		url: url,
		data: param,
		dataType: 'json',
		success: function(res) {
			if(res.code == 500) {
				alert(res.msg);
				return;
			}
			ulTag.empty();
			res = res.body;
			console.log(loginType)
			var count = res.length;
			if(loginType == "") {
				if(type == 1) {
					if(count > 6) {
						count = 6
					}
				} else {
					count = 10
				}
			} else {
				$('.loadMore').hide()
				if(type == 1) {
					if(count > 6) {
						$(".view1").css('background', 'url(../img/bgnew.png) 100% 0')
					}
				}
			}

			for(var i = 0; i < count; i++) {
				if(type == 1) {
					addCompany(res[i], ulTag);
				} else {
					addStudent(res[i], ulTag);
				}
			}
			if(type == 1) { // 濡傛灉鏄紒涓氬垯鑷姩琛ュ叏姣忚灞曚綅
				var max = 6; // 榛樿姣忚灞曠ず6涓睍浣�
				var number = 0;
				number = max - ((count - 6) % max); // 璁＄畻姣忚鏄惁婊¤冻max涓睍浣�
				if(number == max) {
					number = 0
				}
				if(count < 6) {
					number = 6 - count;
				}
				if(count == 0) {
					number = 6;
				}
				for(var j = 0; j < number; j++) { // 琛ュ厖鐨勫睍浣嶆暟鎹负绌�
					var html = '<div class="item">';
					html += '  <div class="title" style="cursor: no-drop;"></div>';
					html += '<div class="inner">	      <div class="background" style="background: url(img/33.png) no-repeat 50% 0%;cursor: no-drop;"></div>    <div class="hr-box">            <div class="desk"></div>          </div>			<div class="seeker-box" style="background: url(img/i3.png) no-repeat 50% 100%;cursor: no-drop;">					                          </div>  </div>';
					html += ' </div>';
					ulTag.append(html)
				}
			}
		},
		error: function() {},
	});
}
// 鎼滅储鍚庡～鍏呭睍浣嶄俊鎭�

// 鎼滅储鍚庡～鍏呭鐢熶俊鎭�
function addStudent(info, ulTag) {
	console.log(info);
	info.loginType = $("#loginType").val();
	if(info.avatar) {
		info.avatar = 'https://cdn.211zph.com/upload/headpic/' + info.avatar;
	} else {
		if(info.sex == 1) {
			info.avatar = 'static/imgs/cloud/sex1.png';
		} else {
			info.avatar = 'static/imgs/cloud/sex0.png';
		}
	}
	var tpl = $.templates("#jsrender-student-list");
	var htmls = tpl.render(info);
	ulTag.append(htmls)
	return;

	var img = info.avatar;
	var loginType = $("#loginType").val();
	if(img == null) {
		if(info.sex == 1) {
			img = 'static/imgs/cloud/sex1.png';
		} else {
			img = 'static/imgs/cloud/sex0.png';
		}
	} else {
		img = 'https://cdn.211zph.com/upload/headpic/' + img;
	}
	var flag = "img/online.png";
	if(info.flag != 1) {
		flag = "img/lx.png"
	}
	var html = '<div class="item">';
	html += '  <div class="inner">';
	if(info.avatar == null) {
		html += '		<a class="go" onClick="getJobList(\'' + info.user_code + '\', 2, \'' + info.nickname + '\',\'static/imgs/cloud/sex' + (info.sex == 1 ? 1 : 0) + '.png\')" style="' + (loginType == 4 ? "cursor: no-drop" : " ") + '">绔嬪嵆娌熼€�</a>';
	}
	if(info.avatar != null) {
		html += '		<a class="go" onClick="getJobList(\'' + info.user_code + '\', 2, \'' + info.nickname + '\',\'xcimg/' + info.avatar + '\')" style="' + (loginType == 4 ? "cursor: no-drop" : " ") + '">绔嬪嵆娌熼€�</a>';
	}
	if(info.flag == 1) {
		html += '		<b class="status"></b>';
	}
	if(info.flag == 0) {
		html += '		<b class="status" style="background: url(img/index-grid/lx.png);"></b>';
	}
	html += '	<i class="score">' + info.resume_score + '%</i>';
	html += '	<div class="flex ai-stretch tx-cont">';
	html += '	  <div class="_left flex column ai-stretch between" style="cursor: pointer;" onclick="showResume(\'' + info.user_code + '\')">';
	if(info.avatar == null || info.avatar == '') {
		if(info.sex == '1') {
			html += '				<img src="static/imgs/cloud/sex1.png" alt="" />';
		} else {
			html += '				<img src="static/imgs/cloud/sex0.png" alt="" />';
		}
	} else {
		html += '			<img src="https://cdn.211zph.com/upload/headpic/' + info.avatar + '" alt=""/>';
	}
	html += '		<div class="name">' + info.nickname + '<i class="jianli" ></i></div>';
	html += '	  </div>';
	html += '	  <div class="_right flex column ai-stretch between fx1 ml05">';
	html += '		<div class="div">';
	html += '		  <div class="zy">' + info.hope_positions + '</div>';
	html += '		</div>';
	html += '		<div class="gap-line"></div>';
	html += '		<div class="desc">';
	html += '		  <p>' + info.school_name + '</p>';
	html += '		  <p>' + info.grad_year + '灞�/' + info.education_status + '</p>';
	html += '		  <p>' + info.profession + '</p>';
	html += '		</div>';
	html += '	  </div>';
	html += '	</div>';
	html += '  </div>';
	html += '</div>';
	ulTag.append(html)
}

function addCompany(info, ulTag) {
	info.loginType = $("#loginType").val();
	info.people1 = (Math.floor(Math.random() * 5 + 1));
	info.people2 = (Math.floor(Math.random() * 5 + 1));
	if(!info.company_logo) {
		info.company_logo = 'static/imgs/cloud/company_logo.png';
	} else {
		info.company_logo = 'https://cdn.211zph.com/upload/headpic/' + info.company_logo;
	}
	var tpl = $.templates("#jsrender-company-list");
	var htmls = tpl.render(info);
	ulTag.append(htmls);
	return;

	var enterpriseImg = info.enterpriseImg;
	var loginType = $("#loginType").val();
	if(enterpriseImg == null || enterpriseImg == "") {
		enterpriseImg = "static/imgs/cloud/company_logo.png";
	} else {
		enterpriseImg = "xcimg/" + enterpriseImg;
	}
	var flag = "img/online.png";
	if(info.flag != 1) {
		flag = "img/lx.png"
	}
	var html = '<div class="item">';
	//	if (info.flag == 1) {
	html += '  <div class="title" onclick="bg(\'' + info.companyid + '\',\'' + info.companyname + '\')"  >' + info.companyname + '</div>';
	// 	}
	/*    	if (info.flag == 0) {
	            html+= '  <div class="title" onclick="bg(\''+info.companyid+'\',\''+info.companyname+'\')"  style="cursor: no-drop;">'+info.companyname+'</div>';
	        }*/
	html += '  <div class="inner">';
	if(info.flag == 1) {
		html += '      <div class="state"></div>';
	}
	if(info.flag == 0) {
		html += '	  <div class="state" style="background: url(img/index-grid/lx.png);" ></div>';
	}
	//	if (info.flag == 1) {
	html += '    <div class="background" onclick="bg(\'' + info.companyid + '\',\'' + info.companyname + '\')"></div>';
	//	}
	/*		if (info.flag == 0) {
	            html+= '    <div class="background" onclick="bg(\''+info.companyid+'\',\''+info.companyname+'\')" style="cursor: no-drop;"></div>';
	        }*/
	html += '    <div class="hr-box">';
	html += '      <div class="hr" style="background-image:url(img/g' + (Math.floor(Math.random() * 5 + 1)) + '.png)"></div>';
	html += '      <div class="desk"></div>';
	html += '      <div class="hr" style="background-image:url(img/b' + (Math.floor(Math.random() * 5 + 1)) + '.png)"></div>';
	html += '    </div>';
	if(info.flag == 1) {
		html += '			<div class="seeker-box">';
		if(info.companyid == null) {
			html += '					<div class="send" onClick="getJobList(\'' + info.companyid + '\', 1,\'\',\'\')" style="' + (loginType == 3 ? "cursor: no-drop" : " ") + '"></div>';
		} else if(info.enterpriseImg == null) {
			html += '					<div class="send" onClick="getJobList(\'' + info.companyid + '\', 1,\'' + info.companyname + '\',\'static/imgs/cloud/company_logo.png\')" style="' + (loginType == 3 ? "cursor: no-drop" : " ") + '"></div>';
		} else {
			html += '					<div class="send" onClick="getJobList(\'' + info.companyid + '\', 1,\'' + info.companyname + '\',\'' + purl + info.enterpriseImg + '\')" style="' + (loginType == 3 ? "cursor: no-drop" : " ") + '"></div>';
		}
		html += '             <div class="tx">';
		html += '              <p style="text-align:center">绌洪棽</p>';
		html += '              <p style="text-align: center">绛�: <b>10</b>鍒�</p>';
		html += '              </div>';
		html += '          </div>';
	}
	if(info.flag == 0) {
		html += '			<div class="seeker-box" style="background: url(img/i0.png) no-repeat 50% 100%;">';
		if(info.companyid == null) {
			html += '					<div class="send" onClick="getJobList(\'' + info.companyid + '\', 1,\'\',\'\')" style="' + (loginType == 3 ? "cursor: no-drop" : " ") + '"></div>';
		} else if(info.enterpriseImg == null) {
			html += '					<div class="send" onClick="getJobList(\'' + info.companyid + '\', 1,\'' + info.companyname + '\',\'static/imgs/cloud/company_logo.png\')" style="' + (loginType == 3 ? "cursor: no-drop" : " ") + '"></div>';
		} else {
			html += '					<div class="send" onClick="getJobList(\'' + info.companyid + '\', 1,\'' + info.companyname + '\',\'' + purl + info.enterpriseImg + '\')" style="' + (loginType == 3 ? "cursor: no-drop" : " ") + '"></div>';
		}
		html += '              <div class="tx">';
		html += '                <p style="text-align:center">绌洪棽</p>';
		html += '                <p style="text-align: center">绛�: <b>10</b>鍒�</p>';
		html += '              </div>';
		html += '            </div>';
	}
	html += '  </div>';
	html += ' </div>';

	ulTag.append(html);
}

function init() {
	var num = 1,
		num2 = 2,
		num3 = 3,
		num4 = 4,
		num5 = 5,
		num6 = 6,
		num7 = 7

	var odo1 = new Odometer('.apply', {
			num: num
		}),
		odo2 = new Odometer('.onLine', {
			num: num2
		}),
		odo3 = new Odometer('.station', {
			num: num3
		}),
		odo4 = new Odometer('.jobWant', {
			num: num4
		}),
		odo5 = new Odometer('.jobOnline', {
			num: num5
		})
	/*, odo6 = new Odometer('.applyJob', {
	       num: num6
	   }), odo7 = new Odometer('.offer', {
	       num: num7
	   }) */

	$.ajax({
		method: 'POST',
		url: 'meetingData',
		data: {
			'mId': $("#meetingId").val()
		},
		dataType: 'json',
		success: function(res) {
			if(res.code == 200) {
				var msg = JSON.parse(res.msg);
				num = msg.companyNum;
				num2 = msg.onLineCompanyNum;
				num3 = msg.job_person_num;
				num4 = msg.jobSeeker;
				num5 = msg.onLineJobSeeker;
				num6 = msg.resume;
				num7 = msg.offer;
				odo1.update(num);
				odo2.update(num2);
				odo3.update(num3);
				odo4.update(num4);
				odo5.update(num5);
				//                odo6.update(num6);
				//                odo7.update(num7);
			}
		},
		error: function() {},
	});
}

function tow(n) {
	return n >= 0 && n < 10 ? '0' + n : '' + n;
}

function getDate() {
	var oDate = new Date(); //鑾峰彇鏃ユ湡瀵硅薄
	var oldTime = oDate.getTime(); //鐜板湪璺濈1970骞寸殑姣鏁�
	var newDate = new Date($("#meetingInfoEndDate").val());
	var newTime = newDate.getTime(); //2019骞磋窛绂�1970骞寸殑姣鏁�
	var second = Math.floor((newTime - oldTime) / 1000); //鏈潵鏃堕棿璺濈鐜板湪鐨勭鏁�
	var day = Math.floor(second / 86400); //鏁存暟閮ㄥ垎浠ｈ〃鐨勬槸澶╋紱涓€澶╂湁24*60*60=86400绉� 锛�
	second = second % 86400; //浣欐暟浠ｈ〃鍓╀笅鐨勭鏁帮紱
	var hour = Math.floor(second / 3600); //鏁存暟閮ㄥ垎浠ｈ〃灏忔椂锛�
	second %= 3600; //浣欐暟浠ｈ〃 鍓╀笅鐨勭鏁帮紱
	var minute = Math.floor(second / 60);
	second %= 60;
	console.log(tow(day))
	$('.day').html(tow(day))
	$('.hour').html(tow(hour))
	$('.minute').html(tow(minute))
}

//椤堕儴鎷涜仒浼氭暟鎹�
init();
//鏀瑰彉鏁板€�
setInterval(init, 150000);

//鍊掕鏃�
getDate();
setInterval(getDate, 60000);

function replaceStr(value, str1, str2) {
	if(typeof value == "undefined" || value == null || value == "null" || value.trim() == "") {
		return str1;
	} else {
		if(typeof str2 == "undefined" || value == null) {
			return value;
		} else {
			return str2;
		}
	}
}

function download_resume(stuId) {
	$.ajax({
		url: 'talents/download',
		dataType: 'json',
		data: {
			stuId: stuId
		},
		method: 'POST',
		success: function(res) {
			if(res.code == 200) {
				layer.msg(res.msg);
				showResume(stuId);
			} else {
				layer.msg(res.msg);
			}
		},
		error: function() {
			layer.msg('璇风櫥褰曚紒涓氬笎鍙�');
		}
	});
}