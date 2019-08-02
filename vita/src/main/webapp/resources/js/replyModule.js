
var replyService = {

    getList: function (feedNo, page, success, error, complete) {
        if(feedNo == null || feedNo == "") return;
        if(page == null || page == "") page = 0;
        
        $.ajax({
        	type: "get",
            url: "/reply/list/"+feedNo+"/"+page,
            dataType: 'json', //받는 데이터 타입
            contentType:"application/json; charset=utf-8", //보내는 데이터 타입
            success: function (response) {
                if (success) success(response);
            },
            error: function (xhr, status, err) {
                if (error) error(err);
            },
            complete: function () {
                if (complete) complete();
            }
        });
    },
    
    register: function (sendData, success) {
		$.ajax({
			type:'post',
			url: '/reply/new',
			data:  JSON.stringify(sendData),
			contentType:"application/json; charset=utf-8",
			success: function (response) {
                if (success) success(response);
            }
            
		});
    },
    
    remove : function remove(feedNo, replyNo, success, error, complete ) {
    	$. ajax({
    		type : 'delete',
    		url : "/reply/"+feedNo+"/"+replyNo,
    		success : function (response){
    			if(success) success(response);
    		},
    		error: function (xhr, status, err){
    			if(error) error(err);
    		},
    		complete: function () {
    			if(complete) complete();
    		}
    		
    	})
    	
    },
    
    /*
    deleteList : function(sendData, success, error, complete){
    	$.ajax({
    		type:'post',
    		url : '/reply/delete',
    		dataType : 'json',	
    		success : function (response){
    			if(success) success(response);
    		},
    		error : function(xhr, status, err){
    			if(error) error(err);
    		},
    		complete : function(){
    			if(complete) complete();
    		}
    	
    	})
    }*/

}
