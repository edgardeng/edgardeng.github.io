(function(){

//配置
var config = {
	'audio':{
		'icon':'audio-record-play',
		'text':true
	},
	'loading': 'loading-ic'
};

//loading
window.onload = function(){
	$('#loading').hide();
}

//分享

$('#js-btn-share').bind('tap',function(){
	$('#js-share').show();
})
$('#js-share').bind('tap',function(){
	$(this).hide();
});


var pageIndex = 1,
	pageTotal = $('.page').length,
	towards = { up:1, right:2, down:3, left:4},
	isAnimating = false,
    pagenum = 7;//图片总数


//禁用手机默认的触屏滚动行为
document.addEventListener('touchmove',function(event){
	event.preventDefault(); },false);

$(document).swipeUp(function(){
	if (isAnimating) return;
	if (pageIndex < pageTotal) { 
		pageIndex+=1; 
	}else{
		pageIndex=1;
	};
	pageMove(towards.up);
})

$(document).swipeDown(function(){
	if (isAnimating) return;
	if (pageIndex > 1) { 
		pageIndex-=1; 
	}else{
		pageIndex=pageTotal;
	};
	pageMove(towards.down);	
})

function pageMove(tw){
	var lastPage;
	if(tw=='1'){
		if(pageIndex==1){
			lastPage = ".page-"+pageTotal;
		}else{
			lastPage = ".page-"+(pageIndex-1);
		}
		
	}else if(tw=='3'){
		if(pageIndex==pageTotal){
			lastPage = ".page-1";
		}else{
			lastPage = ".page-"+(pageIndex+1);
		}
		
	}

	var nowPage = ".page-"+pageIndex;
	
	switch(tw) {
		case towards.up:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;
		case towards.down:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
	}
	isAnimating = true;
    $(nowPage+" .title1").hide();
    $(nowPage+" .title2").hide();
    $(nowPage+" .pic").css({width:"100%",marginLeft:0});
	$(nowPage).removeClass("hide");
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
    if(pageIndex==pagenum)
    {
        $(".pt-page-moveIconUp").hide();
    }
    else
    {
        $(".pt-page-moveIconUp").show();
    }
	setTimeout(function(){

		$(lastPage).removeClass('page-current');
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		$(lastPage).find("img").addClass("hide");
		
		$(nowPage).addClass('page-current');
		$(nowPage).removeClass(inClass);
		$(nowPage).find("img").removeClass("hide");
        $(nowPage+" .pic").css({width:"100%",marginLeft:0});

		isAnimating = false;
        if(pageIndex!=pagenum)
        {
            $(nowPage+" .pic").animate({
                width:"120%",
                marginLeft:"-20%"
            },5000);
            $(nowPage+" .title1").fadeIn(2000);
            setTimeout(function(){
                $(nowPage+" .title2").fadeIn(2000);
            },2000)
        }
	},600);
}

})();