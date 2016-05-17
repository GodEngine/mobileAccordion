
	 ;(function(){
	 	//动画锁，防止瞎jb滑动的那些人
	 	var lock = true;

	 	//常用dom元素集合的缓存，加快处理速度
		var img_cache = $(".inner"),
		sliderArea = document.querySelector("#sliderArea"),
		main_focus = document.querySelector(".main_focus");

		//判断是否为首尾图片，不是的情况下移除当前元素的touch处理事件
		var ifAnimate = function (ele,arg){
    		var nextOne = ele.nextElementSibling,
			previousOne = ele.previousElementSibling;

			//判断是首尾元素时返回false，屏蔽对应的上滑下滑事件
    		if(!previousOne && arg) {
    			return false;
    		}else if(!nextOne && !arg){
    			return false;
    		};

    		//非首位元素则依次先移除active类再向下/上一个将添加active类，并返回true
    		ele.classList.remove("active");
    		handler.eventRemove.call(ele,"touchendVertical");

    		arg?previousOne.classList.add("active"):nextOne.classList.add("active");
    		var blindObj = document.querySelector(".active");
    		handler.eventBind.call(blindObj,"touchendVertical");
    		return true;
        };

	 	//事件处理对象，包括touch事件处理、监听和移除
		var handler = {
			"touchstart": function(e){
	    		e.stopPropagation();
				e.preventDefault();					//屏蔽微信网页内下拉时烦人的“xx内核提供”
	    		this.start_.X = e.touches[0].screenX;
	    		this.start_.Y = e.touches[0].screenY;
	    	},
	    	"touchmove": function(e){
	    		e.stopPropagation();
				e.preventDefault();
	    		this.end_.X = e.touches[0].screenX;
	    		this.end_.Y = e.touches[0].screenY;
	    	},
	    	"touchendVertical": function(e){       	  //水平方向上的滑动
	    		e.stopPropagation();
				e.preventDefault();
				if(!lock)return;
	    		if (this.start_.Y < this.end_.Y) {  			
					animate._AnimateDown(this);
				} else {
					animate._AnimateUp(this);
				}
	    	},
	    	"touchendHorizontal": function(e){    	  //垂直方向上的滑动
	    		e.stopPropagation();
				e.preventDefault();

	    		if (this.start_.X < this.end_.X) {  			
					animate._AnimateRight.call(this);
				} else {
					animate._AnimateLeft.call(this);
				}
	    	},
	    	"eventBind": function(direction){			//监听touch事件
		    	this.start_={},this.end_={};
		    	this.addEventListener('touchstart',handler.touchstart, false);
		    	this.addEventListener('touchmove',handler.touchmove, false);
		    	this.addEventListener('touchend',handler[direction], false);
	    	},
	    	"eventRemove": function(direction){			//移除元素上绑定的对应touch事件处理句柄
		    	this.removeEventListener('touchstart',handler.touchstart,false);
		   		this.removeEventListener('touchmove',handler.touchmove, false);
		    	this.removeEventListener('touchend',handler[direction], false);
	    	}
		};

		//动画处理对象，包括当前元素上滑动与下滑动，整体元素的上移
		var animate = {
			"index": 0,				//存储水平滑动时的translate3d值
			"_AnimateUp": function(obj){						//上滑事件的处理句柄
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
			"_AnimateDown": function(obj){						//下滑事件的处理句柄
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
			"_AnimateRight": function(){					//右滑事件的处理句柄，
				if (animate.index==10.8) {					//参考swiper处理loop的方法
					animate.index=-10.8;
				}else{
					animate.index = parseFloat((animate.index+10.8).toFixed(1));
				};				
				main_focus.style.transform = "translate3d("+animate.index+"rem, 0rem, 0rem)";
			},
			"_AnimateLeft": function(){						//左滑事件的处理句柄
				if (animate.index==-10.8) {
					animate.index=10.8;
				}else{
					animate.index = parseFloat((animate.index-10.8).toFixed(1));
				};		
				main_focus.style.transform = "translate3d("+animate.index+"rem, 0rem, 0rem)";
			},

		};

        $(function(){
			//垂直方向上的手风琴
			var active = document.querySelector(".active");				
			handler.eventBind.call(active,"touchendVertical");

			//水平方向上循环显示的轮播图
			var main_focus = document.querySelector(".main_focus");
			handler.eventBind.call(main_focus,"touchendHorizontal");
		})

	})();
