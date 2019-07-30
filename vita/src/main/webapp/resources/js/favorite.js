var favoriteService = (function(){
	
	//다음과 같은 폼으로 버튼을 출력해 놓으면 됨
	//<button class="btn-primary favor" data-feedno="해당feedNo" data-userid="해당userId"></button>
	//<button class="btn-outline-primary nofavor" data-feedno="해당feedNo" data-userid="해당userId"></button>
	function registerBtnEvent(){
		if($('#authUserId').val() != null && $('#authUserId').val() != ""){
			$(document).on('click', '.favor', function(){
				var feedNo = $(this).data("feedno");
				remove(feedNo, switchColorBtn($(this)));
			});
			$(document).on('click', '.nofavor', function(){
				var feedNo = $(this).data("feedno");
				register(feedNo, switchColorBtn($(this)));
			});
		}else{
			$(document).on('click', '.favor', function(){
				alert("로그인 후 이용가능 합니다");
			});
			$(document).on('click', '.nofavor', function(){
				alert("로그인 후 이용가능 합니다");
			});
		}
	}
	
	
	
	
	
	
	function register(feedNo, callback){
		feedNo = String(feedNo);
		$.ajax({
			type:'post',
			url: '/favorite/new',
			data: feedNo,
			contentType:"application/json; charset=utf-8",
			success: function(){
				if(callback){
					callback();
				}
			}
		});
	}
	
	function remove(feedNo, callback){
		feedNo = String(feedNo);
		$.ajax({
			type:'delete',
			url: '/favorite/'+feedNo,
			success: function(){
				if(callback){
					callback();
				}
			}
		});
	}
	
	function switchColorBtn($btn){
		if($btn.hasClass('favor')){
			$btn.removeClass('favor').addClass('nofavor');
			$btn.removeClass('btn-primary').addClass('btn-outline-primary');
		}else{
			$btn.removeClass('nofavor').addClass('favor');
			$btn.removeClass('btn-outline-primary').addClass('btn-primary');
		}
	}
	
	return {registerBtnEvent:registerBtnEvent};
	
})();