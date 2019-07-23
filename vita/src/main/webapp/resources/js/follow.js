var followService = (function(){
	
	function getListFollower(search, page, callback){
		
		if(search == "" || search == null) search = "null";
		if(page == "" || page == null) page = 0;
		
		$.ajax({
			type:'get',
			url: '/follow/list/follower/'+search+'/'+page+".json",
			success: function(result){
				if(callback){
					callback(result);
				}
			}
		});
	}
	
	function getListFollowing(search, page, callback){
		
		if(search == "" || search == null) search = "null";
		if(page == "" || page == null) page = 0;
		
		$.ajax({
			type:'get',
			url: '/follow/list/following/'+search+'/'+page+".json",
			success: function(result){
				if(callback){
					callback(result);
				}
			}
		});
	}
	
	function getList(search, page, callback){
		if(search == "" || search == null) search = "null";
		if(page == "" || page == null) page = 0;
		
		$.ajax({
			type:'get',
			url: '/follow/list/'+search+'/'+page+".json",
			success: function(result){
				if(callback){
					callback(result);
				}
			}
		});
	}
	
	//다음과 같은 폼으로 버튼을 출력해 놓으면 됨
	//<button class="btn-primary fln" data-userid="해당userId"></button>
	//<button class="btn-outline-primary nofln" data-userid="해당userId"></button>
	function registerBtnEvent(){
		$(document).on('click', '.fln', function(){
			var resId = $(this).data("userid");
			remove(resId);
			switchColorBtn($(this));
		});
		$(document).on('click', '.nofln', function(){
			var resId = $(this).data("userid");
			register(resId);
			switchColorBtn($(this));
		});
	}
	
	function register(resId, callback){
		$.ajax({
			type:'post',
			url: '/follow/new',
			data: resId,
			contentType:"application/json; charset=utf-8",
			success: function(result){
				if(callback){
					callback(result);
				}
			}
		});
	}
	
	function remove(resId, callback){
		$.ajax({
			type:'delete',
			url: '/follow/'+resId,
			success: function(result){
				if(callback){
					callback(result);
				}
			}
		});
	}
	
	
	function switchColorBtn($btn){
		if($btn.hasClass('nofln')){
			$btn.html("팔로잉");
			$btn.removeClass('nofln').addClass('fln');
			$btn.removeClass('btn-outline-primary').addClass('btn-primary');
		}else{
			$btn.html("팔로우");
			$btn.removeClass('fln').addClass('nofln');
			$btn.removeClass('btn-primary').addClass('btn-outline-primary');
		}
	}
	
	return {getListFollower:getListFollower, getListFollowing:getListFollowing, getList:getList
			,registerBtnEvent:registerBtnEvent};
	 

})();