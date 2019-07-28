$(document).ready(function () {
    var pageNo = 0;
    var module = '';
    var myBtn = '';
    var mainType = 'popular';

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

    var userId = $('#authUserId').val();
    var guest = $('#guest').val();

    // reply variables
    var replyPageNo = 0;

    var refDataReset = function () {
        pageNo = 0;
        module = '';
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
                viewFeedListDiv.append(template.feedSimple(item, userId));
                if (result.length - 1 === i) {
                    pageNo = item.rn;
                }
            });
        });
    }

    // 첫 메인 페이지 동작
    mainType = 'popular';
    categoryFilter = [];
    serachFilter = [];
    viewMainPage('popular');


    // left Feed list button toggle off function
    var leftUserBtnOff = function () {
        viewService.myBtnUnActive();
        viewService.userBarReset();
        viewMainPage();
    }

    var leftUserBtnOn = function(btn, module) {
        viewService.myBtnActive(btn);
        categoryTypeDiv.addClass('d-none');
        categoryBarDiv.addClass('d-none');
        userBarDiv.removeClass('d-none');

        viewService.userBarReset();

         //  기존 내용 비우기
         viewFeedListDiv.empty();

        // 페이지 번호 초기화및 전송
        pageNo = 0;
        var sendData = {
            "page": pageNo,
            "goToUserId": userId
        }
        feedService.getList(module, sendData, function (result) {
            $.each(result, function (i, item) {
                viewFeedListDiv.append(template.feedSimple(item, userId));
                if (result.length - 1 === i) {
                    pageNo = item.feedNo;
                }
            });
        });
    }

    // 내글버튼
    $('#myFeed').on('click', function () {
        console.log('myFeedBtn........');
        if (myBtn !== 'myFeed') {

            // 버튼 활성화
            // 회원정보 표시
            userInfoDiv.removeClass('d-none').empty();
            userService.get(userId, function (result) {
                userInfoDiv.append(template.userInfo(result, true));
            });

            leftUserBtnOn(this, 'userfeed');
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

            leftUserBtnOn(this, 'favorite');
            // 카테고리 바 수정
            
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
            leftUserBtnOn(this, 'newsfeed');
            console.log($('#userBar > div'));
            
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
            feedDetailModal.empty().append(template.feedDetail(result, userId));

            // 댓글 출력
            replyPageNo = 0;
            replyService.getList(feedNo, replyPageNo, function (result) {
                feedDetailModal.find('#replyModal').append(template.reply(result));
            });
        });
    });

    // 신고버튼 모달창으로 데이터 이동
    $(document).on('click', 'button[data-target="#warnModal"]', function () {
        // alert(userId + ':' + guest);
        if(userId || !guest) {
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

    // 댓글 이벤트
    $('#sendReplyBtn').on('click', function () {
        replyPageNo = 0;
        var sendData = {
            "파라미터이름": 값,
            "": 값
        }
        replyService.regist(sendData, function (result) {
            // reuslt
            // li 추가 append
        });
    });
});
