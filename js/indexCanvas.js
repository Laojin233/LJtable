//
function IEVersion() {
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
            var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
            var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
            if(isIE) {
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                if(fIEVersion == 7) {
                    return 7;
                } else if(fIEVersion == 8) {
                    return 8;
                } else if(fIEVersion == 9) {
                    return 9;
                } else if(fIEVersion == 10) {
                    return 10;
                } else {
                    return 6;//IE版本<=7
                }   
            } else if(isEdge) {
                return 'edge';//edge
            } else if(isIE11) {
                return 11; //IE11  
            }else{
                return -1;//不是ie浏览器
            }
        }
if(IEVersion()<9&&IEVersion()!=-1){
	alert('浏览器不支持Canvas，请升级至更高版本')
}else{
	//获取画布
	var canvas = document.getElementById('indexCanvas');
	//设置画笔
	var ctx=canvas.getContext("2d")
	//绘制图形
	var canvas_w=canvas.width;
	var canvas_h=canvas.height;
	ctx.strokeStyle=(new Color(155).style)
	console.log(canvas_w,canvas_h)
	window.requestAnimationFrame(animatePoints);//开启动画
}

var points={
	nb:300,
	distance:100,
	d_radius:150,
}
var point_obj=[]


//console.log(ctx.strokeStyle)

function drawPoint(){
	for (var i=0;i<points.nb;i++) {
		
		point_obj.push(new Point());
		var dot=point_obj[i];
		//console.log(dot)
		dot.draw()
	}

}
//设置点对象
function Point(){
	this.x= Math.random()*canvas_w;
	this.y=Math.random()*canvas_h;
	this.vx=-.5+Math.random()
	this.vy=-.5+Math.random()
	this.radius=Math.random()*2
	this.color=new Color();
}
Point.prototype={
	draw:function(){
		ctx.beginPath();
//		this.color=new Color();//启用闪烁
		ctx.fillStyle=this.color.style;
		ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
		ctx.fill()
	}
}

function colorValue(min){
	return Math.floor(Math.random()*255+min)
}

function Color(min){
	min=min||0;
	this.r=colorValue(min)
	this.g=colorValue(min)
	this.b=colorValue(min)
	this.style= 'rgb('+this.r+','+this.g+','+this.b+')';
}

function drawBackground(){
	var my_gradient=ctx.createLinearGradient(0,0,0,canvas_w);
	my_gradient.addColorStop(0,"black");
	my_gradient.addColorStop(0.3,"#090723")
	my_gradient.addColorStop(1,"#2b2573");
	ctx.fillStyle=my_gradient;
	ctx.fillRect(0,0,canvas_w,canvas_h);
}
//
var start=null


function animatePoints(timestamp){
//	
	if (!start) start=timestamp ;
	var progress = timestamp - start;
	 	ctx.clearRect(0,0,canvas_w,canvas_h) 	
		drawBackground();
		drawPoint();
		movePoints()
	 // if (progress < 2000) { //启用动画时长2000ms
	    window.requestAnimationFrame(animatePoints);
	 // }
}

function movePoints(){
	for (var i=0;i<points.nb;i++) {
		var point=point_obj[i];
		if (point.x<0||point.x>canvas_w) {
			point.vx=-point.vx;
			point.vy=point.vy;
		} 
		else if(point.y<0||point.y>canvas_h){
			point.vx=point.vx;
			point.vy=-point.vy;
		}
		point.x+=point.vx;
		point.y+=point.vy;
	}
}
///////-----------------------------------------------------------------------///
function showExplain() {
			$('#uploadExplain').show()
			var confirmBtn = $('#confirmButton');
			var explainClose = $('#explainClose')
			explainClose.css("display", "block");
		}

function hideExplain() {
			console.log('xxxx')
			$('#uploadExplain').hide()
		}

