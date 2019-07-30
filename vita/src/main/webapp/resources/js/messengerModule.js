var messengerService = {
    send : function (msg) {  
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
    }
}