/**
 * 
 */
console.log('Feed Module.........');

var feedService = {
    getList: function (module, sendData, success, error, complete) {
        console.log('getList feed.......');

        var url = 'feed/list' + (!module ? '' : '/') + module;
        console.log(url);
        $.ajax({
            type: "post",
            url: url,
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(sendData),
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
    get: function (feedNo, success, error, complete) {
        console.log('get feed detail.........' + feedNo);

        var url = `feed/${feedNo}`;
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
    warn: function (sendData, success, error, complete) {
        console.log('warn Btn...........');

        $.ajax({
            type: "post",
            url: "/warn/new",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(sendData),
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

var userService = {
    get: function (userId, success, error, complete) {
        console.log('get user........');
        $.ajax({
            type: "get",
            url: `user/${userId}`,
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
    }
}

var viewService = {
    myBtnActive: function (userBtn, item) {
        userBtn.removeClass('btn-secondary').addClass('btn-outline-secondary');
        $(item).removeClass('btn-outline-secondary').addClass('btn-secondary');
    },
    myBtnUnActive: function (item) {
        $(item).removeClass('btn-secondary').addClass('btn-outline-secondary');
    },
    mainPageInit: function () {

        $('#categoryType').removeClass('d-none');

        $('#userInfo').addClass('d-none');

        // 피드 삭제
        $('#viewFeedList').empty();
    },
    firstMainPageInit: function () {
        // 인기/최신 버튼 초기화
        $('#popularBtn').removeClass('btn-outline-secondary').addClass('btn-secondary');
        $('#recentBtn').removeClass('btn-secondary').addClass('btn-outline-secondary');

        // 카테고리바(필터) 초기화
        $('#filterBar > div').empty().prepend(`<button class="btn btn-outline-secondary float-right" id="resetFilter">초기화</button>`);
    },
}

var insertFeed = function add(feed){
	$.ajax({
		type : "post",
		url : "/feed/new",
		data : JSON.stringify(feed),
		contentType: "application/json; charset=UTF-8",
		succes : function(result){
			if(result){
				console.log(result);
			}
		}
	})
};

// 피드 입력 이벤트
$("#insertFeedBtn").on("click", function(){
	// 소분류 카테고리 console.log(smallElement.substr(smallElement.indexOf("&")+1));
	// 카테고리 번호 console.log(smallElement.substr(0, smallElement.indexOf("&")));
	// 요청카테고리 console.log($("#category-request").val());
	// 피드 내용 console.log($("#content-write-textarea").val());
	// userId console.log($("#authUserId").val());
	// 태그+피드 리미트 console.log(($("#tag-write-input").val()+"&"+$("#content-write-textarea").val()).substr(0,50));

	var smallElement = $("#category-choose-small").val();
	
	console.log("카테고리 번호 : " + smallElement.substr(0, smallElement.indexOf("&")));
	
	
	insertFeed(
			{categoryNo : smallElement.substr(0, smallElement.indexOf("&")), 
			userId : $("#authUserId").val(),
			feedContent : $("#content-write-textarea").val(),
			feedLimitContent : ($("#tag-write-input").val()+ "&"+$("#content-write-textarea").val()).substr(0,50),
			categoryTemp : $("#category-request").val(),
			// 태그 string 배열
			tags : ['a','b'],		
			// FeedImageVO 배열
			feedImages : [
				{feedImgUuid : "aaa", feedImgUploadPath : "/resources/upload", feedImgFileName : "dfdf"},
				{feedImgUuid : "a1aa", feedImgUploadPath : "/resources/upload", feedImgFileName : "df2df"},
				{feedImgUuid : "aa2a", feedImgUploadPath : "/resources/upload", feedImgFileName : "dfd3f"}
			]	
		});
})

