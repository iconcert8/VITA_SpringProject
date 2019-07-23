
$(function () {
    var pageNo = 0;
    var myBtn = '';

    var viewFeedListDiv = $('#viewFeedList');
    var userInfoDiv = $('#userInfo');
    var filterBarDiv = $('#filterBar > div');
    var categoryTypeDiv = $('#categoryType');
    var userBtn = $('#userLeftBtn > button');
    var feedDetailModal = $('#feedDetailModal');

    // left Feed list button event
    $('#myFeed').on('click', function () {
        console.log('myFeedBtn........');
        if (myBtn !== 'myFeed') {
            
            // 버튼 활성화
            viewService.myBtnActive(userBtn, this);
            var userId = $('#authUserId').val();

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
            feedService.getList('userfeed', sendData, function (result) {
                $.each(result, function (i, item) {
                    viewFeedListDiv.append(template.feedSimple(item));
                });
            });
            myBtn = 'myFeed';
        } else {

        }
    });

    $('#myFavorite').on('click', function () {
        console.log('myFavoriteBtn........');
        if (myBtn !== 'myFavorite') {
            //        	버튼 활성화
            viewService.myBtnActive(userBtn, this);
            var userId = $('#authUserId').val();

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
            feedService.getList('favorite', sendData, function (result) {
                $.each(result, function (i, item) {
                    viewFeedListDiv.append(template.feedSimple(item));
                });
            });

            myBtn = 'myFavorite';
        } else {

        }
    });

    $('#newsFeed').on('click', function () {
        console.log('newsFeedBtn........');
        if (myBtn !== 'newsFeed') {
            //  버튼 활성화
            viewService.myBtnActive(userBtn, this);
            var userId = $('#authUserId').val();

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
            feedService.getList('newsfeed', sendData, function (result) {
                $.each(result, function (i, item) {
                    viewFeedListDiv.append(template.feedSimple(item));
                });
            }, function() {
            	console.log('newsfeed error');
            });

            myBtn = 'newsFeed';
        } else {

        }
    });

    $(document).on('click', 'div[data-target="#feedDetailModal"]', function() {
    	// feedDetailModal.empty();
        var feedNo = $(this).data("feedno");
        
        feedService.get(feedNo, function(result) {
            feedDetailModal.empty().append(template.feedDetail(result));
        });
    });
});