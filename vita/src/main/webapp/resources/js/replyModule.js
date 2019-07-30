console.log("Reply Module........");


var replyService = {

    getList: function (feedNo, page, success, error, complete) {
        if(feedNo == null || feedNo == "") return;
        if(page == null || page == "") page = 0;
        
        $.ajax({
        	type: "get",
            url: "/reply/list/"+feedNo+"/"+page,
            dataType: 'json',
            contentType:"application/json; charset=utf-8",
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
    
    register: function (sendData, success, error, complete) {
		$.ajax({
			type:'post',
			url: '/reply/new',
			data:  JSON.stringify(sendData),
			contentType:"application/json; charset=utf-8",
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
    
    remove : function remove(feedNo, replyNo, success, error, complete ) {
    	$. ajax({
    		type : 'delete',
    		url : "/reply/list/"+feedNo+"/"+replyNo,
    		dataType:'json',
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
    }
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
