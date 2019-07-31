$(document).ready(function () {
    var pageNo = 0;
    var userModule = '';
    var myBtn = '';
    var mainType = 'popular';
    var removeBtn = ("#RemoveBtn");

    // reply variables
    var replyPageNo = 0;

    var viewFeedListDiv = $('#viewFeedList');
    var userInfoDiv = $('#userInfo');
    var categoryTypeDiv = $('#categoryType');
    var feedDetailModal = $('#feedDetailModal');
    var warnModal = $('#warnModal');
    var alertModal = $('#alertModal');

    var userBarDiv = $('#userBar');
    var categoryBarDiv = $('#categoryBar');
    var searchBarDiv = $('#searchBar')

    var popularBtn = $('#popularBtn');       
    var recentBtn = $('#recentBtn');

    var authUserId = $('#authUserId').val();
    var guest = $('#guest').val();
   

    var refDataReset = function () {
        pageNo = 0;
        userModule = '';
        myBtn = '';
    }

    viewMainPage = function (type) {
        viewService.mainPageInit();
        refDataReset();
        if (type) mainType = type;
        
        var sendData = {
            type: mainType,
            page: pageNo,
            filter: categoryFilter,
            search: searchFilter
        }
        feedService.getList('', sendData, function (result) {
            $.each(result, function (i, item) {
                viewFeedListDiv.append(template.feedSimple(item, authUserId));
                if (result.length - 1 === i) {
                    pageNo = item.feedno;
                }
            });
        });
    }

    // left Feed list button toggle off function
    var leftUserBtnOff = function () {
        viewService.myBtnUnActive();
        viewService.userBarReset();
        viewMainPage();
    }

    var leftUserBtnOn = function(btn) {
        viewService.myBtnActive(btn);
        categoryTypeDiv.addClass('d-none');
        categoryBarDiv.addClass('d-none');
        userBarDiv.removeClass('d-none');

        // 기존 유저바 내용 삭제
        viewService.userBarReset();

         //  기존 내용 비우기
         viewFeedListDiv.empty();

        // 페이지 번호 초기화및 전송
        pageNo = 0;
    }

    var viewUserPage = function (module, gotoUserId) {
        if(module) {
            userModule = module;
        }
        var v_module = userModule;

        if(gotoUserId) {
            viewFeedListDiv.empty();
            v_module += '/' + gotoUserId;
        }
        var sendData = {
            "page": pageNo,
            "goToUserId": gotoUserId
        }
        feedService.getList(v_module, sendData, function (result) {
            $.each(result, function (i, item) {
                viewFeedListDiv.append(template.feedSimple(item, authUserId));
                if (result.length - 1 === i) {
                    pageNo = item.feedno;
                }
            });
        });
    }

    //---------------------------------------------------------------------------

    // 첫 메인 페이지 동작
    mainType = 'popular';
    categoryFilter = [];
    serachFilter = [];
    viewMainPage('popular');

    // 내글버튼
    $('#myFeed').on('click', function () {
        console.log('myFeedBtn........');
        if (myBtn !== 'myFeed') {

            // 회원정보 표시
            userInfoDiv.removeClass('d-none').empty();
            userService.get(authUserId, function (result) {
                userInfoDiv.append(template.userInfo(result, true));
            });

            leftUserBtnOn(this);    //버튼 활성화
            viewUserPage('userfeed');   //피드 불러오기

            // 유저바 내용 수정
            $('#userBar > div').append(template.filterAdd('내 피드', '', '', true));
            myBtn = 'myFeed';
        } else {
            // 버튼 비활성화
            leftUserBtnOff();
        }
    });

    // 즐겨찾기
    $('#myFavorite').on('click', function () {
        console.log('myFavoriteBtn........');
        if (myBtn !== 'myFavorite') {
            // 회원정보 없애기
            userInfoDiv.removeClass('d-none').empty();

            leftUserBtnOn(this);        //버튼 활성화
            viewUserPage('favorite');  //피드 불러오기

            // 유저바 내용 수정
            $('#userBar > div').append(template.filterAdd('즐겨찾기', '', '', true));
            myBtn = 'myFavorite';
        } else {
            // 버튼 비활성화
            leftUserBtnOff();
        }
    });

    // 팔로우글
    $('#newsFeed').on('click', function () {
        console.log('newsFeedBtn........');
        if (myBtn !== 'newsFeed') {
            // 회원정보 없애기
            userInfoDiv.removeClass('d-none').empty();

            leftUserBtnOn(this);        //버튼 활성화
            viewUserPage('newsfeed');  //피드 불러오기
            
            // 유저바 내용 수정
            $('#userBar > div').append(template.filterAdd('팔로우글', '', '', true));
            myBtn = 'newsFeed';
        } else {
            // 버튼 비활성화
            leftUserBtnOff();
        }
    });

    // 유저바 home 버튼, x버튼
    $('#userBar').on('click', '#goToMainBtn, .close',function() {
        leftUserBtnOff();
    });


    // 인기 최신버튼 이벤트
    popularBtn.on('click', function () {
        if (popularBtn.hasClass('btn-outline-secondary')) {
            popularBtn.removeClass('btn-outline-secondary').addClass('btn-secondary');
            recentBtn.removeClass('btn-secondary').addClass('btn-outline-secondary');

            viewMainPage('popular');
        }
    });
    recentBtn.on('click', function () {
        if (recentBtn.hasClass('btn-outline-secondary')) {
            recentBtn.removeClass('btn-outline-secondary').addClass('btn-secondary');
            popularBtn.removeClass('btn-secondary').addClass('btn-outline-secondary');

            viewMainPage('recent');
        }
    });

    // 피드 상세보기
    $(document).on('click', 'div[data-target="#feedDetailModal"], button[data-target="#feedDetailModal"]', function () {
        // feedDetailModal.empty();
        var feedNo = $(this).data("feedno");
        
        feedService.get(feedNo, function (result) {
        	console.log(result);
            feedDetailModal.empty().append(template.feedDetail(result, authUserId));

            // 댓글 출력
            replyPageNo = 0;
            replyService.getList(feedNo, replyPageNo, function (result) {
                feedDetailModal.find('#replyModal').append(template.reply(result, authUserId));
            });
        });
    });

    // 프로필 클릭
    $(document).on('click', 'div.goToUserFeed', function() {
        contactUserId = $(this).data('contact');
        if(contactUserId === authUserId) {
            var blogLink = document.getElementById('myFeed');
            //IE 이외의 경우
            var event = document.createEvent("MouseEvents");
            event.initEvent("click", false, true);
            blogLink.dispatchEvent(event);
        } else {
            // 회원정보 표시
            userInfoDiv.removeClass('d-none').empty();
            userService.get(contactUserId, function (result) {
                userInfoDiv.append(template.userInfo(result, true));
            });
            viewUserPage('userfeed', contactUserId);
        }
    });

    // 신고버튼 모달창으로 데이터 이동
    $(document).on('click', 'button[data-target="#warnModal"]', function () {
        // alert(userId + ':' + guest);
        if(authUserId || !guest) {
            warnModal.empty().append(template.warnModal());
            warnModal.find('#warnActionBtn').data('feedno', $(this).data('feedno'));
            warnModal.find('#warnActionBtn').data('limitcontent', $(this).data('limitcontent'));
        } else {
            location.href = '/testlogin';
        }
    });

    // 신고하기
    warnModal.on('click', '#warnActionBtn', function (event) {
        var feedNo = $(this).data('feedno');
        var limitContent = $(this).data('limitcontent');
        var warnCategory = warnModal.find('.warnCategory').val();
        var warnMsg = warnModal.find('.warnMsg').val();
        if (warnCategory === '[신고 선택]') {
            warnModal.find('.warnCheckMsg').text('신고 분류를 선택해 주세요.');
            return false;
        } else if (warnMsg === '') {
            warnModal.find('.warnCheckMsg').text('신고 내용을 입력해 주세요.');
            return false;
        } else {
            var sendData = {
                "feedNo": feedNo,
                "feedLimitContent": limitContent,
                "warnCategory": warnCategory,
                "warnMsg": warnMsg
            }
           
            feedService.warn(sendData, function (result) {
                if (result === 'success') {
                    
                    alertModal.find('.alertMsg').text(`피드를 신고하였습니다.`);
                    alertModal.modal('show');
                }
            });
            warnModal.modal('hide');
        }
    });
 
    
    $(document).on('click', '#sendReplyBtn', function(){
    	console.log("reply.......");
     	var replyContent = $('#replyContent').val();
        var userId = $('#authUserId').val();
        var feedNo = $(this).data('feedno');
        var replyNo = $(this).data('replyno');
    	replyPageNo = 0;
        var sendData = {
        		"feedNo" : feedNo,
        		"replyNo" : replyNo,
        		"replyContent" : replyContent,
        		"userId" : userId
        } 
        replyService.register(sendData, function(result) {
        	
        	replyPageNo = 0;
            replyService.getList(feedNo, replyPageNo, function (result) {
            	feedDetailModal.find('#replyModal').empty();
                feedDetailModal.find('#replyModal').prepend(template.reply(result, userId));
            });
        }); 
         
 
         
    });
    
    $(document).on('click', 'button[data-target="#RemoveBtn"]', function (e){
		var replyNo = $(this).data('replyno');
		var feedNo = $(this).data('feedno');
    	replyService.remove(feedNo, replyNo, function(result){
    		replyService.getList(feedNo, replyPageNo, function (result) {
    			feedDetailModal.find('#replyModal').empty();
    			feedDetailModal.find('#replyModal').prepend(template.reply(result, authUserId));
    		});
    	});
    	
    });
    

    // 피드삭제
    $(document).on('click', 'button[data-target="#deleteFeedBtn"]' , function(){
    	
    	var feedNo = $(this).data('feedno');
    	feedService.remove(feedNo, function(result){
    		//console.log("delete");
    	});
    	
    });
});
