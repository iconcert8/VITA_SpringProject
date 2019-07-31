$(function() {
    var count = $('#rank-list li').length;
    var height = $('#rank-list li').height();

    function step(index) {
        $('#rank-list ol').delay(2200).animate({
            top: -height * index,
        }, 300, function() {
            step((index + 1) % count);
        });
    }

    step(1);
    
    
    
    $.ajax({
    	type: 'get',
    	url: "/user/ranking",
    	dataType: "json",
    	success: function(data){
    		$('#rank_1').html(data[0]);
    		$('#rank_2').html(data[1]);
    		$('#rank_3').html(data[2]);
    		$('#rank_4').html(data[3]);
    		$('#rank_5').html(data[4]);
    	},
    	error: function(request, status, error){
    		alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

    	}
    });
    
});