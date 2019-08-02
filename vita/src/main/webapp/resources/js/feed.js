$(document).ready(function () {
    var pageNo = 0;
    var userModule = '';
    var myBtn = '';
    var mainType = 'popular';
    var removeBtn = ("#RemoveBtn");

    // reply variables
    var replyPageNo = 0;
    var returnBtn = $("#ReturnBtn");

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
    var gotoUser = $('#gotoUser').val();


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
                    pageNo = item.feedNo;
                }
            });
        });

        // 스크롤 상단 이동
        document.documentElement.scrollTop = 0;
    }

    viewUserPage = function (module, gotoUserId) {
        if (module) {
            userModule = module;
        } else {
            pageNo = 0;   // 페이지 초기화
            viewFeedListDiv.empty();
        }
        var v_module = userModule;

        if (gotoUserId) {
            v_module += '/' + gotoUserId;
            pageNo = 0;
        }
        var sendData = {
            "page": pageNo,
            "goToUserId": gotoUserId
        }

        feedService.getList(v_module, sendData, function (result) {
            $.each(result, function (i, item) {
                viewFeedListDiv.append(template.feedSimple(item, authUserId));
                if (result.length - 1 === i) {
                    pageNo = item.feedNo;
                }
            }, function () {
                alert('get list error');
            });
        });

        // 스크롤 상단 이동
        document.documentElement.scrollTop = 0;
    }

    var gotoUserPageInit = function (gotoUserId) {
        // 회원정보 표시
        userService.get(gotoUserId, function (result) {
            if (userModule) {
                viewService.myBtnUnActive();
                viewService.userBarReset();
                userBarDiv.addClass('d-none');
            }
            categoryTypeDiv.addClass('d-none');
            categoryBarDiv.addClass('d-none');
            searchBarDiv.addClass('d-none');
            userInfoDiv.removeClass('d-none').empty();
            userInfoDiv.append(template.userInfo(result));
            viewFeedListDiv.empty();
            $('#gotoUser').val("");
            viewUserPage('userfeed', gotoUserId);
        }, function () {
            alert('error');
        });
    }

    // left Feed list button toggle off function
    var leftUserBtnOff = function () {
        viewService.myBtnUnActive();
        viewService.userBarReset();
        viewMainPage();
    }

    var leftUserBtnOn = function (btn) {
        viewService.myBtnActive(btn);
        categoryTypeDiv.addClass('d-none');
        categoryBarDiv.addClass('d-none');
        searchBarDiv.addClass('d-none');
        userBarDiv.removeClass('d-none');

        // 기존 유저바 내용 삭제
        viewService.userBarReset();

        // 기존 내용 비우기
        viewFeedListDiv.empty();

        // 페이지 번호 초기화및 전송
        pageNo = 0;
    }

    // 이벤트 설정-----------------------------------------------
    // 내글버튼
    $('#myFeed').on('click', function () {
        console.log('myFeedBtn........');
        if (myBtn !== 'myFeed') {

            // 회원정보 표시
            userInfoDiv.removeClass('d-none').empty();
            userService.get(authUserId, function (result) {
                userInfoDiv.append(template.userInfo(result, true));
            });

            leftUserBtnOn(this);    // 버튼 활성화
            viewUserPage('userfeed');   // 피드 불러오기

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

            leftUserBtnOn(this);        // 버튼 활성화
            viewUserPage('favorite');  // 피드 불러오기

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

            leftUserBtnOn(this);        // 버튼 활성화
            viewUserPage('newsfeed');  // 피드 불러오기

            // 유저바 내용 수정
            $('#userBar > div').append(template.filterAdd('팔로우글', '', '', true));
            myBtn = 'newsFeed';
        } else {
            // 버튼 비활성화
            leftUserBtnOff();
        }
    });

    // 유저바 home 버튼, x버튼
    $('#userBar').on('click', '#goToMainBtn, .close', function () {
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
            feedDetailModal.empty().append(template.feedDetail(result, authUserId));

            // 댓글 출력
            replyPageNo = 0;
            replyService.getList(feedNo, replyPageNo, function (result) {
                feedDetailModal.find('#replyModal').append(template.reply(result, authUserId));
            });
        });
    });

    // 프로필 클릭
    $(document).on('click', 'div.goToUserFeed', function () {
        contactUserId = $(this).data('contact');
        if (contactUserId === authUserId) {
            // 내 글 버튼 클릭 발생
            if (userModule !== 'userfeed') {
                // var profile = document.getElementById('myFeed');
                // var event = document.createEvent("MouseEvents");
                // event.initEvent("click", false, true);
                // profile.dispatchEvent(event);
                $('#myFeed').trigger('click');
            }
        } else {
            gotoUserPageInit(contactUserId);
        }
    });

    // 신고버튼 모달창으로 데이터 이동
    $(document).on('click', 'button[data-target="#warnModal"]', function () {
        // alert(userId + ':' + guest);
        if (authUserId || !guest) {
            warnModal.empty().append(template.warnModal());
            warnModal.find('#warnActionBtn').data('feedno', $(this).data('feedno'));
            warnModal.find('#warnActionBtn').data('limitcontent', $(this).data('limitcontent'));
        } else {
            location.href = '/user/login';
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

    //유저 페이지의 home버튼 이벤트
    $('#userInfo').on('click', '#userFeedHomeBtn', function () {
        viewMainPage();
    });

    // 댓글 쓰기
    $(document).on('click', '#sendReplyBtn', function () {
        console.log("reply.......");
        var replyContent = $('#replyContent').val();
        var userId = $('#authUserId').val();
        var feedNo = $(this).data('feedno');
        var replyNo = $(this).data('replyno');
        replyPageNo = 0;
        var sendData = {
            "feedNo": feedNo,
            "replyNo": replyNo,
            "replyContent": replyContent,
            "userId": userId
        }
        replyService.register(sendData, function (result) {

            replyPageNo = 0;
            replyService.getList(feedNo, replyPageNo, function (result) {
                feedDetailModal.find('#replyModal').empty();
                feedDetailModal.find('#replyModal').prepend(template.reply(result, userId));
            });
        });

    });

    // 댓글 삭제
    $(document).on('click', 'button[data-target="#RemoveBtn"]', function (e) {
        var replyNo = $(this).data('replyno');
        var feedNo = $(this).data('feedno');
        replyService.remove(feedNo, replyNo, function (result) {
            replyService.getList(feedNo, replyPageNo, function (result) {
                feedDetailModal.find('#replyModal').empty();
                feedDetailModal.find('#replyModal').prepend(template.reply(result, authUserId));
            });
        });

    });


    // 피드삭제
    $(document).on('click', 'button[data-target="#deleteFeedBtn"]', function () {

        if (confirm("피드를 삭제 하시겠습니까?")) {
            var feedNo = $(this).data('feedno');
            feedService.remove(feedNo, function (result) {
                $("#viewFeedDetailList").remove();
                // alert("삭제성공");
                alertModal.find('.alertMsg').text('피드를 삭제하였습니다.');
                alertModal.modal('show');
            });
        }
    });


    // 댓글 새로고침
    // 댓글 뿌려주기

    $(document).on("click", '#returnBtn', function () {
        var feedNo = $(this).data('feedno');
        replyPageNo = 0;
        replyService.getList(feedNo, replyPageNo, function (result) {
            feedDetailModal.find('#replyModal').empty();
            feedDetailModal.find('#replyModal').prepend(template.reply(result, authUserId));
        })
    });

    // 피드 입력 이벤트
    $("#insertFeedBtn").on("click", function (e) {
        e.preventDefault();
        if ($("#write-image").val().trim() === '') {
            alert("Please include at least one image");
            return false;
        }
        if ($("#tag-write-input").val().trim() === '') {
            alert("Please include at least one tag");
            return false;
        }
        if ($("#content-write-textarea").val().trim() === '') {
            alert("Please write feed content");
            return false;
        }

        // var tags = $("#tag-write-input").val().split("#");
        // tags.splice(0, 1);

        var smallElement = $("#category-choose-small").val();
        var inputFile = $("input[name='uploadFile']");
        var imgs = inputFile[0].files;
        var imgData = [];

        for (var i = 0; i < imgs.length; i++) {
            imgData.push({ feedImgFileName: imgs[i].name });
        }

        // feedLimitContent 생성
        var tempTagText = $("#tag-write-input").val().trim();
        var tags = [];
        tempTagText.replace(/[^#\s,;]+/gm, function (tag) {
            tags.push(tag);
        });

        var limitContent = '';
        for (var i = 0; i < tags.length; i++) {
            if (i >= 5) break;
            limitContent += '#' + tags[i] + ' ';
        }

        if (limitContent.length <= 100) {
            if (tags.length > 5) limitContent += '.../';
            else limitContent += '/';
            limitContent += $("#content-write-textarea").val();
            if (limitContent.length > 100) {
                limitContent = limitContent.substring(0, 100);
                limitContent += '...더보기';
            }
        } else {
            limitContent += '...더보기'
        }

        feedService.insert(
            {
                categoryNo: smallElement.substr(0, smallElement.indexOf("&")),
                userId: $("#authUserId").val(),
                feedContent: $("#content-write-textarea").val(),
                // feedLimitContent : ($("#tag-write-input").val()+ "&"+$("#content-write-textarea").val()).substr(0,50),
                feedLimitContent: limitContent,
                categoryTemp: $("#category-request").val(),
                // 태그 string 배열
                tags: tags,
                // FeedImageVO 배열
                feedImages: imgData
            });
        setTimeout(() => {
            if (myBtn === 'myFeed') viewUserPage();
            else $('#myFeed').trigger('click');
        }, 500);
    });

    //----------------------------------------------------------------------------

    // 첫 메인 페이지 동작
    mainType = 'popular';
    categoryFilter = [];
    serachFilter = [];
    if (gotoUser) {
        if (gotoUser === authUserId) {
            $('#myFeed').trigger('click');
        } else {
            gotoUserPageInit(gotoUser);
            gotoUser = '';
        }
    } else {
        viewMainPage();
    }

});
