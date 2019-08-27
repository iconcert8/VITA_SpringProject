
var messengerWebSocket = function () {
    messengerws = new WebSocket("ws://192.168.0.17:8081/messenger/websocket/connect");


    var authUserId = $('#authUserId').val();
    messengerws.onopen = function () {
        if (authUserId) {
            $('#messengerNotiList').empty();
            $('#messengerNotiList').append(`<button class="dropdown-item" onclick="location.href='/messenger'" id='goToMessengerBtn'>메신저창으로 이동</button>`);
            messengerService.getList(function (result) {
                messengerService.viewMessengerNoti(result);
            });
        }
    }

    messengerws.onmessage = function (event) {
        var responseData = event.data;
        var data = JSON.parse(responseData);
        // if (messengerAnalyzer) {
            messengerAnalyzer(data);
        // }
        // if (data.type === 'message') {
        //     viewMessengerNoti(data);
        // }
    }

    messengerws.onclose = function (event) {
        console.log("[!]info: messenger connection closed");
    }

    messengerws.onerror = function (event) {
        console.log("[!]info: messenger connection closed by error");
    }
}
messengerWebSocket();