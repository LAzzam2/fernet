var site = {
	init: function(){
		this.centerCopy();
		this.wrapHeightInit();
		this.clickFunc();
	},
	resize: function(){
		this.wrapHeight();
		this.centerCopy();
	},
	wrapHeightInit: function(){
		$('#wrap').height(window.innerHeight);
	},
	wrapHeight: function(){
		footerHeight = $('#footer').height();
		wrapHeight = window.innerHeight - footerHeight;
		$('#wrap').stop(true, false);
		$('#wrap').transition({height: wrapHeight}, 1300);
	},
	centerCopy: function(){
		contentHeight = $('#content').height();
		copyHeight = $('#copy').height();
		marginTop = ((contentHeight - copyHeight)/2);

		$('#copy').css('margin-top',''+marginTop+'px');
	},
	contentLoadedAnim: function(){
		$('.logoType>img:eq(1)').transition({opacity:0});
		$('#cFlood').transition({ backgroundColor: 'rgba(160,214,193,.6)' }, 2000, function(){
		});
	},
	contentAnim: function(){

		$('#splashSplash').transition({opacity:0, pointerEvents: 'none'},500, function(){
			$('#logo').transition({x:0, opacity: 1},1750, function(){
			});
				var spans = $('h1 span');
				var spansLength = spans.length;
				$.each(spans, function( index, value ) {
					$(this).css('top',''+(($(this).height()*index)-25)+'px');
					console.log(index, spansLength)
					if(index == spansLength-1){
						$(this).transition({top:''+$(this).height()*index+'px', opacity: 1, delay:(500+(index*500))}, 1100, function(){
							$('#copy p').transition({opacity: 1}, 1500);
							$('#footer').transition({bottom: 0}, 1000);

							site.wrapHeight();
						});
					}else{
						$(this).transition({top:''+$(this).height()*index+'px', opacity: 1, delay:(500+(index*500))}, 1100);
					}
				});
		});
		
		
	},
	clickFunc: function(){
		$('#accept').on('click', function(){
			site.contentAnim();
		});
	},
};

$( document ).ready(function() {
    site.init();
    setTimeout(function(){
    	site.contentLoadedAnim();
    }, 500);
});

$( window ).resize(function() {
	site.resize();
});