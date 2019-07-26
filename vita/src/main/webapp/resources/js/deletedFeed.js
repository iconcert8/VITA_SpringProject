
var deletedFeedService = (function(){
	
	function getList(page, callback){
		if(page == null || page == "") page = 0;
		
		$.ajax({
			type:'get',
			url: '/deletedFeed/list/'+page+".json",
			success: function(result){
				if(callback){
					callback(result);
				}
			}
		});
	}
	
	return {getList:getList};
})(); 