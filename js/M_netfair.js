//背景画布
var canvas = document.getElementById('indexCanvas');
		var ctx = canvas.getContext('2d');
		var _width = canvas.width = canvas.offsetWidth;
		var _height = canvas.height = canvas.offsetHeight;
		var leftDot = rightDot = _height * 0.5  //起始点和终点高度
		var leftDotSpeed = 0.2;
		var rightDotSpeed = 0.16;
		var n = 0;
		window.requestAnimationFrame =  window.requestAnimationFrame ||
																		window.mozRequestAnimationFrame ||
																		window.webkitRequestAnimationFrame ||
																		window.msRequestAnimationFrame;
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
			drawWater(n,'#92dcd8', leftDot, rightDot)
			requestAnimationFrame(run);
		}

///
//var myScroll = new IScroll('.main_list-jobs');

///
//		window.onload = function () {
//      document.querySelector("#roll1").onclick = function () {
//          document.querySelector("#roll_top").scrollIntoView(false);
//      };
//      document.querySelector("#roll2").onclick = function () {
//          document.querySelector("#roll_top").scrollIntoView(true);
//      };
// }