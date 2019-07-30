
var statisticsService = (function(){
	
	function frequency(big, callback){
		if(big == null || big == "") big = "null";
		
		$.ajax({
			type:'get',
			url: '/statistics/frequency/'+big+".json",
			success: function(result){
				if(callback){
					callback(result);
				}
			}
		});
	}

	return {frequency:frequency};
})();