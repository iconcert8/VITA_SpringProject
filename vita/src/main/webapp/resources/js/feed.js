
$(function () {
    var pageNo = 0;
    var myBtn = '';

    var viewFeedListDiv = $('#viewFeedList');
    var userInfoDiv = $('#userInfo');
    var filterBarDiv = $('#filterBar > div');
    var categoryTypeDiv = $('#categoryType');
    var userBtn = $('#userLeftBtn > button');



    // left Feed list button event
    $('#myFeed').on('click', function () {
        if(myBtn !== 'myFeed') {
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
    
            // 피드 출력
            viewFeedListDiv.empty();
    
            var sendData = {
                "page": pageNo,
                "goToUserId": userId
            }
            feedService.getList('userfeed', sendData, function (result) {
                $.each(result, function (i, item) {
                    viewFeedListDiv.append(template.feed(item));
                });
            });
            myBtn = 'myFeed';
        } else {

        }
    });

    $('#myFavorite').on('click', function () {
        if(myBtn !== 'myFavorite') {
//        	버튼 활성화
            viewService.myBtnActive(userBtn, this);
            var userId = $('#authUserId').val();
            
         // 회원정보 없애기
            userInfoDiv.removeClass('d-none').empty();
            
         // 카테고리 바 수정
            categoryTypeDiv.addClass('d-none');
            filterBarDiv.empty().append(template.filterAdd('즐겨찾기'));
            
         // 피드 출력
            viewFeedListDiv.empty();

            myBtn = 'myFavorite';
        } else {

        }
    });
});