//表格实时监听
$(document).on('input', '#table-data td input', function() {
	if(this.value.length > 4) {
		this.value = this.value.slice(0, 4)
	}
	getTableData()
	showMyTable(myTable_option);
});
$(document).on('dblclick', "#table-data th", function() {
	var curDom = $(this)
	var curVal = $(this).text()
	//			var afterVal
	$(this).text('')
	$(this).append(`<input type="text" style="width:50px" id="curKey" name="tableKey" value="${curVal}" />`)
	$("#curKey").click(function() {
		$(this).select();
	});
	$("#curKey").on('blur', function() {
		curDom.text($(this).val());
		myTable_option.xText[curDom[0].cellIndex] = $(this).val()
		showMyTable(myTable_option);
	})
});
//添加
$(document).on('click', "#addGidItem", function() {
	console.log('+')
	myTable_option.xText.push('');
	myTable_option.data.push(100)
	console.log($(`.xitem${myTable_option.data.length}`))
	$(`.xitem${myTable_option.data.length-2}`).after(`<div class="xitem xitem${myTable_option.data.length-1}" style='margin-left:5px;background:${randomHexColor()}'>
						<div class="xbar"></div>
						<span class="xtext interval"></span>
	</div>`)
//	var a=$('.data_table').css('min-width').substr(0,$('.data_table').css('min-width').length-2)
//	$('.data_table').css('min-width',Number(a)+60)
	DatatableShow(true,myTable_option)
	showMyTable(myTable_option);
})
//OPT
$(document).on('click', "#table-opt input[name='scrollBar']", function() {
	ScrollShow(this.checked)
})
$(document).on('click', "#table-opt input[name='tableData']", function() {
	DatatableShow(this.checked,_option)
})
//**		全局变量			**//
//**		 				**//
var _isScrollBar = false;//滚动条
var _isDataTable = false;//表格
var _option
function ClearTable(option){
	_option=option
	var el=$(option.el)
	var childEl=$(`<div class="left_two">
			<div class="data_table_title">${option.title}</div>
			<div class="data_table">
				<div class="yAais">
				</div>
				<div class="xAais">
					<div style="height: 200px;width: 0;display: inline-block;margin-bottom: -4px;"></div>
					<div class="xitem xitem1">
						<div class="xbar">100</div>
						<span class="xtext interval">面试邀请</span>
					</div>
					<div class="xitem xitem2">
						<div class="xbar">858</div>
						<span class="xtext interval">参会企业</span>
					</div>
					<div class="xitem xitem3">
						<div class="xbar">300</div>
						<span class="xtext interval">在线企业</span>
					</div>
					<div class="xitem xitem4">
						<div class="xbar">50</div>
						<span class="xtext interval">在线人数</span>
					</div>
					<div class="xitem xitem5">
						<div class="xbar">500</div>
						<span class="xtext interval">求职人数</span>
					</div>
				</div>
			</div>
		</div>
		<div id="table-opt">
			<div class="opt-item">
				<label class="bui-switch-label bui-switch-anim">
		    		<input type="checkbox" name="scrollBar"/><i class="bui-switch"></i>
				</label>
				<span>缩放条</span>
			</div>
			<div class="opt-item">
				<label class="bui-switch-label bui-switch-anim">
	    			<input type="checkbox" name="tableData"/><i class="bui-switch"></i>
				</label>
				<span>图表数据</span>
			</div>		
		</div>`)
		console.log(childEl)
		el.html(childEl)
		showMyTable(option)
//	[0, 100, 50, 300, 251, 412]
}



