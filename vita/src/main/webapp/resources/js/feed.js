$(document).ready(function () {
    var pageNo = 0;
    var module = '';
    var myBtn = '';
    var mainType = 'popular';

    var viewFeedListDiv = $('#viewFeedList');
    var userInfoDiv = $('#userInfo');
    var filterBarDiv = $('#filterBar > div');
    var categoryTypeDiv = $('#categoryType');
    var userBtn = $('#userLeftBtn > button');
    var feedDetailModal = $('#feedDetailModal');
    var warnModal = $('#warnModal');
    var alertModal = $('#alertModal');

    var popularBtn = $('#popularBtn');
    var recentBtn = $('#recentBtn');

    var userId = $('#authUserId').val();
    var guest = $('#guest').val();

    //  reply variables
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
        // var userId = $('#authUserId').val();
        feedService.getList('', sendData, function (result) {
            $.each(result, function (i, item) {
                viewFeedListDiv.append(template.feedSimple(item, userId));
                if (result.length - 1 === i) {
                    pageNo = item.feedNo;
                }
            });
        });
    }
    // 첫 메인 페이지 동작
    viewService.firstMainPageInit();
    mainType = 'popular';
    categoryFilter = [];
    serachFilter = [];
    viewMainPage('popular');


    // left Feed list button toggle off function
    var leftUserBtnOff = function (btn) {
        viewService.myBtnUnActive(btn);
        viewMainPage();
    }

    // left Feed list button event
    $('#myFeed').on('click', function () {
        console.log('myFeedBtn........');
        if (myBtn !== 'myFeed') {

            // 버튼 활성화
            viewService.myBtnActive(userBtn, this);
            // var userId = $('#authUserId').val();

            // 회원정보 표시
            userInfoDiv.removeClass('d-none').empty();
            userService.get(userId, function (result) {
                userInfoDiv.append(template.userInfo(result, true));
            });

            // 카테고리 바 수정
            categoryTypeDiv.addClass('d-none');
            filterBarDiv.empty().append(template.filterAdd('내 피드'));

            //  기존 내용 비우기
            viewFeedListDiv.empty();

            // 페이지 번호 초기화및 전송
            pageNo = 0;
            var sendData = {
                "page": pageNo,
                "goToUserId": userId
            }
            module = 'userfeed';
            feedService.getList(module, sendData, function (result) {
                $.each(result, function (i, item) {
                    viewFeedListDiv.append(template.feedSimple(item, userId));
                    if (result.length - 1 === i) {
                        pageNo = item.feedNo;
                    }
                });
            });
            myBtn = 'myFeed';
        } else {
            // 버튼 비활성화
            leftUserBtnOff(this);
        }
    });

    $('#myFavorite').on('click', function () {
        console.log('myFavoriteBtn........');
        if (myBtn !== 'myFavorite') {
            //        	버튼 활성화
            viewService.myBtnActive(userBtn, this);
            // var userId = $('#authUserId').val();

            // 회원정보 없애기
            userInfoDiv.removeClass('d-none').empty();

            // 카테고리 바 수정
            categoryTypeDiv.addClass('d-none');
            filterBarDiv.empty().append(template.filterAdd('즐겨찾기'));

            //  기존 내용 비우기
            viewFeedListDiv.empty();

            // 페이지 번호 초기화및 전송
            pageNo = 0;
            var sendData = {
                "page": pageNo,
                "goToUserId": userId
            }

            module = 'favorite';
            feedService.getList(module, sendData, function (result) {
                $.each(result, function (i, item) {
                    viewFeedListDiv.append(template.feedSimple(item, userId));
                    if (result.length - 1 === i) {
                        pageNo = item.feedNo;
                    }
                });
            });

            myBtn = 'myFavorite';
        } else {
            // 버튼 비활성화
            leftUserBtnOff(this);
        }
    });

    $('#newsFeed').on('click', function () {
        console.log('newsFeedBtn........');
        if (myBtn !== 'newsFeed') {
            //  버튼 활성화
            viewService.myBtnActive(userBtn, this);
            // var userId = $('#authUserId').val();

            // 회원정보 없애기
            userInfoDiv.removeClass('d-none').empty();

            // 카테고리 바 수정
            categoryTypeDiv.addClass('d-none');
            filterBarDiv.empty().append(template.filterAdd('팔로우글'));

            //  기존 내용 비우기
            viewFeedListDiv.empty();

            // 페이지 번호 초기화및 전송
            pageNo = 0;
            var sendData = {
                "page": pageNo,
                "goToUserId": userId
            }

            module = 'newsfeed';
            feedService.getList(module, sendData, function (result) {
                $.each(result, function (i, item) {
                    viewFeedListDiv.append(template.feedSimple(item));
                    if (result.length - 1 === i) {
                        pageNo = item.feedNo;
                    }
                });
            }, function () {
                console.log('newsfeed error');
            });

            myBtn = 'newsFeed';
        } else {
            // 버튼 비활성화
            leftUserBtnOff(this);
        }
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

            //          댓글 출력
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
            // warnModal.modal('hide');
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
            //reuslt
            // li 추가 append
        });
    });

    // // 카테고리 선택 이벤트
    // var categoryListDiv = $('#accordion');
    
    // // 전체선택 div
    // categoryListDiv.on('click', '.categorySelectSmallAll', function(event) {
    //     event.stopPropagation();
    //     var categorys = $(this).parent().find('input');
    //     var select =  $(this).find('input');
    //     var name = select.data('type');
    //     if(!select.prop('checked')) {
    //     	categorys.prop('checked',true);
    //         $(`input[name=${name}]`).each(function (i, category) {
    //             categoryService.selectCategory(category);
    //         });
    //     } else {
    //         categorys.prop('checked',false);
    //         $(`input[name=${name}]`).each(function (i, category) {
    //             categoryService.unSelectCategory(category);
    //         });
    //     }
    //     viewMainPage();
    // });

    // // 전체선택 checkbox
    // categoryListDiv.on('click', '.categorySelectSmallAll > input', function(event) {
    //     var categorys = $(this).parent().parent().find('input');
    //     var select =  $(this);
    //     var name = select.data('type');
    //     if(!select.prop('checked')) {
    //         categorys.prop('checked',true);
    //         $(`input[name=${name}]`).each(function (i, category) {
    //             categoryService.selectCategory(category);
    //         });
    //     } else {
    //         categorys.prop('checked',false);
    //         $(`input[name=${name}]`).each(function (i, category) {
    //             categoryService.unSelectCategory(category);
    //         });
    //     }
    //     viewMainPage();
    // });

    // // 개별 선택 div
    // categoryListDiv.on('click', '.category', function(event) {
    //     var select =  $(this).find('input');
        
    //     if(!select.prop('checked')) {
    //         select.prop('checked',true);
    //         categoryService.selectCategory(select);
    //     } else {
    //         select.prop('checked',false);
    //         categoryService.unSelectCategory(select);
    //     }
    //     viewMainPage();
    // });

    // // 개별 선택 checkbox
    // categoryListDiv.on('click', '.category > input', function(event) {
    //     var select =  $(this);
        
    //     if(!select.prop('checked')) {
    //         select.prop('checked',true);
    //         categoryService.selectCategory(select);
    //     } else {
    //         select.prop('checked',false);
    //         categoryService.unSelectCategory(select);
    //     }
    //     viewMainPage();
    // });

    // 카테고리 바 이벤트
    filterBarDiv.on('click', '.close', function() {
        categoryService.deleteCategory($(this).parent());
        viewMainPage();
    });
});