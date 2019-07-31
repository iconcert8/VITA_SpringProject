
var messengerWs;    // websocket
var messengerAnalyzer;  //messenger창 패킷해석기

var messengerNotiCount; //전체알림 숫자표시변수
var messengerNotiListDiv = $('#messengerNotiList'); //알림바 메시지 알림 목록영역
var messengerWebSocket = function () {
    messengerws = new WebSocket("ws://localhost:8081/messenger/websocket");

    var authUserId = $('#authUserId').val();
    messengerws.onopen = function () {
        console.log("[!]info: messenger connection opened");

        if(authUserId) {
            $('#messengerNotiList').empty();
            $('#messengerNotiList').append(`<button class="dropdown-item" onclick="location.href='/messenger'">메신저창으로 이동</button>`);
            messengerService.getList(function (result) {
                viewMessengerNoti(result);
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
        	if(data.type === 'message') {
                viewMessengerNoti(data);
            }
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

function viewMessengerNoti(data) {
    var authUserId = $('#authUserId').val();
    if(Array.isArray(data)) {
        $.each(data, function (i, item) {
            messengerNotiListDiv.append(template.notiMessengerList(item));
            messengerNotiCount += item.readless;
        });
        displayMessengerNotiCount();
    } else {
        messengerNotiListDiv.find('')
    }
                
}

// 상단바 알림 갯수 표시
function displayMessengerNotiCount() {
    var display = messengerNotiCount > 300 ? '300+' : messengerNotiCount;
    $('#messengerToalCnt').text(display);
}