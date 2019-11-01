// // **********************************************//
// //				  Ajax请求				    	 //
// // **********************************************//
var jobSeekerList_result;//用来存储初始化之后的ajax数据
var companyList_result;
// var _ComTimer40;//实际请求时间
// var _PerTimer40;
var _isOnlineTimerDoing=false;

function _initAjax(){
    //招聘会信息
	getjobfairInfo(_jobfair_id);

    //获取图表信息
	getChartData();
    
    //报名
    signUp();
    //初始化滚动公告
    rolldata_init();

    //获取上线列表
    getOnlineList(_jobfair_id);

    //初始化公司列表
    getCompanyList(1, '',_jobfair_id)
    setVueData(0)//0为公司列表，1为学生列表

    //企业列表页码
	pageShow();
	//求职者列表页码
	pageShow2();
	//刷新时间
	updateTime(); 
}

//     //刷新时间
//     // updateTime();



//招聘会信息
function getjobfairInfo(jobfair_id) {
	$.ajax({
		type: "post",
		url: _getJobfairInfo,
		dataType: "json",
		data: { jobfair_id: jobfair_id },
		success: function (result) {
			// console.log(result)
			$('#jobfairTitle').text(result.data.jobfairTitle);
			cengci = result.data.cengci;
			isFairOver = result.data.runtime
			Vue_jobfairInfo.jobfairInfo = result.data
		},
		error: function (jqXHR) {
		}
	});
}

	// clearTimeout(_timeOut1);
    // clearInterval(_countdown1);
    // console.log(page)

//公司列表	clearTimeout(_timeOut1);
function getCompanyList(page, key, jobfair_id) {
	$.ajax({
		type: "post",
		url: _getJoinCompany,
		data: { page: page, key: key, jobfair_id: jobfair_id },
		dataType: "json",
		async: false,
		success: function (result) {
            console.log(result)
			companyList_result=result;
			// listVue.jobsList=companyList_result.data.list
			// listVue.firstCompany = companyList_result.data.firstCompany;
			// pageSum = companyList_result.data.pageSum;
		},
		error: function (jqXHR) {
			console.log('错误',jqXHR)
		}
	});
}


//获取职位可见列表并存储
function getJobSeekerList(page, key, jobfair_id){
	$.ajax({
		type: "post",
		url: _getJobSeeker,
		data: { page: page, key: key, jobfair_id: jobfair_id },
		dataType: "json",
		async: false,
		success:function(result){
			jobSeekerList_result = result;
			// console.log('******求职者列表*****',result)
			jobSeekerVue.jobSeekerList=jobSeekerList_result.data.list
			pageSum2 = jobSeekerList_result.data.list.pageSum;
		},
		error: function (jqXHR) {
		}
	});
}


function setVueData(list){
    if(list==0){
       //公司列表 
       listVue.jobsList=companyList_result.data.list
       listVue.firstCompany = companyList_result.data.firstCompany;
	   pageSum = companyList_result.data.pageSum;
    }else 
    if(list==1){
        //学生列表
        jobSeekerVue.jobSeekerList=jobSeekerList_result.data.list
		pageSum2 = jobSeekerList_result.data.list.pageSum;
    }
}
// console.log('ssss', result);
// listVue.jobsList = result.data.list;
// listVue.firstCompany = result.data.firstCompany;
// pageSum = result.data.pageSum;
// var count = 60;
// // console.log(result)
// _countdown1 = setInterval(function () {
//     // console.log(count+'zhao');
//     $('#hall_personal').val(`招聘大厅(${count})`);
//     count -= 1;
//     if (count < 1) {
//         clearInterval(_countdown1)
//     }
// }, 1000);

//报名
function signUp()
{
	$.ajax({
		type: "post",
		url: _is_signUp,
		// async:false,
		data:{jobfair_id:_jobfair_id},
		success: function (result) 
		{
			if(result.msg == 'success')
			{
				privacyPopup();
			}
		},
		error: function (jqXHR)
		{
		}
	});
}

