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
    	url: "rank",
    	dataType: "json",
    	contentType: "application/json; charset=UTF-8",
    	success: function(data){
    		alert(data);
    	}
    });
    
});