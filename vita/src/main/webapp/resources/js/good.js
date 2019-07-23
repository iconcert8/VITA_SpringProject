var goodService = (function(){

	

	
	//다음과 같은 폼으로 버튼을 출력해 놓으면 됨
	//<button class="btn-primary good" data-feedno="해당feedNo" data-userid="해당userId"><span class="cnt"></span></button>
	//<button class="btn-outline-primary nogood" data-feedno="해당feedNo" data-userid="해당userId"><span class="cnt"></span></button>
	function registerBtnEvent(){
		$(document).on('click', '.good', function(){
			var feedNo = $(this).data("feedno");
			remove(feedNo);
			switchColorBtn($(this));
		});
		$(document).on('click', '.nogood', function(){
			var feedNo = $(this).data("feedno");
			register(feedNo);
			switchColorBtn($(this));
		});
	}
	
	
	
	function register(feedNo, callback){
		feedNo = String(feedNo);
		$.ajax({
			type:'post',
			url: '/good/new',
			data: feedNo,
			contentType:"application/json; charset=utf-8",
			success: function(result){
				if(callback){
					callback(result);
				}
			}
		});
	}
	
	function remove(feedNo, callback){
		feedNo = String(feedNo);
		$.ajax({
			type:'delete',
			url: '/good/'+feedNo,
			success: function(result){
				if(callback){
					callback(result);
				}
			}
		});
	}
	
	function switchColorBtn($btn){
		if($btn.hasClass('good')){
			$btn.removeClass('good').addClass('nogood');
			$btn.removeClass('btn-primary').addClass('btn-outline-primary');
			
			var cnt = $btn.children('.cnt').text();
			cnt = Number(cnt) - 1;
			$btn.children('.cnt').text(cnt);
		}else{
			$btn.removeClass('nogood').addClass('good');
			$btn.removeClass('btn-outline-primary').addClass('btn-primary');
			
			var cnt = $btn.children('.cnt').text();
			cnt = Number(cnt) + 1;
			$btn.children('.cnt').text(cnt);
		}
	}
	
	return {registerBtnEvent:registerBtnEvent};
	
})();