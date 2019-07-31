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
    myBtnActive: function (item) {
        $('#userLeftBtn > button').removeClass('btn-secondary').addClass('btn-outline-secondary');
        $(item).removeClass('btn-outline-secondary').addClass('btn-secondary');
    },
    myBtnUnActive: function () {
        $('#userLeftBtn > button').removeClass('btn-secondary').addClass('btn-outline-secondary');
    },
    mainPageInit: function () {

        $('#categoryType').removeClass('d-none');
        $('#categoryBar').removeClass('d-none');
        $('#userBar').addClass('d-none');
        $('#userInfo').addClass('d-none');
        if(searchFilter.length == 0) {
            $('#searchBar').addClass('d-none');
        }
        // 피드 삭제
        $('#viewFeedList').empty();
    },
    userBarReset : function () {
        $('#userBar > div').find('div').remove();
    }
    // firstMainPageInit: function () {
    //     // 인기/최신 버튼 초기화
    //     $('#popularBtn').removeClass('btn-outline-secondary').addClass('btn-secondary');
    //     $('#recentBtn').removeClass('btn-secondary').addClass('btn-outline-secondary');

    //     // 카테고리바(필터) 초기화
    //     $('#categoryBar > div').empty().prepend(`<button class="btn btn-outline-secondary float-right" id="resetFilter">초기화</button>`);
    // },
}


var copyImg = function(feedNo){
	var copyForm = new FormData();
	var copyInput = $("input[name='uploadFile']");
	var copyFiles = copyInput[0].files;

	for (var i = 0; i < copyFiles.length; i++) {
		copyForm.append("uploadFile", copyFiles[i]);
	}
	
	console.log(feedNo);
	

	
	$.ajax({
		url : '/feed/copy/'+feedNo,
		processData : false,
		contentType : false,
		data : copyForm,
		type : 'post',
		success : function(result) {
			alert("Uploaded");
		}
	});
};

var insertFeed = function add(feed){
	$.ajax({
		type : "post",
		url : "/feed/new",
		data : JSON.stringify(feed),
		contentType: "application/json; charset=UTF-8",
		success : function(result){
			console.log(result);
			copyImg(result);
		}
	})
};


// 피드 입력 이벤트
$("#insertFeedBtn").on("click", function(e){
	e.preventDefault();
	// 소분류 카테고리 console.log(smallElement.substr(smallElement.indexOf("&")+1));
	// 카테고리 번호 console.log(smallElement.substr(0, smallElement.indexOf("&")));
	// 요청카테고리 console.log($("#category-request").val());
	// 피드 내용 console.log($("#content-write-textarea").val());
	// userId console.log($("#authUserId").val());
	// 태그+피드 리미트
	// console.log(($("#tag-write-input").val()+"&"+$("#content-write-textarea").val()).substr(0,50));

	if ($("#write-image").val().trim() === '') {
		alert("이미지 업로드해라");
		return false; }
	if ($("#tag-write-input").val().trim() === '') {
		alert("태그내용 작성해라");
		return false; }
	if ($("#content-write-textarea").val().trim() === '') {
		alert("피드내용 작성해라");
		return false; }

	var tags = $("#tag-write-input").val().split("#");
	tags.splice(0, 1);
	var smallElement = $("#category-choose-small").val();
	var inputFile = $("input[name='uploadFile']");
	var imgs = inputFile[0].files;
	var imgData = [];
	
	for(var i = 0; i < imgs.length; i++){
		imgData.push({feedImgFileName : imgs[i].name});
	}

	insertFeed(
			{categoryNo : smallElement.substr(0, smallElement.indexOf("&")), 
			userId : $("#authUserId").val(),
			feedContent : $("#content-write-textarea").val(),
			feedLimitContent : ($("#tag-write-input").val()+ "&"+$("#content-write-textarea").val()).substr(0,50),
			categoryTemp : $("#category-request").val(),
			// 태그 string 배열
			tags : tags,		
			// FeedImageVO 배열
			feedImages : imgData
			});
})