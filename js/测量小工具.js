
			window.onload = function () {
		
				var body = document.body;
				body.style.height = "1000px";
				body.style.width = "100%";
				<!--1:生成测量框-->
				var measureBox = document.createElement('div');
				measureBox.setAttribute("id","measureBox");
				measureBox.style = "display: none; position:fixed;";
				body.appendChild(measureBox);
				
				<!--1:生成 开始按钮-->
				var start = document.createElement('input');
				start.setAttribute("id","start");
				start.setAttribute("type","button");
				start.setAttribute("value","开始测距");
				start.style = "position: fixed;top: 0px";
				
				<!--1:生成 取消按钮-->
				var back = document.createElement('input');
				back.setAttribute("id","back");
				back.setAttribute("type","button");
				back.setAttribute("value","取消测距");
				back.style = "position: fixed;top: 0px;left:100px";
				
				<!--生成数据显示框-->
				var txt = document.createElement('textarea');
				txt.setAttribute("id","txt");
				txt.style = "position: fixed;width:200px;top: 30px;left:0px";
				
				<!--添加节点-->
				body.appendChild(start);
				body.appendChild(back);
				body.appendChild(txt);

				//开始键按下 --执行body的‘mousedown’监听函数
				start.onclick = function () {
					
					body.addEventListener('mousedown',mathM);

				}
				
				//取消键按下 --取消body的‘mousedown’监听函数
				back.onclick = function () {
					body.removeEventListener('mousedown',mathM);
					
				}
				
				//测量像素的方法
				function mathM(e) {
				
						e.preventDefault();
						e.stopPropagation();
						
						var p1x = e.clientX; //记录：鼠标按下第一个点x坐标
						var p1y = e.clientY; //记录：鼠标按下第一个点y坐标
						
						//测量框样式的其实点，和样式
						measureBox.style.display = 'block';
						measureBox.style.top = p1y + 'px'; //
						measureBox.style.left = p1x + 'px'; 
						measureBox.style.background = 'rgb(110,50,110,0.3)';
						measureBox.style.fontSize = "12px";
						//body监听鼠标移动的位置，得到实时坐标
						body.addEventListener("mousemove",move);

						function move(e2) {
							//实时改变测量框的宽度和数据显示
							measureBox.style.width = e2.clientX-p1x+"px";
							measureBox.style.height = e2.clientY-p1y+"px";
							measureBox.innerText = measureBox.style.width + 'px' + measureBox.style.height + "px";
							
						}

						body.addEventListener('mouseup',function () {
							body.removeEventListener('mousemove',move);

							txt.value = "width:"+measureBox.style.width+';'+"height:"+measureBox.style.height;
							//鼠标弹起结束
							measureBox.style.display = 'none';
						
							
			
						})
					
					}
				
	} 
			

