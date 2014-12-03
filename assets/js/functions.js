var site = {
	breakpoint: 641,
	init: function(){
		this.centerCopy();
		this.clickFunc();
	},
	resize: function(){
		if(!$('body').hasClass('gated')){
			this.wrapHeight();
			this.centerCopy();
			this.headlineFormatting();
		}
	},
	wrapHeight: function(){
		if(window.innerWidth >= site.breakpoint){
			footerHeight = $('#footer').height();
			wrapHeight = window.innerHeight - footerHeight;
			$('#wrap').stop(true, false);
			$('#wrap').transition({height: wrapHeight}, 1300);
		}else {
			$('#wrap').css('height','auto');
		}
	},
	centerCopy: function(){
		if(window.innerWidth >= site.breakpoint){
			contentHeight = $('#content').height();
			copyHeight = $('#copy').height();
			marginTop = ((contentHeight - copyHeight)/2);
			$('#copy').css('margin-top',''+marginTop+'px');
		}else {
			$('#copy').css('margin-top','0px');
		}
	},
	contentLoadedAnim: function(){
		$('#cFlood').transition({ backgroundColor: 'rgba(160,214,193,.6)' }, 2000);
		$('.agegateBtn').transition({marginTop: '30px'}, 1500, function(){
			$('.agegateBtn').transition({opacity: 1});
		});
	},
	contentAnim: function(){
		this.centerCopy();
		$('#splashSplash').transition({opacity:0, pointerEvents: 'none'},500, function(){
			$('#logo').transition({x:0, opacity: 1},1750);
			var spans = $('h1 span');
			var spansLength = spans.length;
			$.each(spans, function( index, value ) {
				$(this).css('top',''+(($(this).height()*index)-25)+'px');
				console.log(index, spansLength)
				if(index == spansLength-1){
					$(this).transition({top:''+$(this).height()*index+'px', opacity: 1, delay:(500+(index*500))}, 1100, function(){
						$('#copy p').transition({opacity: 1}, 1500);
						$('#footer').transition({bottom: 0, opacity: 1}, 1000);
						site.wrapHeight();
					});
				}else{
					$(this).transition({top:''+$(this).height()*index+'px', opacity: 1, delay:(500+(index*500))}, 1100);
				}
			});
		});
	},
	reject: function(){
		$('.agegateBtn .aside').transition({opacity: 0}, 700, function(){
			$('.agegateBtn .aside').html('Come back when the time is right.');
			$('.agegateBtn .aside').transition({opacity: 1}, 1000);
		});
		$('.agegateBtn').css('pointer-events','none');
		$('#cancel, #accept').transition({height: 0, opacity: 0}, 1500);
	},
	headlineFormatting: function(){
		var spans = $('h1 span');
		var spansLength = spans.length;
		$.each(spans, function( index, value ) {
			$(this).css('top',''+$(this).height()*index+'px');
		});
	},
	clickFunc: function(){
		$('#cancel').on('click', function(){
			site.reject();
		});

		$('#accept').on('click', function(){
			$('body').removeClass('gated');
			site.contentAnim();
		});

		$( "#eform" ).submit(function( event ) {
		  $('.submitEmail').transition({opacity:'0'});
		  $('.email').transition({opacity:'0'}, function(){
			  $('.email').val('');
			  $('.email').css('opacity','1')
			  $('.email').blur();
			  $('.email').addClass('submitted');
			  $('.email').attr('placeholder','Thank You!');
		  });
 			return false;
		});
	},
};

$( document ).ready(function() {
    site.init();
    video = document.getElementById('video');
	
	var intervalHandle = null;
	intervalHandle = setInterval(function(){
    	if ( video.readyState === 4 && $('body').hasClass('gated') ) {
    		site.contentLoadedAnim();
    		$('#footer').transition({opacity: 1}, 1000);
			clearInterval(intervalHandle);
		}
    },100)
});

$( window ).resize(function() {
	site.resize();
});