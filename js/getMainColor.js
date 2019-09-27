
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

document.body.style.setProperty('--primary', '#7F583F');
  var varColor='#06980E';
function processData(data) {
				var processedData = []
//				console.log(data)
				var data = data.data;
				var length = data.length;
				console.log(length)
				
				var ratio = length <= 5000 ? 1 : Math.round(length / 5000)
				
				for(let i = 0; i <= length - 4; i = i + 4 * ratio) {
					var hue = getHue(data[i], data[i + 1], data[i + 2])
					processedData.push(data[i], data[i + 1], data[i + 2], hue)
					//console.log(processedData)
				}
				return { sortedData: sortByHue(processedData), total: processedData.length / 4 }
			}

			function getHue(r, g, b) {
				const max = Math.max(r, g, b)
				const min = Math.min(r, g, b)
				let hue = null
				switch(max) {
					case min:
						{
							return 0
						}
					case r:
						{
							hue = (g - b) / (max - min)
							break
						}
					case g:
						{
							hue = 2 + (b - r) / (max - min)
							break
						}
					case b:
						{
							hue = 4 + (r - g) / (max - min)
						}
				}
				hue = hue * 60
				if(hue > 360) hue = hue - 360
				if(hue < 0) hue = hue + 360
//				console.log(hue)/
				return Math.round(hue)
			}

			function sortByHue(a) {
//				console.log(a)
				let l = a.length
				let b = []
				let c = []
				let j = 0
				for(let i = 0; i <= 360; i++) {
					c[i] = []
				}
				for(let i = 0; i <= l - 4; i = i + 4) {
					c[a[i + 3]].push(a[i], a[i + 1], a[i + 2])
				}
				for(let i = 0; i <= 360; i++) {
					if(c[i].length) {
						b[j] = [i]
						b[j].push(c[i])
						j = j + 1
					}
				}
				console.log(b)
				return b
			}
	

			function binning(sortedData, total) {
				const binArr = []
				const rec = function(data) {
					const length = data.length
					const start = data[0][0]
					const end = data[length - 1][0]
					const mid = Math.floor((end + start) / 2)
					const data1 = []
					const data2 = []
					for(let i = 0; i <= length - 1; i++) {
						if(data[i][0] <= mid) {
							data1.push(data[i])
						} else {
							data2.push(data[i])
						}
					}
					if(shouldComplete(data1)) {
						const bin1 = new Bin(data1, total)
						binArr.push(bin1)
					} else {
						rec(data1)
					}
					if(shouldComplete(data2)) {
						const bin2 = new Bin(data2, total)
						binArr.push(bin2)
					} else {
						rec(data2)
					}
				}
				rec(sortedData)
				console.log(binArr)
				return binArr
			}

			function shouldComplete(data) {
				const length = data.length
				const start = data[0][0]
				const end = data[length - 1][0]
				let total = 0
				for(let i = 0; i <= length - 1; i++) {
					total = total + data[i][1].length
				}
				return total <= 3 || (end - start) <= 36
			}

			function mergeBins(binArr) {			
				let length = binArr.length
				console.log(length)
				if(!length) {
					throw new error('faild to extract colors')
				}
				let i = 0
				do {
					if(length === 1) {
						return
					}
//					console.log(binArr[i])
					if(binArr[i].trivial || getDistance(binArr[i + 1].average, binArr[i].average) <= 36) {
						//||binArr[i].average[0]>=240&&binArr[i].average[1]>=240&&binArr[i].average[2]>=240
//								console.log('距离过大，不重要，丢弃',binArr[i])
								binArr[i + 1].merge(binArr[i])
								binArr.splice(i, 1)
								length = length - 1
								continue
						}
					if(binArr[i].trivial==false&&getYUV(binArr[i].average)>=192){
						console.log('太浅',binArr[i])
								binArr[i].merge(binArr[i])
								binArr.splice(i, 1)
								length = length - 1
								continue
					}		
					i = i + 1
				} 
				while (i < length - 1)
				if(binArr[i].trivial) {				
					binArr[i].merge(binArr[i - 1])
					binArr.splice(i - 1, 1)
				}
			
				return binArr
			}
			function getYUV([r,g,b]){
				return r*0.299 + g*0.578 + b*0.114
			}

			function getDistance([r1, g1, b1], [r2, g2, b2]) {
				return Math.pow((r1 - r2), 2) + Math.pow((g1 - g2), 2) + Math.pow((b1 - b2), 2)
			}

			class Bin {
				constructor(data, total) {
					this.data = this.ignoreHue(data)
					this.total = total
					this.trivial = this.isTrivial()
					this.average = this.getAvarage()
				}
				ignoreHue(data) {
					return data.reduce((prev, curr) => {
						prev.push(...curr[1])
						return prev
					}, [])
				}
				merge(bin) {
					const newData = bin.data
					this.data = [...newData, ...this.data]
					this.trivial = this.isTrivial()
					this.average = this.getAvarage()
				}
				isTrivial() {
					return this.data.length / 3 <= Math.ceil(this.total / 50)
				}
				getAvarage() {
					let r = 0
					let g = 0
					let b = 0
					const data = this.data
					const length = data.length
					for(let i = 0; i <= length - 3; i = i + 3) {
						r = r + data[i]
						g = g + data[i + 1]
						b = b + data[i + 2]
					}
					return [r, g, b].map(v => Math.round(3 * v / length))
				}
			}

				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				var showimg = document.getElementById('showimg');
				var shadow = showimg.getElementsByTagName('span')[0];
				var css_code = document.getElementById('css_code');
	
	
	
	
	
		document.getElementById('img').onchange = function() {		
//					console.log(event)
					var img = event.target.files[0]
					var reader = new FileReader();
					reader.readAsDataURL(img);
					reader.onload = function(e) { // reader onload start 
						var image = new Image();
						image.src = e.target.result;
//						console.log(e.target.result)
						image.onload = function() { // image onload start 

							var img_width = this.width;
							var img_height = this.height;
							// 设置画布尺寸 
							canvas.width = img_width;
							canvas.height = img_height;
							// 将图片按像素写入画布 
							context.drawImage(this, 0, 0, img_width, img_height);

							// 读取图片像素信息 
							var imageData = context.getImageData(0, 0, img_width, img_height);//
//							var nweImageDataOne=getMainColor(imageData)
							//console.log(newImageDataOne)
							
							var { sortedData, total } = processData(imageData)
						  	var binArr = binning(sortedData, total)
						  	var result = mergeBins(binArr)
						  	console.log(result)
//							console.log(newImageData)
//							var binArr = binning(newImageData.sortedData, newImageData.total)
//							var res=mergeBins(binArr)
							//console.log(result)
							var rgbCost='rgb('+result[0].average+')'							
//							$('#img').css('background-color',rgbCost)
							console.log( rgb2hex(rgbCost))
							varColor=rgb2hex(rgbCost)
							//colorReplace('#06980E',rgb2hex(rgbCost))
						}
					}
				}
			// 
