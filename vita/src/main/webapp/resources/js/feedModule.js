/**
 * 
 */
console.log('Feed Module.........');

var feedService = {

    getList: function (module, sendData, success, error, complete) {
        console.log('getList feed.......');

        var url = `feed/list/${module}`;
        $.ajax({
            type: "post",
            url: url,
            data: sendData,
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
    }
}