//判断是否为已经登录且报名招聘会的个人用户
function judge()
{
	$.ajax({
		type: "post",
		url: _judge,
		data:{jobfair_id:_jobfair_id},
		async: false,
		success: function (result) 
		{
			if(result.msg == 'success')
			{
				_msg1 = result.msg;
			}else
			{
				if(result.msg == 'signUp')
				{
					layer.msg('请报名',{
						time:2000,					
						end:function(){

							privacyPopup();
						}
					});
				}else
				{
					layer.msg(result.msg)
				}
				
			}
			// console.log('bbb',result);
		},
		error: function (jqXHR)
		{
		}
	});
	//return _msg1;
}

function is_interview()
{
	$.ajax({
		type: "post",
		url: _is_interview,
		data:{jobfair_id:_jobfair_id},
		async: false,
		success: function (result) 
		{
			console.log(_jobfair_id)
			_msg3 = result.dialog;
			// console.log('bbb',result);
		},
		error: function (jqXHR)
		{
		}
	});
	//return _msg1;
}

function judgeCompany(status=0)
{
	$.ajax({
		type: "post",
		url: _judgeCompany,
		data:{jobfair_id:_jobfair_id},
		async: false,
		success: function (result) {
			// console.log(result.msg);
			if(result.msg == 'success')
			{
				_msg2 = result.msg;
			}else
			{
				if(status==0)
				{
					if (isFairOver == 1) {
						layer.msg('招聘会还未开始！')
					}
					if (isFairOver == 2) {
						//招聘会进行中
						layer.msg(result.msg)
					}
					if (isFairOver == 3) {
						layer.msg('招聘会已经结束！')
					} else { }
				}else
				{
					layer.msg(result.msg)
				}	
			}
		},
		error: function (jqXHR)
		{
		}
	});
	return _msg2;
}


//统计数据
function getChartData()
{
	$.ajax({
		type: "post",
		url: _getOnlineData,
		data:{jobfair_id:_jobfair_id},
		async: false,
		success: function (result) {
			if(result.msg == 'success')
			{
				_ary1[0] = 0;
				_ary1[1] = Number(result.data['interviewInvite']);
				_ary1[2] = Number(result.data['joinCompany']);
				_ary1[3] = Number(result.data['companyOnline']);
				_ary1[4] = Number(result.data['jobSeekerOnline']);
				_ary1[5] = Number(result.data['jobSeeker']);
				myTable_option = {
					title: Chart_title || "实时数据",
					//数据 第一个必须为0  
					data: _ary1,
				}			
				showMyTable(myTable_option);
				//_ary1 = result.data;
			}
			// console.log('xxx',_ary1);
		},
		error: function (jqXHR)
		{
		}
	});
}

//上线列表
function getOnlineList(jobfair_id) {
	$.ajax({
		type: "post",
		url: _getOnline,
		dataType: "json",
		data: { jobfair_id: jobfair_id },
		success: function (result) {
			//在线
			if (result.msg == 'success') {
				onlineVue.onlineList = result.data;
				// console.log('**********',onlineVue.onlineList)
				result.data.realTimeData.forEach(i => {
					_data.push(i)
				});
				//判断是否有计时器在运行，反正生成多个
				if (_isOnlineTimerDoing) { }
				else {
					_isOnlineTimerDoing = true;
					//每隔5s从弹幕池里获取弹幕（如果有的话）并发射
					 setInterval(() => {
						let dom = domPool.shift();
						let danmu						
                        danmu = onlineVue.onlineList.realTimeData.shift();							
						// console.log('弹幕',dom)
						// console.log(onlineVue.onlineList.realTimeData)
						shootDanmu(dom, danmu.name);
					 },5000);
				}
			}
			window.setTimeout("getOnlineList(_jobfair_id)", 61000);
		},
		error: function (jqXHR) {
		}
	});
}

//刷新数据时间
function updateTime() {
	$.ajax({
		type: "post",
		url: _updateTime,
		data:{jobfair_id:_jobfair_id},
		success: function (result) {
			// console.log('刷新')
			window.setTimeout("updateTime()", 60000);
		},
		error: function (jqXHR) {
		}
	});
}
// //******************Ajax-end***********************//
