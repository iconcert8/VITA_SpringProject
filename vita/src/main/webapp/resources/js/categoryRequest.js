
categoryRequestService = (function(){
	
	function getList(big, page, callback){
		if(big == null) return;
		if(page == null || page == "") page = 0;
		
		$.ajax({
			type:'get',
			url: '/categoryRequest/list/'+big+'/'+page+".json",
			success: function(result){
				if(callback){
					callback(result, big);
				}
			}
		});
	}
	
	function register(bigGroup, smallGroup, feedNo, callback){
		//feedNo = ['1','2']
		if(bigGroup == null || smallGroup == null || feedNo == null){
			return;
		}
		var categoryRequestDTO = {"bigGroup":bigGroup, "categoryRequestSmallGroup": smallGroup, "feedNo":feedNo};
		
		$.ajax({
			type:'post',
			url: '/categoryRequest/new',
			data: JSON.stringify(categoryRequestDTO),
			contentType:"application/json; charset=utf-8",
			success: function(result){
				if(callback){
					callback(result);
				}
			}
		});
	}
	
	function remove(bigGroup, smallGroup, callback){
		if(bigGroup == null || smallGroup == null){
			return;
		}
		var categoryRequestDTO = {"bigGroup":bigGroup, "categoryRequestSmallGroup": smallGroup};
		
		$.ajax({
			type:'delete',
			url: '/categoryRequest',
			data: JSON.stringify(categoryRequestDTO),
			contentType:"application/json; charset=utf-8",
			success: function(result){
				if(callback){
					callback(result);
				}
			}
		});
	}
	
	return {getList:getList, register:register, remove:remove};
	
})();