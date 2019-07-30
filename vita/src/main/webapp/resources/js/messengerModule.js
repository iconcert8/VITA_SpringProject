
var contactUser;
var messengerService = {
    sendMsg : function (msg) {
        var sendMsg = {
            type: "message",
            msg: msg,
            resId: contactUser
        }
        messengerws.send(JSON.stringify(msg));
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
    },
    readMsg : function (msgNo, count) {
        if(!count) {
            $('label[data-read]').each(function(i, item) {
                console.log($(item).data('read'));
                if($(item).data('read') <= msgNo) {
                    $(item).remove();
                }
            });
        } else {

        }
    },
    check : function(msgNo) {
        var check = {
            type: 'check',
            msgNo : msgNo,
            contactUser : contactUser
        }
        messengerws.send(JSON.stringify(check));
    },
    scrollBottom : function() {
        var element = document.getElementById('messageView');
        element.scrollTop = element.scrollHeight;
    }
}