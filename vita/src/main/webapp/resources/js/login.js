$(document).ready(function(){
	
	$('#log_in').on("click",function(){
		var user_id= $('#id').val();
		var user_pw= $('#pw').val();
	});
	
	$('#sign_up').on("click",function(){
		location.href="login/signup";
		
	});
	
});


