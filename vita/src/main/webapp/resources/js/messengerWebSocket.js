
var messengerWs;
var messengerAnalyzer;
var notiSelect;
var messengerWebSocket = function () {
    messengerws = new WebSocket("ws://localhost:8081/messenger/websocket");

    var authUserId = $('#authUserId').val();
    messengerws.onopen = function () {
        console.log("[!]info: messenger connection opened");

        if(authUserId) {
            $('#messengerNotiList').empty();
            $('#messengerNotiList').append(`<button class="dropdown-item" onclick="location.href='/messenger'">메신저창으로 이동</button>`);
            var count = 0;
            messengerService.getList(function (result) {
                $.each(result, function (i, item) {
                    $('#messengerNotiList').append(template.notiMessengerList(item));
                    count += item.readless;
                    console.log(count);
                });
                $('#messengerToalCnt').text(count);
            });
            
        }
    }

    messengerws.onmessage = function (event) {
        var responseData = event.data;
        var data = JSON.parse(responseData);

        if(data.type === 'noti') {

        } if(messengerAnalyzer) {
        	messengerAnalyzer(data);
        } else {
        	
        }
       
    }

    messengerws.onclose = function (event) {
        console.log("[!]info: messenger connection closed");
    }

    messengerws.onerror = function (event) {
        console.log("[!]info: messenger connection closed by error");
    }
}
messengerWebSocket();