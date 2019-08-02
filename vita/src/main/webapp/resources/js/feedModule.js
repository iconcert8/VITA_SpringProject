
var feedService = {
    getList: function (module, sendData, success, error, complete) {

        var url = 'feed/list' + (!module ? '' : '/') + module;
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
    },

    remove: function (feedNo, success, error, complete) {

        $.ajax({
            type: 'delete',
            url: "/feed/" + feedNo,
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

    insert: function add(feed) {
        // console.log("js : feed data : ------ " + JSON.stringify(feed));
        $.ajax({
            type: "post",
            url: "/feed/new",
            data: JSON.stringify(feed),
            contentType: "application/json; charset=UTF-8",
            success: function (result) {
                // console.log(result);
                copyImg(result);
            }
        });
    }
}

var userService = {
    get: function (userId, success, error, complete) {
        $.ajax({
            type: "get",
            url: '/user/' + userId,
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
        if (searchFilter.length == 0) {
            $('#searchBar').addClass('d-none');
        } else {
            $('#searchBar').removeClass('d-none');
        }
    },
    userBarReset: function () {
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
