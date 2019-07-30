
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
	
	function modify(feedNo, callback){
		if(feedNo == null) return;
		
		$.ajax({
			type:'put',
			url: '/deletedFeed/'+feedNo,
			success: function(result){
				if(callback){
					callback();
				}
			}
		});
	}
	
	return {getList:getList, modify:modify};
})(); 