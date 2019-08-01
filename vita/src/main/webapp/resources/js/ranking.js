$(function() {
    

    function step(index, count) {
    	index = index % count;
        $('#rank-list ol').delay(2200).animate({
            top: -30 * index,
        }, 300, function() {
        	step(index+1, count);
        });
    }
    
    $.ajax({
    	type: 'get',
    	url: "/rank",
    	dataType: "json",
    	success: function(data){
    		$("#rankBox").empty();
    		var count = 0;
    		$.each(data, function(index, item){
    			count++;
    			var html = "";
    			html += '<li style="top:'+(index*30)+'">';
    			html += 	(index+1)+'. <a href="#">'+item+'</a>';
    			html += '</li>';
    			
    			$("#rankBox").append(html);
    		});
    		step(0, count);
    	},
    	error: function(request, status, error){
    		alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    	}
    });
    
});