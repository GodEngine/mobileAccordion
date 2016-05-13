	;
	 (function(){

	 	//缓存图片减少频繁获取dom元素
	 	var img_cache = $(".inner");

		//判断是否为首尾图片，不是的情况下移除当前元素的touch处理事件
		var ifAnimate = function (ele,arg){
    		/*var nextOne = ele.nextSibling,
    		previousOne = ele.previousSibling;

    		nextOne = nextOne.nodeType==3?nextOne.nextSibling:nextOne;
    		previousOne = previousOne.nodeType==3?previousOne.previousSibling:previousOne;*/

    		var nextOne = ele.nextElementSibling,
			previousOne = ele.previousElementSibling;
    		if(!previousOne && arg) {
    			return false;
    		}else if(!nextOne && !arg){
    			return false;
    		};

    		ele.classList.remove("active");
    		handler.eventRemove.call(ele);

    		arg?previousOne.classList.add("active"):nextOne.classList.add("active");
    		var blindObj = document.querySelector(".active");
    		handler.eventBind.call(blindObj);
    		return true;
        };

	 	//事件处理对象，包括touch事件处理、监听和移除
		 var handler = {
			"touchstart": function(e){
	    		e.stopPropagation();
				e.preventDefault();                            //阻止页面默认的滑动事件（尤其是微信中下拉时恶心人的‘x5内核提供...’提示）
	    		this.start_.X = e.touches[0].screenX;
	    		this.start_.Y = e.touches[0].screenY;
	    	},
	    	"touchmove": function(e){
	    		e.stopPropagation();
				e.preventDefault();
	    		this.end_.X = e.touches[0].screenX;
	    		this.end_.Y = e.touches[0].screenY;
	    	},
	    	"touchend": function(e){
	    		e.stopPropagation();
				e.preventDefault();
	    		if (this.start_.Y < this.end_.Y) {				    		  			
					animate._AnimateDown(this);
				} else {
					animate._AnimateUp(this);
				};
	    	},
	    	"eventBind": function(){
		    	this.start_={},this.end_={};
		    	this.addEventListener('touchstart',handler.touchstart, false);
		    	this.addEventListener('touchmove',handler.touchmove, false);
		    	this.addEventListener('touchend',handler.touchend, false);
	    	},
	    	"eventRemove": function(){
		    	this.removeEventListener('touchstart',handler.touchstart,false);
		   		this.removeEventListener('touchmove',handler.touchmove, false);
		    	this.removeEventListener('touchend',handler.touchend, false);
	    	}
		};

		//动画处理对象，包括当前元素上滑动与下滑动，整体元素的上移
		var animate = {
			_AnimateUp: function(obj){
				if(!ifAnimate(obj,false))return;

				img_cache.map(function(){
					var top = $(this).css("top");
					top = parseInt(top)-40+"px";
					$(this).animate({top:top},500,'ease-out');
				});

				$(obj).animate({
		        top:
		        '-300px'
		        }, 500,
		        'ease-out');
			},
			_AnimateDown: function(obj){
				if(!ifAnimate(obj,true))return;
				//var priviousOne = obj.previousSibling.previousSibling;
				var priviousOne = obj.previousElementSibling;
	
				img_cache.map(function(){
					var top = $(this).css("top");
					top = parseInt(top)+40+"px"; 
					$(this).animate({top:top},500,'ease-out');
				});

				$(priviousOne).animate({
		        top:
		        '0px'
		        }, 500,
		        'ease-out');
			}
		};

        $(function(){
			var mySwiper = new Swiper ('.swiper-container', {	    
			    pagination: '.swiper-pagination'   
			 });

			var target = document.querySelector(".active");
			handler.eventBind.call(target);
		})

	 })();