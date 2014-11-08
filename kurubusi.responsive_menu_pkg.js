



//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
//  kurubusi.responsive_menu Ver.1.0.03_publicbeta
//  2014-11-1
//  KURUBUSI.net === Masahiro Ohkubo
//  http://kurubusi.net/
//  kurubusi.responsive_menu_pkg.js
//*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*
/**
 *
 *@module KurubusiResponsiveMenu
 *
 */











KurubusiResponsiveMenu = function(){
	
	
	
	
	
	
	
	
	
	
	
	
	var switchArea = function(serchclass, serchtag) {
		var par = document,
				reg = new RegExp('(^| +)' + serchclass + '($| +)'),
				nodeList = [];
		
		if (serchtag === undefined) {
			serchtag = '*';
		}
		var el = par.getElementsByTagName(serchtag);
		for (var i = 0; i < el.length; i++) {
			if (reg.test(el[i].className)){
				nodeList.push(el[i]);
			}
		}
		return nodeList;
	};

	var addEventSet = function(elm,listener,fn){
		try { elm.addEventListener(listener,fn,false);}
		catch(e){ elm.attachEvent("on"+listener,fn);};
	};

	var addRemoveEvent = function(elm,listener,fn){
		try { elm.removeEventListener(listener,fn,false);}
		catch(e){ elm.detachEvent("on"+listener,fn);};
	};

	var extendDeep = function(parent, child){
		var i,
				toStr = Object.prototype.toString,
				astr = "[object Array]";
		child = child || {};
		for(i in parent){
			if(parent.hasOwnProperty(i)){
				if(typeof parent[i] === "object"){
					child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
					extendDeep(parent[i], child[i]);
				}else{
					child[i] = parent[i];
				}
			}
		}
		return child;
	};

	var addEventSet = function(elm,listener,fn){
		try { elm.addEventListener(listener,fn,false);}
		catch(e){ elm.attachEvent("on"+listener,fn);};
	};

	var addReadyFunction = function(func){
		if(document.addEventListener){
			document.addEventListener("DOMContentLoaded" , func , false);
		}else if(window.ActiveXObject){
			var ScrollCheck = function(){
				try {
					document.documentElement.doScroll("left");
				} catch(e) {
					setTimeout(ScrollCheck , 1 );
					return;
				} 
				// and execute any waiting functions
				func();
			}
			ScrollCheck();
		}
	}


	var uniqueId = function(){
		var randam = Math.floor(Math.random()*1000)
		var date = new Date();
		var time = date.getTime();
		return randam + time.toString();
	}


	var inferenceUa = function(){
		var UA = navigator.userAgent;
		if(UA.indexOf('iPhone') !== -1){
			return 'iPhone';
		}else if(UA.indexOf('iPad') !== -1){
			return 'iPad';
		}else if((UA.indexOf('Android') !== -1) && (UA.indexOf('Mobile') !== -1)){
			return 'AndroidMobile';
		}else if(UA.indexOf('Windows Phone') !== -1){
			return 'Windows Phone';
		}else if(UA.indexOf('BlackBerry') !== -1){
			return 'BlackBerry';
		}else{
			return 'PC';
		}
	};

	var isArray = function(o){
		return Object.prototype.toString.call(o) === '[object Array]';
	}

	//t:current time b:startcoordinates c:Distance d:necessary time
	var easing = function(t,b,c,d){
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	};

	var easeOutQuad = function (t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	var KurubusiSlider = function(obj){
		
		
		
		var Slider = function(){
			var this_ = this,
					args = Array.prototype.slice.call(arguments);
			
			this.w = (args[0].parlent && typeof args[0].parlent === "string") ? document.getElementById(args[0].parlent) : args[0].parlent;
			this.c = (args[0].target && typeof args[0].target === "string") ? document.getElementById(args[0].target) : args[0].target;
			this.speedrate = args[0].speedrate || 150;
			this.durationrateY = args[0].durationrateY || 5;
			this.durationrateX = args[0].durationrateX || 5;
			this.direction = args[0].direction || 'y';
			
			this.w.style.overflow = 'hidden';
			this.c.style.position = 'absolute';
			//this.w.style.position = 'relative';
			
			this.overdiv = document.createElement('div');
			this.overdiv.style.width = '100%';//(parseFloat(document.defaultView.getComputedStyle(this.c, '')['width'])) + 'px';
			this.overdiv.style.height = (parseFloat(document.defaultView.getComputedStyle(this.c, '')['height'])) + 'px';
			this.overdiv.style.position = 'absolute';
			//this.overdiv.style.opacity = '0.5';
			//this.overdiv.style.backgroundColor = 'red';
			this.overdiv.style.top = '0';
			this.overdiv.style.display = 'block';
			//this.overdiv.style.pointerEvents = 'auto';
			this.overdiv.style.left = '0';
			this.c.appendChild(this.overdiv);
			

			
			
			
			var flag = false;
			
			var pointx;
			var pointy;
			var flag = false;
			var pointobj;
			
			addEventSet(this.overdiv, "mousedown", function(event) {
				flag = true;
				
				pointy = event.clientY + document.documentElement.scrollTop;
				pointx = event.clientX + document.documentElement.scrollLeft;
				
				this_.overdiv.style.display = 'none';
				pointobj = document.elementFromPoint(pointx, pointy);
				this_.overdiv.style.display = 'block';
				
				//
			});
			addEventSet(this.overdiv, "mousemove", function(event) {
				if (!flag) return;
			});
			
			
			addEventSet(this.overdiv, "mouseup", function(event) {
				if (!flag) return;
				
				if(pointy === (event.clientY + document.documentElement.scrollTop) && pointx === (event.clientX + document.documentElement.scrollLeft)){
					if(pointobj.fireEvent){
						pointobj.fireEvent( "click" );
					}else{
						
						
						if(pointobj.tagName === 'INPUT' || pointobj.tagName === 'SELECT'){ 
							console.dir(pointobj);
							
							if(pointobj.type === 'submit' || pointobj.type === 'button' ){
								var evt = document.createEvent( "MouseEvents" );
								evt.initEvent( "click", false, true );
								pointobj.dispatchEvent( evt );
							}else{
								this_.overdiv.style.display = 'none';
								
								var evt = document.createEvent( "MouseEvents" );
								if(pointobj.tagName === 'SELECT'){
									evt.initEvent( "mousedown", false, true );
								}else{
									evt.initEvent( "click", false, true );
									pointobj.focus();
								}
								pointobj.dispatchEvent( evt );
								this_.overdiv.style.display = 'block';
								
							}
						}else{
							(function(obj){  
								if(obj.parentElement.tagName === 'BODY'){
									return;
								}else if(obj.parentElement.tagName !== 'A'){
									arguments.callee(obj.parentElement);
								}else{
									pointobj = obj.parentElement;
									return;
								}
							}(pointobj));
						}
						
						if(pointobj.tagName === 'A'){
							var evt = document.createEvent( "MouseEvents" );
							evt.initEvent( "click", false, true );
							pointobj.dispatchEvent( evt );
						}
						
						
						
					}
					
					
					
					
					
					
					
				}
				
			});
			
			
			
			
			
			
			
			var objstyleheight = this.objtComputedStyle(this.c, 'height'),
					objstylewidth = this.objtComputedStyle(this.c, 'width'),
					wheight = this.objtComputedStyle(this.w, 'height'),
					wwidth = this.objtComputedStyle(this.w, 'width');
			
			if(this.direction === 'y' && objstyleheight < window.document.documentElement.clientHeight){  
				this.c.style.height = document.documentElement.clientHeight + 'px';
			}
			this.managedMB(this.c);
			this.managedPCdrag(this.c);
			this.managedPCwheel(this.c);
			
			
		};
		
		
		//PC Wheel
		Slider.prototype.managedPCwheel = function(target){
			var this_ = this,
					begin,
					touchStartX,
					touchStartY,
					touchMoveX,
					touchMoveY,
					moveingObj = [],
					mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
			try{
				addEventSet(target, mousewheelevent, function(event){
					onWheel(event);
				});
			}catch(e){
				addEventSet(target, mousewheel, function(event){
					onWheel(event);
				});
			}
			var onWheel = function(event){
				if(!event) event = window.event; //for legacy IE
				var delta = event.deltaY ? -(event.deltaY) : event.wheelDelta ? event.wheelDelta : -(event.detail),
						objstylewidth = (this_.objtComputedStyle(target, 'width') || 0),
						objstyleheight = (this_.objtComputedStyle(target, 'height') || 0);
						objstyletop = (this_.objtComputedStyle(target, 'top') || 0),
						objstyleleft = (this_.objtComputedStyle(target, 'left') || 0),
						parlentoffsetY = 0,
						parlentoffsetX = 0;
						
				this_.stopEvent(event);
				begin = (new Date()).getTime();
				
				(function(p, y){
					if(p.offsetParent.nodeName !== 'BODY'){
						y += p.offsetTop;
						arguments.callee(p.offsetParent, y);
					}else{
						y += p.offsetTop;
						parlentoffsetY = y;
						return;
					}
				}(target, parlentoffsetY));
				
				moveingObj.push({
					'target': target,
					'touchMoveY': parlentoffsetY + delta,
					'touchStartY': parlentoffsetY,
					'touchMoveX': objstyleleft,
					'touchStartX': objstyleleft,
					'touchLayerX': 0,
					'touchLayerY': 0,
					'd_time': (((new Date()).getTime()) - begin)
				});
				this_.touchingMove(moveingObj);
				
			};
		};
		
		
		//PC Drag and drop
		Slider.prototype.managedPCdrag = function(target){
			var this_ = this,
					begin,
					touchStartX,
					touchStartY,
					touchMoveX,
					touchMoveY,
					flag = false,
					moveingObj = [];
			
			
			target.addEventListener("click",function(event) {
			},false);
			
			
			//mousedown
			addEventSet(target, "mousedown", function(event) {
				var parlentoffsetY = 0,
						parlentoffsetX = 0;
				
				//this_.stopEvent(event);
				begin = (new Date()).getTime();
				
				(function(p, y){
					if(p.offsetParent.nodeName !== 'BODY'){
						y += p.offsetTop;
						arguments.callee(p.offsetParent, y);
					}else{
						y += p.offsetTop;
						parlentoffsetY = y;
						return;
					}
				}(target, parlentoffsetY));
				(function(p, x){
					if(p.offsetParent.nodeName !== 'BODY'){
						x += p.offsetLeft;
						arguments.callee(p.offsetParent, x);
					}else{
						x += p.offsetLeft;
						parlentoffsetX = x;
						return;
					}
				}(target, parlentoffsetX));
				
				touchStartX = event.pageX || (event.clientX + document.documentElement.scrollLeft);
				touchStartY = event.pageY || (event.clientY + document.documentElement.scrollTop);
				touchLayerX = event.pageX - parlentoffsetX;
				touchLayerY = event.pageY - parlentoffsetY;
				
				flag = true;
			});
			
			//mousemove
			addEventSet(target, "mousemove", function(event) {
				if (!flag) return;
				this_.stopEvent(event);
				
				moveingObj.push({
					'target': target,
					'touchMoveY': event.pageY,
					'touchStartY': touchStartY,
					'touchMoveX': event.pageX,
					'touchStartX': touchStartX,
					'touchLayerX': touchLayerX,
					'touchLayerY': touchLayerY,
					'd_time': (((new Date()).getTime()) - begin)
				});
				
				if(moveingObj[0]){
					this_.touchingMove(moveingObj);
				}
			});
			
			//mouseout
			addEventSet(target, "mouseout", function(event) {
				flag = false;
				if(moveingObj[0]){
					this_.touchdMove(moveingObj);
					moveingObj.length = 0;
				}
			});
			
			//mouseup
			addEventSet(target, "mouseup", function(event) {
				flag = false;
				if(moveingObj[0]){
					this_.touchdMove(moveingObj);
					moveingObj.length = 0;
				}
			});
			
			
			
		};
		
		
		//MB
		Slider.prototype.managedMB = function(target){
			var this_ = this,
					begin,
					touchStartX,
					touchStartY,
					touchMoveX,
					touchMoveY,
					flag = false,
					moveingObj = [];
					
			//touchstart
			addEventSet(target, "touchstart", function(event) {
				var parlentoffsetY = 0,
						parlentoffsetX = 0;
				//this_.stopEvent(event);
				begin = (new Date()).getTime();
				
				(function(p, y){
					if(p.offsetParent.nodeName !== 'BODY'){
						y += p.offsetTop;
						arguments.callee(p.offsetParent, y);
					}else{
						y += p.offsetTop;
						parlentoffsetY = y;
						return;
					}
				}(target, parlentoffsetY));
				(function(p, x){
					if(p.offsetParent.nodeName !== 'BODY'){
						x += p.offsetLeft;
						arguments.callee(p.offsetParent, x);
					}else{
						x += p.offsetLeft;
						parlentoffsetX = x;
						return;
					}
				}(target, parlentoffsetX));
				
				touchStartX = event.touches[0].pageX;
				touchStartY = event.touches[0].pageY;
				touchLayerX = event.touches[0].pageX - parlentoffsetX;
				touchLayerY = event.touches[0].pageY - parlentoffsetY;
				
				//console.log(event.pageY - parlentoffsetY);  //208 mb
				
				flag = true;
			});
			
			//touchmove
			addEventSet(target, "touchmove", function(event) {
				if (!flag) return;
				this_.stopEvent(event);
				moveingObj.push({
					'target': target,
					'touchMoveY': event.changedTouches[0].pageY,
					'touchStartY': touchStartY,
					'touchMoveX': event.changedTouches[0].pageX,
					'touchStartX': touchStartX,
					'touchLayerX': touchLayerX,
					'touchLayerY': touchLayerY,
					'd_time': (((new Date()).getTime()) - begin)
				});
				
				if(moveingObj[0]){
					this_.touchingMove(moveingObj);
				}
			});
			
			//touchcancel
			addEventSet(target, "touchcancel", function(event) {
				flag = false;
				if(moveingObj[0]){
					this_.touchdMove(moveingObj);
					moveingObj.length = 0;
				}
			});
			
			//touchend
			addEventSet(target, "touchend", function(event) {
				flag = false;
				if(moveingObj[0]){
					this_.touchdMove(moveingObj);
					moveingObj.length = 0;
				}
			});
			
		};
		
		
		//repeatedly mouse
		Slider.prototype.touchingMove = function(moveobj){
			var this_ = this,
					lastobj = moveobj[moveobj.length-1],
					objstyletop = (this.objtComputedStyle(lastobj.target, 'top') || 0),
					objstyleleft = (this.objtComputedStyle(lastobj.target, 'left') || 0),
					objstylebottom = (this.objtComputedStyle(lastobj.target, 'bottom') || 0),
					objstyleright = (this.objtComputedStyle(lastobj.target, 'right') || 0),
					objstylewidth = (this.objtComputedStyle(lastobj.target, 'width') || 0),
					objstyleheight = (this.objtComputedStyle(lastobj.target, 'height') || 0),
					wwidth = this.objtComputedStyle(this.w, 'width'),
					wheight = this.objtComputedStyle(this.w, 'height'),
					wtop = this.objtComputedStyle(this.w, 'top'),
					wleft = this.objtComputedStyle(this.w, 'left'),
					moveY,
					moveX,
					parlentoffsetY = 0,
					parlentoffsetX = 0;
			
			
			(function(p, y){
				if(p.offsetParent.nodeName !== 'BODY'){
					y += p.offsetTop;
					arguments.callee(p.offsetParent, y);
				}else{
					y += p.offsetTop;
					parlentoffsetY = y;
					return;
				}
			}(this.w, parlentoffsetY));
			
			(function(p, x){
				if(p.offsetParent.nodeName !== 'BODY'){
					x += p.offsetLeft;
					arguments.callee(p.offsetParent, x);
				}else{
					x += p.offsetLeft;
					parlentoffsetX = x;
					return;
				}
			}(this.w, parlentoffsetX));
			
			moveY = (lastobj.touchMoveY - parlentoffsetY) - lastobj.touchLayerY;
			moveX = (lastobj.touchMoveX - parlentoffsetX) - lastobj.touchLayerX;
			
			if(this.direction === 'x'){
				if(wwidth - (parseFloat(document.defaultView.getComputedStyle(lastobj.target, '')['width'])) > moveX){
					moveX = wwidth - (parseFloat(document.defaultView.getComputedStyle(lastobj.target, '')['width']));
				}else if(moveX > 0){
					moveX = 0;
				}
				lastobj.target.style.left = moveX + 'px';
			}else{
				if(wheight - (parseFloat(document.defaultView.getComputedStyle(lastobj.target, '')['height'])) > moveY){
					moveY = wheight - (parseFloat(document.defaultView.getComputedStyle(lastobj.target, '')['height']));
				}else if(moveY > 0){
					moveY = 0;
				}
				lastobj.target.style.top  = moveY + 'px';
			}
			
			
			
			
			
			
			
			
			
			
		};
		
		//After having separated it
		Slider.prototype.touchdMove = function(moveobj){
			var this_ = this,
					lastobj = moveobj[moveobj.length-1],
					moveobjlength = moveobj.length,
					objstyletop = (this.objtComputedStyle(lastobj.target, 'top') || 0),
					objstyleleft = (this.objtComputedStyle(lastobj.target, 'left') || 0),
					objstylewidth = (this.objtComputedStyle(lastobj.target, 'width') || 0),
					objstyleheight = (this.objtComputedStyle(lastobj.target, 'height') || 0),
					wwidth = this.objtComputedStyle(this.w, 'width'),
					wheight = this.objtComputedStyle(this.w, 'height'),
					begin = new Date(),
					x,
					moveX,
					y,
					moveY,
					duration,
					dr,
					toX,
					toY,
					speed,
					recently = [];
			
			
			for(var i = 1; i <= 10; i++){ //
				if(moveobj[moveobjlength - i]){
					recently.unshift(moveobj[moveobjlength - i]);
				}
			}
			
			dr = Math.sqrt(Math.pow((recently[recently.length-1].touchMoveX - recently[0].touchMoveX),2) + Math.pow((recently[recently.length-1].touchMoveY - recently[0].touchMoveY),2));  //
			
			speed = dr / (recently[recently.length-1].d_time - recently[0].d_time);
			duration = speed * this.speedrate;  /////////////////
			
			moveX = (recently[recently.length-1].touchMoveX - recently[0].touchMoveX) * this.durationrateX;//
			moveY = (recently[recently.length-1].touchMoveY - recently[0].touchMoveY) * this.durationrateY;//
			
			
			toX = objstyleleft + moveX; //
			toY = objstyletop + moveY;
			
			
			if(duration && duration > 100){  //
				var timer = setInterval(function(){
					var time = new Date() - begin,
							cuY = easeOutQuad(time, objstyletop, moveY, duration),
							cuX = easeOutQuad(time, objstyleleft, moveX, duration);
					if (time > duration){
						clearInterval(timer);
						cuX = toX;
						cuY = toY;
					}
					if(this_.moveflg){
						clearInterval(timer);
					}
					if(this_.direction === 'x'){
						if(wwidth - (parseFloat(document.defaultView.getComputedStyle(lastobj.target, '')['width'])) > cuX){
							cuX = wwidth - (parseFloat(document.defaultView.getComputedStyle(lastobj.target, '')['width']));
							clearInterval(timer);
						}else if(cuX > 0){
							cuX = 0;
							clearInterval(timer);
						}
						lastobj.target.style.left = cuX + 'px';
					}else{
						if(wheight - (parseFloat(document.defaultView.getComputedStyle(lastobj.target, '')['height'])) > cuY){
							cuY = wheight - (parseFloat(document.defaultView.getComputedStyle(lastobj.target, '')['height']));
							clearInterval(timer);
						}else if(cuY > 0){
							cuY = 0;
							clearInterval(timer);
						}
						lastobj.target.style.top = cuY + 'px';
					}
					
					
					
				},10);
			}
			
		};
		
		
		//preventDefault
		Slider.prototype.stopEvent = function(event){
			if (event.preventDefault) {
				event.preventDefault();
			}
			event.returnValue = false;
		};
		
		//
		Slider.prototype.objtComputedStyle = function(obj, properties){
			return parseFloat((obj.currentStyle || document.defaultView.getComputedStyle(obj, ''))[properties]);
		};
		
		
		
		
		
		
		new Slider(obj);
	}; //-- KurubusiSlider --//
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	var ResponsiveMenu = function(button){
		
		var this_ = this;
		this.buttonelm = button;
		this.elmgroup = this.buttonelm.getAttribute('data-krm-group');
		this.breakpoint = this.buttonelm.getAttribute('data-krm-breakpoint') || breakpoint;
		this.fadeto = this.buttonelm.getAttribute('data-krm-fadeto');
		this.groupnav = [];
		this.idname = uniqueId();
		
		
		
		this.menuflg;
		this.menuopenflg;
		this.screenflg;
		
		this.mobilediv_w = document.createElement('div');
		this.mobilediv_w.className = 'k_mobile_obj';
		this.mobilediv_w.id = 'k_mobile_obj' + this.idname;
		this.mobilediv_w.style.display = 'none';
		this.mobilediv_w.style.overflow = 'scroll';
		this.mobilediv_w.style.position = 'absolute';
		this.mobilediv_w.style.zIndex = '10010';
		
		
		this.mobilediv = document.createElement('div');
		this.mobilediv.style.width = '94%';
		this.mobilediv.className = 'k_mobile_inner';
		this.mobilediv_w.appendChild(this.mobilediv);
		
		this.transparentdiv = document.createElement('div');
		this.transparentdiv.className = 'transparentdiv';
		this.transparentdiv.id = 'transparentdiv' + this.idname;
		this.transparentdiv.style.position = 'absolute';
		this.transparentdiv.style.zIndex = '10000';
		
		this.scrollwindow = function(event){
			if(inferenceUa() === 'PC'){
				this_.close(this_.fadeto);
			}
		}
		
		
		
		
		switch (this.fadeto){
			case 'right':
				this.mobilediv_w.style.transition = 'right 0.1s ease-out 0ms';
				break;
			case 'top':
				this.mobilediv_w.style.transition = 'top 0.1s ease-out 0ms';
				break;
			default:
				this.mobilediv_w.style.transition = 'left 0.1s ease-out 0ms';
				break;
		}
		
		for( var i = 0; i < navElem.length; i++ ){
			if(navElem[i].getAttribute('data-krm-group') === this.elmgroup){
				var insertdiv_ = document.createElement('div');
				insertdiv_.innerHTML = navElem[i].innerHTML;
				this.mobilediv.appendChild(insertdiv_);
				this.groupnav.push(navElem[i]);
			}
		}
		
		
		addEventSet(this.buttonelm, 'click', function(event){
			this_.fadeSpNav(event);
		});
		addEventSet(this.transparentdiv, 'click', function(event){
			this_.close(this_.fadeto);
		});
		addEventSet(this.transparentdiv, 'touchstart', function(event){
			this_.close(this_.fadeto);
		});
		try{
			addEventSet(this.transparentdiv, 'mousewheel', function(event){
				if (event.preventDefault) {
					event.preventDefault();
				}
				event.returnValue = false;
			});
		}catch(e){
			addEventSet(this.transparentdiv, 'mousewheelevent', function(event){
				if (event.preventDefault) {
					event.preventDefault();
				}
				event.returnValue = false;
			});
		}
		
		
		
		
	};


	ResponsiveMenu.prototype.change = function(){
		
		var this_ = this,
				args = Array.prototype.slice.call(arguments);
		
		
		if(window.innerWidth < this.breakpoint){
			this.screenflg = 0;  //Smaller
			if(this.menuopenflg === 1){
				if(args[0].type === 'orientationchange'){
					this.close(this.fadeto);
				}
				
			}
		}else{
			this.screenflg = 1;  //Larger
		}
		
		if(this.menuflg !== this.screenflg){
			if(window.innerWidth < this.breakpoint){
				
				this.buttonelm.style.display = 'block';
				for( var i = 0; i < this.groupnav.length; i++ ){
					this.groupnav[i].style.display = "none";
				}
				
				document.body.appendChild(this.transparentdiv);
				document.body.appendChild(this.mobilediv_w);
				
				
				this.mobilediv_w.style.display = 'block';
				this.mobilediv_w.style.width = this.navwidth(this.fadeto);
				this.mobilediv_w.style.height = this.navheight(this.fadeto);
				
				KurubusiSlider({
					target: this.mobilediv,
					parlent: this.mobilediv_w,
					speedrate: 120,
					durationrateY: 3,
					direction: 'y'
				});
				
				
				this.menuopenflg = 0;
				this.close(this.fadeto);
				
			}else{
				
				var anode, bnode;
				if(aNode = document.getElementById('transparentdiv' + this.idname)){
					aNode.parentNode.removeChild(aNode);
				}
				if(bNode = document.getElementById('k_mobile_obj' + this.idname)){
					bNode.parentNode.removeChild(bNode);
				}
				this.close(this.fadeto);
				this.buttonelm.style.display = 'none';
				for( var i = 0; i < this.groupnav.length; i++ ){
					this.groupnav[i].style.display = "block";
				}
				
			}
			this.menuflg = this.screenflg;
		}
		
		
	};

	ResponsiveMenu.prototype.fadeSpNav = function(event){
		if(this.menuopenflg === 0){
			this.open(this.fadeto);
		}else{
			this.close(this.fadeto);
		}
	};

	ResponsiveMenu.prototype.close = function(event){
		var this_ = this;
		
		
		this.transparentdiv.style.display = 'none';
		this.mobilediv_w.style.display = 'none';
		//document.body.style.position = 'static';
		
		
		switch (event){
			case 'right':
				this.mobilediv_w.style.top = this.getScrollPosition().y + 'px';
				this.mobilediv_w.style.right = '-' + this.navheight(this.fadeto);
				
				break;
			case 'top':
				this.mobilediv_w.style.top = '-' + this.navheight(this.fadeto);
				break;
				break;
			default:
				this.mobilediv_w.style.top = this.getScrollPosition().y + 'px';
				this.mobilediv_w.style.left = '-' + this.navwidth(this.fadeto);
				
				break;
		}
		
		addRemoveEvent(document , 'scroll', this_.scrollwindow);
		
		this.menuopenflg = 0;
	};

	ResponsiveMenu.prototype.open = function(event){
		
		//document.body.style.height = '100%';
		
		var this_ = this,
				scrolltop_ = this.getScrollPosition().y + 'px';
		
		this.transparentdiv.style.display = 'block';
		this.transparentdiv.style.top = scrolltop_;
		
		this.mobilediv_w.style.display = 'block';
		
		//var pastwidth = document.body.style.width;
		
		this.mobilediv_w.style.width = this.navwidth(this.fadeto);
		this.mobilediv_w.style.height = this.navheight(this.fadeto);
		this.transparentdivstyle();
		
		addEventSet(document , 'scroll', this_.scrollwindow);
		
		
		
		switch (event){
			case 'right':
				this.mobilediv_w.style.top = scrolltop_;
				this.mobilediv_w.style.right = 0;
				
				break;
			case 'top':
				this.mobilediv_w.style.top = scrolltop_;
				this.mobilediv_w.style.left = '0';
				break;
			default:
				this.mobilediv_w.style.top = scrolltop_;
				
				this.mobilediv_w.style.left = '0';
				
				break;
		}
		
		this.menuopenflg = 1;
	};

	ResponsiveMenu.prototype.navwidth = function(event){
		var width_;
		switch (event){
			case 'top':
				width_ = document.documentElement.clientWidth + 'px';
				break;
			default:
				width_ = (( document.documentElement.clientWidth / 4 ) * 3) + 'px';
				break;
		}
		
		return width_;
	};

	ResponsiveMenu.prototype.navheight = function(event){
		var height_;
		switch (event){
			case 'right':
				height_ = document.documentElement.clientHeight + 'px';
				break;
			case 'top':
				height_ = (( document.documentElement.clientHeight / 4 ) * 3) + 'px';
				break;
			default:
				height_ = document.documentElement.clientHeight + 'px';
				break;
		}
		return height_;
	};

	ResponsiveMenu.prototype.transparentdivstyle = function(){
			this.transparentdiv.style.width =  document.documentElement.clientWidth + 'px';
			this.transparentdiv.style.height = document.documentElement.clientHeight + 'px';
	};

	ResponsiveMenu.prototype.getScrollPosition = function(e) {
		var obj = new Object();
		obj.x = document.documentElement.scrollLeft || document.body.scrollLeft;
		obj.y = document.documentElement.scrollTop || document.body.scrollTop;
		return obj;
	}

	ResponsiveMenu.prototype.bodyContentsHeight = function() {
		var h = Math.max.apply( null, [document.body.clientHeight , document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight] ); 
		return h;
	}






	
	
	
	
	
	
	
	
	
	
	
	var buttonElem,
			navElem,
			breakpoint = 800,
			navarr = [];
	
	
	
	
	addReadyFunction(function(){
		
		buttonElem = switchArea('k_nav_b'),
		navElem = switchArea('k_target_obj');
		
		
		for( i = 0; i < buttonElem.length; i++ ){
			navarr[i] = new ResponsiveMenu(buttonElem[i]);
			navarr[i].change();
		}
		
		addEventSet(window, 'resize', function(e){  //
			if(inferenceUa() === 'PC'){
				for( i = 0; i < navarr.length; i++ ){
					navarr[i].change(e);
				}
			}
		});
		
		addEventSet(window, 'orientationchange', function(e){  //
			for( i = 0; i < navarr.length; i++ ){
				navarr[i].change(e);
			}
		});
		
		
	});
	
	
	
	
	
	
	
	
	
}; //-- KurubusiResponsiveMenu --//



new KurubusiResponsiveMenu();


