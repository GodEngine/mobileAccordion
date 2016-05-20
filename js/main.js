;
(function($，window){
	$.fn.accordion = function(options){

		var option = $.extend({
			"container": document.getElementById('upSlider'),
			"offset": 3.2,			//手风琴间距rem
			"img": [],
			"direction":"Vertical"    		//方向
		},options);

		//动画处理对象，在上下左右滑动时应做的事
		var animate = {
			"_AnimateUp": function(){

				var $imgList = $container.querySelectorAll('.inner');
				var $ups = $container.querySelectorAll('.inner.up');


				if ($imgList.length === $ups.length + 1){
					return;	// 只剩下一个了 不能再划了
				}; 


				var init = !!($ups && $ups.length);	// 如果是第一次执行这个方法 是没有一个被隐藏的 所以length应该是0

				if (init) {
					// 如果已经有隐藏的 就找到隐藏的集合中最后一个的后边的元素
					var $next = $ups[$ups.length - 1].nextElementSibling;
					if ($next) {
						$next.classList.add('up');	// 往上提一个
					}
				} else {
					$imgList[0].classList.add('up');
				}

				var index = 0;
				var len = $imgList.length;
				// 循环给显示的卡片上移
				for (; index < len; index++) {
					var item = $imgList[index];
					// 不存在up 说明该dom是显示的
					if (!item.classList.contains('up')) {
						item.style.transform = 'translate3d(0, ' + ((index - ($ups.length + 1)) * option.offset).toFixed(1) + 'rem, 0)';
					}
				}
			},
			"_AnimateDown": function(){
				var $imgList = $container.querySelectorAll('.inner');
				var $ups = $container.querySelectorAll('.inner.up');
				tips.style.display="none";
				if ($ups.length === 0) return;	// 说明已经没有隐藏的图片了

				sliderArea.classList.contains("sliderArea_")?sliderArea.classList.remove("sliderArea_"):undefined;

				$ups[$ups.length - 1].classList.remove('up');
				var index = 0;
				var len = $imgList.length;
				// 循环给显示的卡片上移
				for (; index < len; index++) {
					var item = $imgList[index];
					// 不存在up 说明该dom是显示的
					if (!item.classList.contains('up')) {
						item.style.transform = 'translate3d(0, ' + ((index - ($ups.length - 1)) * option.offset).toFixed(1) + 'rem, 0)';
					}
				}
			},
			"_AnimateRight": function(){
				//do something
			},
			"_AnimateLeft": function(){
				//do something
			}

		};

		//touch事件监听句柄
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


	    		if (this.start_.X < this.end_.X) {
	    			// right
	    		}else if(this.start_.X > this.end_.X){
					//left
	    		}
	    	},
	    	"touchendVertical": function(e){
				e.preventDefault();

	    		if (this.start_.Y < this.end_.Y) {  			
					animate._AnimateDown();
				} else {
					animate._AnimateUp();
				}
	    	},
	    	"touchendHorizontal": function(e){
				e.preventDefault();

	    		if (this.start_.X < this.end_.X) {  			
					//Right
				} else {
					//Left
				}
	    	}
		};

		//初始化图片
		function buildImg (option) {

			var str = '';
			var index = 0;
			var data = option.img;

			var len = data.length;
			for (; index < len; index++) {
				str += '<div class="inner" style="transform:translate3d(0, ' + (index * option.offset) + 'rem, 0);z-index: ' + (len - index) + '"><img src="' + data[index] + '"></div>'
			}

			option.container.innerHTML = str;
		}

		buildImg(option);

		return this.each(function(){
			this.start_={},this.end_={};
	    	this.addEventListener('touchstart',handler.touchstart, false);
	    	this.addEventListener('touchmove',handler["touchmove"+option.direction], false);
	    	this.addEventListener('touchend',handler["touchend"+option.direction], false);
		});

	};
})(jQuery，window);

/*
	需要jQuery支持以及：
	
	一，容器（默认查找id为upSlider的容器）,图片（[img1,img2,img3...]）
	
	二，样式支持
	
	容器样式
	#upSlider {
		height: 100%;
		width: 100%;
		display: inline-block;
	    overflow: hidden;
	    position: relative;
	}

	rem为单位的length

	.inner {
		cursor: pointer;
	    display: inline-block;
	    overflow: hidden;
	    position: absolute;
	    transition: transform 1s;
	}

	.inner.up {		
			transform: translate3d(0, -100%, 0) !important;
	}

*/