var portraitPath;

	
//	var doc = document.getElementById("explainClose");
//	console.log(doc)
//	//formdata.append("file", doc.files[0]);
//  if($(this).val() != 'undefined'){
//  	
//      var strExtension = $(this).val().substr($(this).val().lastIndexOf('.') + 1);
//      if (strExtension != 'jpg' && strExtension != 'gif' && strExtension != 'png' && strExtension != 'bmp') {
//          alert("请选择图片文件！");
//      }else{
//          portraitPath = $(this).val();
//          console.log(portraitPath);         
//		    $("#lisence").attr('src',portraitPath);
//			$("#lisence").css('display', 'block')
////			$("#lisence").before($("#lisence"));
//      }
//  }
//});

function PreviewImage(imgFile)
{
//	console.log(xx)
	console.log('xxxx')
	
    var filextension=imgFile.value.substring(imgFile.value.lastIndexOf("."),imgFile.value.length);
    filextension=filextension.toLowerCase();
    
    if ((filextension!='.jpg')&&(filextension!='.gif')&&(filextension!='.jpeg')&&(filextension!='.png')&&(filextension!='.bmp'))
    {
        alert("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
        imgFile.focus();
    }
    else
    {
    	console.log(imgFile)
        var path;
        if(IEVersion()==8)//IE
        { 
//      	document.getElementById('explainClose').blur();
//          imgFile.select();
//          path = document.selection.createRange().text;
//          document.getElementById("lisence").innerHTML="";
//			console.log(path)		
//          document.getElementById("lisence").style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")";//使用滤镜效果      
        	imgFile.select();
            imgFile.blur();
            path = document.selection.createRange().text;
            console.log('这是')
            console.log(path)
            document.getElementById("lisence").innerHTML="";
            document.getElementById("lisence").style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")";//使用滤镜效果      
     		
     		$('#lisence').css('display','block');
     		//$('#uploadExplain').css('display','none');
        }
        else//FF
        {
        	console.log('1')
        	$('#uploadExplain').hide();
//          path=window.URL.createObjectURL(event.target.target.files.item[0]);// FF 7.0以上
//          //path = imgFile.files[0].getAsDataURL();// FF 3.0
//          console.log(path)
//          $("#lisence").attr("src", path);
//			$("#lisence").css('display', 'block')
            //document.getElementById("lisence").innerHTML = "<img id='img1' width='120px' height='100px' src='"+path+"'/>";
            //document.getElementById("img1").src = path;
        }
    }
}

function changImg(e) {
			
	//console.log(e.target.);
	if (IEVersion()==8||IEVersion()<8&&IEVersion()!=-1) 
	{
			console.log('这是IE8或更低');
			
	} 
	else
	{
		console.log('这不是IE8');
			// console.log(e.target.result)
			for (var i = 0; i < e.target.files.length; i++) {
				var file = e.target.files.item(i);
				console.log(typeof file,file)
				if (!(/^image\/.*$/i.test(file.type))) {
					continue; //不是图片 就跳出这一次循环
				}
				//实例化FileReader API
				var freader = new FileReader();
				freader.readAsDataURL(file);
				freader.onload = function (e) {
					// console.log(e.target.result);
					$("#lisence").attr("src", e.target.result);
					$("#lisence").css('display', 'block')
				}
			}
	}
			
}
//
//var image={
//	
//}

/////---------------------------------------////////////
	var rex= document.getElementById('submitButton').getBoundingClientRect()
	var vx=rex.left+rex.width/2
	var vy=rex.bottom;
function moveFire(speed){
	console.log(vy)
	vy-=30;
//	ctx.beginPath();
//	ctx.lineWidth="6";
//	ctx.strokeStyle="red";
////	ctx.rect(vx,vy,100,150) ;
//	ctx.stroke();
	var img=new Image();
	img.src='img/huojian.png';
	ctx.drawImage(img,vx,vy,100,150,);
	
}
	
function submitAnimate(timestamp){
	if (!start) start=timestamp ;
	var progress = timestamp - start;
	moveFire(60)
	if (progress < 2000) { //启用动画时长2000ms
	    window.requestAnimationFrame(submitAnimate);	   	
	}
//	  if (progress > 2000) { //启用动画时长2000ms
//	  	console.log('jiesu')
//	  	console.log(timestamp)
//	  	timestamp=0;
//	    vy=rex.bottom;
//	    progress=0;
//	  }
}

	//

function submit(){
	console.log(vy)
	window.requestAnimationFrame(submitAnimate);
}