function ScrollShow(_show) {
	//事件:滑块1.按下  onmousedown
	//2.拖动 onmousemove
	//3.松开 onmouseup
	// 		var moveX;
	if(_isScrollBar) {} else {
		$('.left_two').after(
			`<div class="scrollbarH">
						<span id="scroller"></span>
					</div>`
		)
		_isScrollBar = true;
	}
	if(_show) {
		$('.scrollbarH').show()
	} else {
		$('.scrollbarH').hide()
	}

	var box = document.getElementsByClassName('scrollbarH')[0]; //大盒子
	var btn = document.getElementById('scroller'); //滑块
	//按下
	btn.onmousedown = function(e) {
		var boxX = $('.scrollbarH').offset().left
		//				console.log(boxX)
		var downX = boxX; //按下按钮后与窗口的x轴间距
		$('#scroller').css('background-color', '#a6d2cf');
		$('#scroller').css('border-color', '#2DC1B7');
		document.onmousemove = function(e) {
			var moveX = e.clientX - boxX; //滑动的时候距离窗口的x轴的间距  滑动的x-按下的x             
			//只有在大于0的时候才拖动
			if(moveX > 0) {
				s = $('#scroller').css('left').substr(0, $('#scroller').css('left').length - 2)
				btn.style.left = moveX + 'px'; //滑块与左边的距离
				var ratio = Number(s) * 100 / 250
				$('.data_table').css('width', ratio + '%')
				console.log()
//				$(".xitem .xtext").css('margin-left', (ratio / 100) * 40 - 12)
//				$(".xitem .xtext").css('margin-left', ((ratio / 100)-0.6)*$('.xitem').outerWidth()-5)
				//最大时			
				if(ratio >= 50) {
					$('.xtext').removeClass('interval')
				} else
				if($('.data_table').outerWidth() < $('.left_two').outerWidth()) {
					$('.xtext').addClass('interval')
				}
				if(moveX >= (box.offsetWidth - btn.offsetWidth)) {
					btn.style.left = box.offsetWidth - btn.offsetWidth + 'px';
				} else {

				}
			}

		}
	}
	//松开
	document.onmouseup = function(e) {
		document.onmousemove = null;
		$('#scroller').css('background-color', '#fff');
		$('#scroller').css('border-color', '#8D8D8D');
	}
}


function DatatableShow(_show,option) {
	if(_isDataTable) {} else {
		$('.left_two').after(`<table id="table-data">
				<caption><div id="addGidItem"></div></caption>
				<tr></tr>
				<tr></tr></table>`)
		_isDataTable = true;
	}
	var th=''
	var td=''
	for(i=0;i<option.xText.length;i++){
		a=`${'<th>'+option.xText[i]+'</th>'}`
		b=`<td><input type="number" name="data${i+1}" value="${option.data[i+1]}"/></td>`
		th=th+a;
		td=td+b
//			console.log(typeof td)		
	}
	$('#table-data tr:eq(0)').html(th)
	$('#table-data tr:eq(1)').html(td)
	if(_show) {
		$('#table-data').show()
	} else {
		$('#table-data').hide()
	}
}

function getTableData() {
	console.log(_option.xText.length)
	for(i = 1; i < _option.xText.length+1; i++) {
		_tableData[i] = (Number($(`#table-data input[name='data${i}']`).val()))
	}
	myTable_option.data = _tableData;
}

function showMyTable(option) {
	console.log(option)
	$('.yAais').text('') //清空Y轴;
	$('.data_table_title').text(option.title)
	var XmaxNumFix = Math.ceil(Math.max.apply(null, option.data) / 100) * 100
	//			console.log(option.data)
	var XmaxNum = Math.max.apply(null, option.data)
	//			if(option.tableOpt){
	//				$()
	//			}
	//X轴
	console.log(option.data)
	for(i = 0; i <option.xText.length ; i++) {
		var dom = ".xitem" + (i+1)
		var height = (option.data[i+1] / XmaxNumFix) * 200;
		var width=(100/option.xText.length-3)
		$(dom).css('width', width+'%')
		$(dom).css('height', height)
		var domNum = ".xitem" + (i+1) + ' .xbar'
		$(domNum).css('width', width+'%')
		$(domNum).text(option.data[i+1])
		domText(i+1,option.xText[i])
	}
	//Y轴
	console.log('111')
	if(XmaxNum <= 100) {
		console.log('111')
		var arr = ['100', '50', '0']
		for(let index = 0; index < 3; index++) {
			$(document).ready(function() {
				$("<span></span>", {
					class: "ynumber",
					text: arr[index],
					style: `top:${index * 47}%`
				}).appendTo(".yAais")
			});
		}
	} else {
//		console.log('222')
		var arr = [XmaxNumFix, XmaxNumFix / 5 * 4, XmaxNumFix / 5 * 3, XmaxNumFix / 5 * 2, XmaxNumFix / 5, 0]
		for(let index = 0; index < 6; index++) {
			$(document).ready(function() {
				$("<span></span>", {
					class: "ynumber",
					text: arr[index],
					style: `top:${index * 19}%`
				}).appendTo(".yAais")
			});
		}
	}
}

function randomHexColor() { //随机生成十六进制颜色
 var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
 while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
  hex = '0' + hex;
 }
 return '#' + hex; //返回‘#'开头16进制颜色
}

function domText(i, text) {
	var domText = ".xitem" + i + ' .xtext'
	var tableTh = $('#table-data th').text()
	//		console.log(text)
	$(domText).text(text)
}