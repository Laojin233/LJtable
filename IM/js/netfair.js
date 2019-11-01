var layer;
layui.use('layer', function () {
	layer = layui.layer;
	//弹窗初始化
	_initPopup(layer)
	$(document).ready(function () {
		//Vue初始化
		_initVue()
		//ajax初始化
		_initAjax()
	})
});
//弹窗初始化func
function _initPopup(layer) {
	//小提示-1
	layer.tips('点击此处可切换大厅', '#hall_company', {
		time: 5000,
		tips: [2, 'rgb(51, 51, 51)'],
		tipsMore: true,
	});
	//小提示-2
	var _is_tips1 = 0;
	$('#hall_company').on('click', function () {
		if (_is_tips1 == 0) {
			layer.tips('企业可在此大厅浏览优秀人才！', this, {
				time: 2000,
				tips: [2, 'rgba(51,51,51)']
			}); //在元素的事件回调体中，follow直接赋予this即可
			_is_tips1 = 1
		} else { }
	});
	//白底黑字的tips
	var tip_index = 0;
	function layerTip_btns(dom, text) {
		tip_index = layer.tips("<span style='color:#000'>" + text + "</span>", dom,
			{
				tips: [3, '#fff'],
				area: ['auto', 'auto'],
				tipsMore: true,
				time: 10000
			})
	}
	//---查看会议须知
	$(document).on('click', '.fair-info input', function () {
		//弹出一个iframe层
		layer.open({
			type: 2,
			title: false,
			shadeClose: true, //点击遮罩关闭层
			area: ['600px', '500px'],
			content: './iframe_notice.html',
			skin: 'layer-dudu-class',
		});
	});
	// 聊天按钮
	$(document).on('mouseenter', '.online-social-btn', function () {
		// layer.msg('请扫描右下角小程序进行视屏沟通');return false;
		layerTip_btns(this, '在线聊天！')
	}).on('mouseleave', '.online-social-btn', function () {
		layer.close(tip_index);
	});
	// 视频按钮
	$(document).on('mouseenter', '.video-btn', function () {
		// layer.msg('请扫描右下角小程序进行视屏沟通');return false;
		layerTip_btns(this, '视频沟通！')
	}).on('mouseleave', '.video-btn', function () {
		layer.close(tip_index);
	});
	//投递按钮
	$(document).on('mouseenter', '.apply-jobs-btn', function () {
		layerTip_btns(this, '投递简历！')
	}).on('mouseleave', '.apply-jobs-btn', function () {
		layer.close(tip_index);
	});
}
//切换大厅
//('.hall_company') 展示公司及职位
//('.hall_personal') 展示优秀毕业生
$('.change_hall input').on('click', function () {
	dataLoading = layer.load(2, {
		shade: [0.5, '#fff'], //0.1透明度的白色背景
		time: 5 * 1000,
	});
	if (this.id == 'hall_personal') {
		//点击 招聘大厅 按钮时
		$('.page1').first().css('display', 'block');
		$('.page2').first().css('display', 'none');
		$('.main_list-jobs').first().css('display', 'block');
		$('.main_list-person').first().css('display', 'none');
		//$('.change_hall').css("border-bottom","10px solid #e6f9f2")
		$('.hall_company').first().addClass('change_active_c');
		$('.hall_personal').first().addClass('change_active_b');
		$('.hall_company').first().removeClass('change_active_a');
		//改变搜索栏说明
		$('#search_input').attr('placeholder', '输入期望的职位名称');
		$('#search_btn').attr('name', 'jobfair');
		$('#hall_company').val(`求职大厅`);
		// clearTimeout(_timeOut2);
		clearInterval(_countdown2);
		key = '';
		$('#search_input').val("");
		getCompanyList(1, key, _jobfair_id);
		setVueData(0)
		pageShow();
	} else {
		$('#hall_personal').val(`招聘大厅`);
		//点击 求职大厅 按钮时
		dataLoading = layer.load(2, {
			shade: [0.5, '#fff'], //0.1透明度的白色背景
			time: 5 * 1000,
		});
		$('.page1').first().css('display', 'none');
		$('.page2').first().css('display', 'block');
		$('.main_list-jobs').first().css('display', 'none');
		$('.main_list-person').first().css('display', 'block');
		//$('.change_hall').css("border-bottom","10px solid #eaf4f8")
		$('.hall_company').first().addClass('change_active_a');
		$('.hall_personal').first().removeClass('change_active_b');
		$('.hall_personal').first().addClass('change_active_c');
		$('#search_input').attr('placeholder', '输入想要查看的专业或求职者名称');
		$('#search_btn').attr('name', 'worker');
		clearTimeout(_timeOut1);
		clearInterval(_countdown1);
		key = '';
		$('#search_input').val("");
		getJobSeekerList(1, key, _jobfair_id);
		setVueData(1)
		pageShow2()
	}
})
//搜索
var _is_searching = false
var dataLoading;
var searchInterval = true;
window.onload = function () {
	function _search() {
		key = $('#search_input').val();
		var key_name = $('#search_btn')[0].name;
		if (key != '' && dataLoading != '') {
			console.log(dataLoading)
			dataLoading = layer.load(2, {
				shade: [0.5, '#fff'], //0.1透明度的白色背景
				time: 5 * 1000,
				offset: ['700px', '57%'],
			});
			if (key_name == 'jobfair') {
				_is_searching = true
				getCompanyList(1, key, _jobfair_id);
				setVueData(0)
				pageShow()
			} else {
				_is_searching = true
				getJobSeekerList(1, key, _jobfair_id);
				setVueData(1)
				pageShow2()
			}
		}
		else {
			layer.tips('请输入至少一个关键字', '#search_input', { tips: 1 })
		}
	}
	// else{
	// 	__timer=setTimeout(function(){
	// 		searchInterval=false;
	// 		console.log("重置间隔")
	// 	},1000);
	// }
	// 	if(searchInterval){
	// 		if(_is_searching){}
	// 		else if(){
	// 			if (key_name == 'jobfair') {
	// 				searchLoading = layer.load(1, {
	// 					shade: [0.5,'#fff'], //0.1透明度的白色背景
	// 					time:5*1000,
	// 				});
	// 				_is_searching=true
	// 				getCompanyList(1, key, _jobfair_id);
	// 				setVueData(0)
	// 				pageShow()
	// 			} else {
	// 				_is_searching=true
	// 				searchLoading = layer.load(2, {
	// 					shade: [0.5,'#fff'], //0.1透明度的白色背景
	// 					time:5*1000,
	// 				});
	// 					getJobSeekerList(1, key, _jobfair_id);
	// 					setVueData(1)
	// 					pageShow2()
	// 			}
	// 		}
	// }
	// }}
	function entersearch(e) {
		if (e.keyCode == 13 && _is_searching == false) {
			_search()
		}
	}
	$(document).on('click', '#search_btn', function () {
		var _timer;
		if (_timer) {
			clearTimeout(_timer);
		}
		_timer = setTimeout(function () {
			_search();
		}, 100)
	})
	$(document).on('keydown', '#search_input', function (e) {
		var _timer;
		if (_timer) {
			clearTimeout(_timer);
		}
		_timer = setTimeout(function () {
			entersearch(e);
		}, 100)
	})
}
function jobSomething(trigger, successMsg, iscreate, jid, jobfair_id) {
	var batch = eval($(trigger).data('batch'));
	var url = qscms.root + '?m=Home&c=AjaxPersonal&a=resume_apply';
	var url2 = qscms.root + '?m=Jobfair&c=Network&a=jobsApply';
	var hasAllowance = false;
	var jidValue = jid;
	// 是否含有红包职位
	if (hasAllowance) {
		var conAloDia = $(trigger).dialog({
			title: "提示",
			content: "当前所选职位中包含红包职位，无法批量投递。<br />你可以点击“取消”逐个申请职位，也可以点击“直接投递”但不领取红包。",
			yes: function () {
				ajaxFroJob();
			}
		})
		conAloDia.setBtns(['直接投递', '取消']);
	} else {
		ajaxFroJob();
	}
	function ajaxFroJob() {
		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: { jid: jidValue },
			success: function (data) {
				$.ajax({
					url: url2,
					type: 'POST',
					dataType: 'json',
					data: { jobs_id: jidValue, jobfair_id: jobfair_id }
				})
			}
		})
			.done(function (data) {
				if (parseInt(data.status)) {
					if (data.data.html) {
						if (data.data.rid) {
							var qsDialogSon = $(trigger).dialog({
								title: '申请职位',
								content: data.data.html,
								yes: function () {
									var url = qscms.root + "?m=Home&c=Personal&a=resume_edit&pid=" + data.data.rid;
									document.location.href = url;
								},
								btns: ['完善简历', '放弃申请']
							});
						} else {
							var qsDialogSon = $(trigger).dialog({
								title: '申请职位',
								content: data.data.html
							});
						}
					} else {
						disapperTooltip('success', successMsg);
					}
				}
				else if (data.data == 1) {
					location.href = qscms.root + "?m=Home&c=Personal&a=resume_add";
				}
				else {
					if (eval(data.dialog)) {
						var qsDialog = $(trigger).dialog({
							loading: true,
							footer: false,
							header: false,
							border: false,
							backdrop: false
						});
						if (iscreate) { // 申请职位
							if (eval(qscms.smsTatus)) {
								var creatsUrl = qscms.root + '?m=Home&c=AjaxPersonal&a=resume_add_net';
								$.getJSON(creatsUrl, { jid: jidValue }, function (result) {
									if (result.status == 1) {
										qsDialog.hide();
										var qsDialogSon = $(trigger).dialog({
											content: result.data.html,
											footer: false,
											header: false,
											border: false
										});
										qsDialogSon.setInnerPadding(false);
									} else {
										qsDialog.hide();
										disapperTooltip("remind", result.msg);
									}
								});
							} else {
								var loginUrl = qscms.root + '?m=Home&c=AjaxCommon&a=get_login_dig';
								$.getJSON(loginUrl, function (result) {
									if (result.status == 1) {
										qsDialog.hide();
										var qsDialogSon = $(trigger).dialog({
											title: '会员登录',
											content: result.data.html,
											footer: false,
											border: false
										});
										qsDialogSon.setInnerPadding(false);
									} else {
										qsDialog.hide();
										disapperTooltip("remind", result.msg);
									}
								});
							}
						} else {
							var loginUrl = qscms.root + '?m=Home&c=AjaxCommon&a=get_login_dig';
							$.getJSON(loginUrl, function (result) {
								if (result.status == 1) {
									qsDialog.hide();
									var qsDialogSon = $(trigger).dialog({
										title: '会员登录',
										content: result.data.html,
										footer: false,
										border: false
									});
									qsDialogSon.setInnerPadding(false);
								} else {
									qsDialog.hide();
									disapperTooltip("remind", result.msg);
								}
							});
						}
					} else {
						disapperTooltip("remind", data.msg);
					}
				}
			})
	}
}
// ****************************************//
//				Vue实例				       //
// ****************************************//
function _initVue() {
	//招聘会信息-左侧公告板
	Vue_jobfairInfo = new Vue({
		el: '#jobfairInfo',
		data: {
			jobfairInfo: ''
		}
	})
	//上线数据-滚动公告左侧信息
	onlineVue = new Vue({
		el: '#onlineInfo',
		data: {
			onlineList: [],
		},
	})
	//企业列表
	listVue = new Vue({
		el: '#jobsList',
		data: {
			jobsList: '',
			firstCompany: ''
		},
		methods: {
			more: function (uid) {
				moreInfo(uid, _getJobs);
			},
			video: function (userName, uid, status, logo) {
				if (isFairOver == 1) {
					layer.msg('招聘会还未开始！');
				}
				if (isFairOver == 2) {
					//招聘会进行中
					console.log(uid);
					judge();
					if(_msg1=='success')
					{
						if(status==1)
						{
							_tim_openVideo(userName, uid, logo)
							// videoShow(userName, uid, logo)
						}else
						{
							layer.msg('该用户不在线！');
						}
					}

				}
				if (isFairOver == 3) {
					layer.msg('招聘会已经结束！');
				} else { }
			},
			onlineSocial: function (userName, uid, status, logo) {
				// layer.msg('请扫描右下角小程序进行视屏沟通');return false;
				if (isFairOver == 1) {
					layer.msg('招聘会还未开始！');
				}
				if (isFairOver == 2) {
					//招聘会进行中
					console.log(uid);
					judge();
					if (_msg1 == 'success') {
						// console.log(123)
						_tim_openBox(userName, uid, logo);
					}
				}
				if (isFairOver == 3) {
					layer.msg('招聘会已经结束！')
				} else { }
			},
			cast: function () {
			}
		},
		updated: function () {
			clearInterval(_countdown1)
			var count = 60;
			// console.log(result)
			_countdown1 = setInterval(function () {
				// console.log(count+'zhao');
				$('#hall_personal').val(`招聘大厅(${count})`);
				count -= 1;
				if (count == 20) {
					getCompanyList(1, '', _jobfair_id)
				} else
				if (count < 1) {
					clearInterval(_countdown1)
					setVueData(0)
					// console.log('xx')
				}
			}, 1000);
			layer.close(dataLoading);
			_is_searching = false
		}
	});
	//求职者列表
	jobSeekerVue = new Vue({
		el: '#jobSeekerList',
		data: {
			jobSeekerList: '',
		},
		methods: {
			seeResume: function (id) {
				judgeCompany(1);
				if (_msg2 == 'success') {
					resumePopup(id, 1);
				}
			},
			chat: function (userName, uid, status, img, sex) {
				// layer.msg('请扫描右下角小程序进行视屏沟通');return false;
				if(img=='')
				{
					if(sex==1)
					{
						img = '/Application/Jobfair/View/default/public/images/boy_chat.jpg';
					}else
					{
						img = '/Application/Jobfair/View/default/public/images/girl_chat.jpg';
					}
				}
				console.log(userName)
				console.log(uid)
				is_interview();
				if (_msg3 == 'success') {
					console.log(uid);
					_tim_openBox(userName, uid, img);
				} else {
					layer.msg(_msg3);
				}
			}
		},
		updated: function () {
			clearInterval(_countdown1)
			var count = 60;
			// console.log(result)
			_countdown1 = setInterval(function () {
				// console.log(count+'zhao');
				$('#hall_company').val(`求职大厅(${count})`);
				count -= 1;
				if (count == 20) {
					getJobSeekerList(1, '', _jobfair_id)
				} else
					if (count < 1) {
						clearInterval(_countdown1)
						setVueData(1)
						// console.log('xx')
					}
			}, 1000);
			layer.close(dataLoading);
			_is_searching = false
		}
	});
}
//招聘简章
Vue_jobs = new Vue({
	el: '#jobList_details',
	data: {
		com_info: '',
		jobsInfo: '',
	},
	methods: {
		applyJob: function (jid) {
			judge();
			// console.log(_msg1);
			if (_msg1 == 'success') {
				jobSomething('.apply-jobs-btn', '申请成功！', true, jid, _jobfair_id);
				layer.close(_jobList_details);
			}
		}
	}
});
// //******************Vue-end***********************//
function pageShow() {
	$(".page1").paging({
		nowPage: 1, // 当前页码
		pageNum: pageSum, // 总页码
		buttonNum: 10, //要展示的页码数量
		callback: function (num) {
			//回调函数
			key = $('#search_input').val();
			getCompanyList(num, key, _jobfair_id);
			console.log(num);
		}
	});
}
function pageShow2() {
	$(".page2").paging({
		nowPage: 1, // 当前页码
		pageNum: pageSum2, // 总页码
		buttonNum: 10, //要展示的页码数量
		callback: function (num) {
			//回调函数
			key = $('#search_input').val();
			getJobSeekerList(num, key, _jobfair_id);
		}
	});
}
function count(o) {
	var t = typeof o;
	if (t == 'string') {
		return o.length;
	} else if (t == 'object') {
		var n = 0;
		for (var i in o) {
			n++;
		}
		return n;
	}
	return false;
}
// //--------------------弹出层----------------------//
var _yaoqing; //邀请弹窗
var _callingWindow; //通话弹窗
var _callingWindowThumb;//缩略窗口
var _privacyWindow;
//隐私条款
function privacyPopup() {
	_privacyWindow = layer.open({
		type: 1,
		title: '隐私条款',
		btn: ['报名本场招聘会'],
		move: false,
		btn1: function () {
			console.log('我同意', $('#agree')[0].checked)
			if ($('#agree')[0].checked) {
				$.ajax({
					type: "post",
					url: _signUp,
					data: { jobfair_id: _jobfair_id },
					success: function (result) {
						console.log('bbb', result);
					},
					error: function (jqXHR) {
					}
				});
				layer.close(_privacyWindow)
				layer.msg('报名成功！', { icon: 1 })
			}
			else {
				layer.tips('需要勾选同意之后才能报名！', $('#agree'), {
					time: 2000,
					tips: [3, 'rgba(51,51,51)']
				});
			}
		},
		scrollbar: false,
		area: ['380px', '400px'],
		content: $('#layer_privacy'),
		skin: 'layer_privacy',
	});
}
//---招聘简章
function moreInfo(uid, path) {
	_jobList_details = layer.open({
		type: 1,
		title: false,
		//maxmin: true,
		shadeClose: true, //点击遮罩关闭层
		area: ['580px', '750px'],
		content: $('#jobList_details'),
		skin: 'layer-dudu-class',
		end: function () {
			// console.log('endLayer')
			Vue_jobs.jobsInfo = '';
			Vue_jobs.com_info = '';
			comsynHide()
		}
	});
	$.ajax({
		type: "post",
		url: path,
		dataType: "json",
		data: { uid: uid },
		success: function (result) {
			if (result.msg == 'success') {
				Vue_jobs.jobsInfo = result.data.jobs
				Vue_jobs.com_info = result.data.com_info
			}
		},
		error: function (jqXHR) {
		}
	});
}
//招聘简章--公司简介-更多/收起
function comsynMore() {
	document.getElementById('synopsis').style.height = 'auto';
	document.getElementById('com_synopsis-hide').style.display = 'block';
	document.getElementById('com_synopsis-more').style.display = 'none';
}
function comsynHide() {
	document.getElementById('synopsis').style.height = '110px';
	document.getElementById('com_synopsis-hide').style.display = 'none';
	document.getElementById('com_synopsis-more').style.display = 'block';
}
// ----------查看简历------//
var _resume
function resumePopup(id, type) {
	if (type == 1) {
		_resume = layer.open({
			type: 2,
			title: '个人简历',
			shadeClose: true, //点击遮罩关闭层
			area: ['550px', '800px'],
			content: qscms.root + '?m=Home&c=resume&a=worker_resume_show&id=' + id,
			skin: 'layer-dudu-class',
			resize: false,
		});
	}
	else {
		_resume = layer.open({
			type: 2,
			title: '个人简历',
			//shadeClose: true, //点击遮罩关闭层
			area: ['550px', '800px'],
			offset: 'r',
			shade: false,
			content: qscms.root + '?m=Home&c=resume&a=worker_resume_show&id=' + id,
			skin: 'layer-dudu-class',
			resize: false,
			end: function () {
				_isSum = false;
			}
		});
	};
}
var _isProhibitions = false;
var _isBeauty = false;
var _callWinTip;
function MsgbindDom(dom, text) {
	// console.log(text.length)
	if (dom.parent().first().css('display') == 'none') {
		t = $('.layer_video_calling').first().css('top')
		t = t.substring(0, t.length - 2)
		l = $('.layer_video_calling').first().css('left')
		l = l.substring(0, l.length - 2)
		var X = `${Number(l) + ($('.layer_video_calling').first().outerWidth() - 20 - text.length * 14) / 2}px`;
		var Y = `${Number(t) + ($('.layer_video_calling').first().outerHeight() - 25) / 2}px`;
		// console.log(X,Y)
		return [Y, X]
	} else {
		t = $('.layer_video_calling').first().css('top')
		t = t.substring(0, t.length - 2)
		l = $('.layer_video_calling').first().css('left')
		l = l.substring(0, l.length - 2)
		var X = `${Number(l) + ($('.layer_video_calling').first().outerWidth() - 20 - text.length * 14) / 2}px`;
		var Y = `${Number(t) + ($('.layer_video_calling').first().outerHeight() - 25) / 2}px`;
		// console.log(X,Y)
		return [Y, X]
	}
}
// //--------------------弹出层end----------------------//
//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
	switch (arguments.length) {
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
//图表配置**
var myDate = new Date,
	year = myDate.getFullYear(), //获取当前年
	mon = myDate.getMonth() + 1, //获取当前月
	date = myDate.getDate(),
	Chart_title = year + "年" + mon + "月" + date + "日" + '-实时数据';
function showMyTable(option) {
	$('.data_table_title').text(option.title)
	var XmaxNumFix = Math.ceil(Math.max.apply(null, option.data) / 100) * 100
	//console.log(XmaxNumFix)
	var XmaxNum = Math.max.apply(null, option.data)
	//X轴
	for (i = 1; i < 6; i++) {
		var dom = ".xitem" + i
		var height = (option.data[i] / XmaxNumFix) * 200;
		$(dom).css('height', height)
		var domtetx = ".xitem" + i + ' .xbar'
		$(domtetx).text(option.data[i])
	}
	//Y轴
	if (XmaxNum <= 100) {
		var arr = ['100', '50', '0']
		for (let index = 0; index < 3; index++) {
			$(document).ready(function () {
				$("<span></span>", {
					class: "ynumber",
					text: arr[index],
					style: `top:${index * 47}%`
				}).appendTo(".yAais")
			});
		}
	} else {
		var arr = [XmaxNumFix, XmaxNumFix / 5 * 4, XmaxNumFix / 5 * 3, XmaxNumFix / 5 * 2, XmaxNumFix / 5, 0]
		for (let index = 0; index < 6; index++) {
			$(document).ready(function () {
				$("<span></span>", {
					class: "ynumber",
					text: arr[index],
					style: `top:${index * 19}%`
				}).appendTo(".yAais")
			});
		}
	}
}
/**
 * 设置 弹幕DOM池 每一个通道最多六条弹幕
**/
function rolldata_init() {
	// console.log('初始化')
	let wrapper = document.getElementById('roll_box')
	// 先new一些span 重复利用这些DOM
	let doms = [];
	for (let i = 0; i < MAX_DM_COUNT; i++) {
		// 要全部放进wrapper
		let dom = document.createElement('span');
		wrapper.appendChild(dom);
		doms.push(dom);
		// 每次到transition结束的时候 就是弹幕划出屏幕了 将DOM位置重置 再放回DOM池
		dom.addEventListener('transitionend', () => {
			dom.style.transform = `translateX(480px)`;
			dom.style.visibility = `hidden`;
			// console.log('重置dom')
			domPool.push(dom);
		});
	}
	domPool = doms;
	// console.log(domPool)
}
/**
 * 根据DOM和弹幕信息 发射弹幕
 */
function shootDanmu(dom, text) {
	if (dom != 'undefined' || dom != '' || dom != null) {
		// console.log(dom.parentNode)
		dom.style.visibility = ``;
		// console.log('dom', dom, 'biu~ [' + text + ']');
		dom.innerText = text;
		dom.style.transition = `transform 16s linear`;
		dom.style.transform = `translateX(-${550 + dom.offsetWidth}px)`;
	}
}
