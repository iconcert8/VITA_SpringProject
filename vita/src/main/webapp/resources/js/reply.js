console.log("Reply Module........");

var replyService = {

    getList: function (feedNo, page, success, error, complete) {
        console.log('getList feed.......');

        var url =  `reply/list/${feedNo}/${page}`;
        $.ajax({
        	type: "get",
            url: url,
            dataType: 'json',
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
    
    regist: function (sendData, success, error, complete) {
		$.ajax({
			type:'post',
			url: 'reply/new',
			data: sendData,
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
    }

}

$(function () {
	$('버튼아이디').on('click', function() {
        // 승현 추가
        pageNo = 0;
        var sendData = {
        		"파라미터이름" : 값,
        		"" : 값
        }
        replyService.regist(sendData, function(result) {
        	//reuslt
        	// li 추가 append
        });
        
    });
	
});