//function changImg(e) {
//				var file = e.target.files[0];
//				//实例化FileReader API
//				var freader = new FileReader();
//				freader.readAsDataURL(file);
//				freader.onload = function (e) {
//					// console.log(e.target.result);
//					$("#").attr("src", e.target.result);
//					$("#lisence").css('display', 'block')
//				}
//			}			
//}
  

			function rgb2hex(rgb) {
			    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
			    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			    function hex(x) {
			      return ("0" + parseInt(x).toString(16)).slice(-2);
			    }
			    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
			  }
			function colorReplace(findHexColor, replaceWith) {
  			// Convert rgb color strings to hex
			  // Select and run a map function on every tag
			  $('*').map(function(i, el) {
			    // Get the computed styles of each tag
			 
			    var styles = window.getComputedStyle(el);
			
			    // Go through each computed style and search for "color"
			    Object.keys(styles).reduce(function(acc, k) {
			    	
			      var name = styles[k];
			      var value = styles.getPropertyValue(name);
			     
			      if (value !== null && name.indexOf("color") >= 0) {
			        // Convert the rgb color to hex and compare with the target color
			        if (value.indexOf("rgb(") >= 0 && rgb2hex(value) === findHexColor) {
			        	  console.log(el)
			          // Replace the color on this found color attribute
			             
			          $(el).css(name, replaceWith);
			        }
			      }
			    });
			  });
			}