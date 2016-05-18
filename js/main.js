
	 ;(function(){
	 	var lock = true;

		var img_cache = $(".inner"),
		sliderArea = document.querySelector("#sliderArea"),
		main_focus = document.querySelector(".main_focus"),
		total = 3;
		//判断是否为首尾图片，不是的情况下移除当前元素的touch处理事件
		var ifAnimate = function (ele,arg){
/*    		var nextOne = ele.nextSibling,
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
    		handler.eventRemove.call(ele,"Vertical");

    		arg?previousOne.classList.add("active"):nextOne.classList.add("active");
    		var blindObj = document.querySelector(".active");
    		handler.eventBind.call(blindObj,"Vertical");
    		return true;
        };

		//动画处理对象，包括当前元素上滑动与下滑动，整体元素的上移
		var animate = {
			"index": 0,
			"_AnimateUp": function(obj){
				if(!ifAnimate(obj,false))return;
				lock=false;
				sliderArea.classList.contains("sliderArea_")?undefined:sliderArea.classList.add("sliderArea_");
				img_cache.map(function(){
					var top = $(this).css("top");
					if (this.style.zIndex==4) {console.log(top)};
					top = (parseFloat(top)-3.2).toFixed(1)+"rem";
					$(this).animate({top:top},500,'ease-out');
				});

				$(obj).animate({
		        top:
		        '-11.125rem'
		        }, 500,
		        'ease-out');
		        lock = true;
			},
			"_AnimateDown": function(obj){
				if(!ifAnimate(obj,true))return;
				lock=false;
				sliderArea.classList.contains("sliderArea_")?sliderArea.classList.remove("sliderArea_"):undefined;
				var priviousOne = obj.previousSibling.previousSibling;
				img_cache.map(function(){
					var top = $(this).css("top");
					top = (parseFloat(top)+3.2).toFixed(1)+"rem"; 
					$(this).animate({top:top},500,'ease-out');
				});

				$(priviousOne).animate({
		        top:
		        '0rem'
		        }, 500,
		        'ease-out');
		        lock = true;
			},
			"_AnimateRight": function(){
				var right = ((++animate.index)*10.8).toFixed(1);	

				main_focus.style.transform = "translate3d("+right+"rem, 0rem, 0rem)";
				main_focus.style.transitionDuration = "300ms";
			},
			"_AnimateLeft": function(){
				var left = ((--animate.index)*10.8).toFixed(1);

				main_focus.style.transform = "translate3d("+left+"rem, 0rem, 0rem)";
				main_focus.style.transitionDuration = "300ms";
			}

		};

	 	//事件处理对象，包括touch事件处理、监听和移除
		var handler = {
			"touchstart": function(e){
				e.preventDefault();
	    		this.start_.X = e.touches[0].screenX;
	    		this.start_.Y = e.touches[0].screenY;
	    	},
	    	"touchmoveVertical": function(e){
				e.preventDefault();

	    		this.end_.X = e.touches[0].screenX;
	    		this.end_.Y = e.touches[0].screenY;
	    	},
	    	"touchmoveHorizontal": function(e){
				e.preventDefault();

	    		this.end_.X = e.touches[0].screenX;
	    		this.end_.Y = e.touches[0].screenY;

	    		if (animate.index==0 && this.start_.X < this.end_.X) {
	    			animate.index=-total;
	    			main_focus.style.transform = "translate3d("+(-total*10.8)+"rem, 0rem, 0rem)";
	    			main_focus.style.transitionDuration = "0ms";
	    		}else if(animate.index==-total+1 && this.start_.X > this.end_.X){
	    			animate.index=1;
	    			main_focus.style.transform = "translate3d("+10.8+"rem, 0rem, 0rem)";
	    			main_focus.style.transitionDuration = "0ms";
	    		}
	    	},
	    	"touchendVertical": function(e){
				e.preventDefault();

				if(!lock)return;
	    		if (this.start_.Y < this.end_.Y) {  			
					animate._AnimateDown(this);
				} else {
					animate._AnimateUp(this);
				}
	    	},
	    	"touchendHorizontal": function(e){
				e.preventDefault();

	    		if (this.start_.X < this.end_.X) {  			
					animate._AnimateRight.call(this);
				} else {
					animate._AnimateLeft.call(this);
				}
	    	},
	    	"eventBind": function(direction){
		    	this.start_={},this.end_={};
		    	this.addEventListener('touchstart',handler.touchstart, false);
		    	this.addEventListener('touchmove',handler["touchmove"+direction], false);
		    	this.addEventListener('touchend',handler["touchend"+direction], false);
	    	},
	    	"eventRemove": function(direction){
		    	this.removeEventListener('touchstart',handler.touchstart,false);
		   		this.removeEventListener('touchmove',handler["touchmove"+direction], false);
		    	this.removeEventListener('touchend',handler["touchend"+direction], false);
	    	}
		};


        $(function(){
			var mySwiper = new Swiper ('.swiper-container', {	    
			    pagination: '.swiper-pagination'   
			 });

			var active = document.querySelector(".active");
			//handler.eventBind.call(active,"touchendVertical");
			handler.eventBind.call(active,"Vertical");

			var main_focus = document.querySelector(".main_focus");
			//handler.eventBind.call(main_focus,"touchendHorizontal");
			handler.eventBind.call(main_focus,"Horizontal");
		})

	})();
