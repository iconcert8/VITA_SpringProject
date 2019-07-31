
var messengerWs;    // websocket
var messengerAnalyzer;  //messenger창 패킷해석기

var messengerNotiCount = 0; //전체알림 숫자표시변수
var messengerNotiListDiv = $('#messengerNotiList'); //알림바 메시지 알림 목록영역

var notiSelect; // 상단바에서 목록 선택시 사용자 아이디 저장
var messengerWebSocket = function () {
    messengerws = new WebSocket("ws://localhost:8081/messenger/websocket");

    var authUserId = $('#authUserId').val();
    messengerws.onopen = function () {
        console.log("[!]info: messenger connection opened");

        if (authUserId) {
            $('#messengerNotiList').empty();
            $('#messengerNotiList').append(`<button class="dropdown-item" onclick="location.href='/messenger'" id='goToMessengerBtn'>메신저창으로 이동</button>`);
            messengerService.getList(function (result) {
                viewMessengerNoti(result);
            });
        }
    }

    messengerws.onmessage = function (event) {
        var responseData = event.data;
        var data = JSON.parse(responseData);
        if (messengerAnalyzer) {
            messengerAnalyzer(data);
        }
        if (data.type === 'message') {
            viewMessengerNoti(data);
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

$(document).ready(function () {
    $('#messengerNotiList').on('click', 'a', function(e) {
        notiSelect = $(this).data('contact');
        // alert(notiSelect);
    })
});

function viewMessengerNoti(data) {
    var authUserId = $('#authUserId').val();
    if (Array.isArray(data)) {
        var tempCount = 0;
        $.each(data, function (i, item) {
            messengerNotiListDiv.append(template.notiMessengerList(item));
            tempCount += item.readless;
        });
        displayMessengerNotiCount(tempCount);
    } else {
        if (authUserId === data.resId) {
            var tempCount = parseInt(messengerNotiListDiv.find(`span[data-contact="${data.userId}"]`).text()) + 1;
            messengerNotiListDiv.find(`a[data-contact='${data.userId}']`).remove();
            $('#goToMessengerBtn').after(template.notiMessengerList(data, tempCount));
            displayMessengerNotiCount(1);
        }
    }
}

// 상단바 알림 갯수 표시
function displayMessengerNotiCount(addCount) {
    messengerNotiCount += addCount;
    var display = messengerNotiCount > 300 ? '300+' : messengerNotiCount;
    $('#messengerToalCnt').text(display);
}