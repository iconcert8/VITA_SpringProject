var warnService = (function(){
	
	
	function getList(page, callback){
		if(page == null) page = 0;
		
		$.ajax({
			type:'get',
			url: '/warn/list/'+page+'.json',
			success: function(result){
				if(callback){
					callback(result);
				}
			}
		});
	}
	
	function getListRequest(feedNo, callback){
		if(feedNo == null) return;
		
		$.ajax({
			type:'get',
			url: '/warn/list/request/'+feedNo+'.json',
			success: function(result){
				if(callback){
					callback(result);
				}
			}
		});
	}
	
	function remove(feedNo, deletedFeed, callback){
		if(feedNo == null) return;
		
		
		$.ajax({
			type:'delete',
			url: '/warn/'+feedNo,
			contentType: 'application/json; charset=utf-8;',
			data: JSON.stringify(deletedFeed),
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
			url: '/warn/'+feedNo,
			success: function(result){
				if(callback){
					callback(result);
				}
			}
		});
	}
	
	return {getList:getList, getListRequest:getListRequest, remove:remove, modify:modify};
})();