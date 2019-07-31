
var statisticsService = (function(){
	
	function frequency(big, callback){
		if(big == null || big == "") big = "null";
		
		$.ajax({
			type:'get',
			url: '/statistics/frequency/'+big,
			dataType: 'text',
			success: function(result){
				if(callback){
					callback(result);
				}
			}
		});
	}
	
	function wordcloud(big, small, callback){
		if(big == null || big == "") big = "null";
		if(small == null || small == "") small = "null";
		
		$.ajax({
			type:'get',
			url: '/statistics/wordcloud/'+big+'/'+small,
			dataType: 'text',
			success: function(result){
				if(callback){
					callback(result);
				}
			}
		});
	}
	
	function timeseries(period, big, small, callback){
		if(period == null || period == "") period = "null";
		if(big == null || big == "") big = "null";
		if(small == null || small == "") small = "null";
		
		$.ajax({
			type:'get',
			url: '/statistics/timeseries/'+period+'/'+big+'/'+small,
			dataType: 'text',
			success: function(result){
				if(callback){
					callback(result);
				}
			}
		});
	}

	return {frequency:frequency, wordcloud:wordcloud, timeseries:timeseries};
})();