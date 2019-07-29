var userId = $('#authUserId').val();

var messengerService = {
    send : function () {  
        var date = new Date();
        var msgDate = date.getFullYear() + ':' + (date.getMonth() + 1) + ':' + date.getDate() + ':' + date.getHours() + ':' +
            date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds();
    
        var sendMsg = {
            "msg": msg,
            "msgDate": msgDate,
            "reqId": userId
        }
        msgws.send(msg);

    },
    getList : function (success, error, complete) {
        $.ajax({
            type: "get",
            url: "/messenger/list",
            dataType: "json",
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
    get : function(contact, success, error, complete) {
        $.ajax({
            type: "get",
            url: "/messenger/list/" + contact,
            dataType: "json",
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