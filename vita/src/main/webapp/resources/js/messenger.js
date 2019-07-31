

$(document).ready(function () {

    var sendMsgForm = $('#sendMsgForm');
    var messengerListDiv = $('#messengerList');
    var messageViewDiv = $('#messageView');
    var messengerContactInfoH5 = $('#messengerContactInfo');

    // var viewMessengerPage = function () {
        messengerListDiv.empty();
        messengerService.getList(function (result) {
            messengerService.viewMessengerList(result);
            if(notiSelect) {
                var noti = messengerListDiv.find(`a[data-contact='${notiSelect}']`);       
                messengerService.selectContactUser(noti);
                notiSelect = '';
            }
        });
    // }

    // 이벤트---------------------------------------------------------
    // 목록 선택
    messengerListDiv.on('click', 'a', function (event) {
        messengerService.selectContactUser(this);
    });


    // 메세지 보내기
    // enter키
    sendMsgForm.on('keyup', function (event) {
        var msg = $(this).val();
        if (event.keyCode == 13 && msg) {
            messengerService.sendMsg(msg);
            $(this).val('');
        }
    });

    // 보내기버튼
    $('#sendMsgBtn').on('click', function (event) {
        if (sendMsgForm.val()) {
            messengerService.sendMsg(sendMsgForm.val());
            sendMsgForm.val('');
        }
    });
});

messengerAnalyzer = function (data) {
    var authUserId = $('#authUserId').val();
    console.log(data);
    
    switch (data.type) {
        case 'message':
            if (contactUser === data.userId) {// 메세지 도착시 상대방 창을 보고있어, 상대방 메세지 표시및 메시지 확인 전송
                $('#messageView').append(template.message(data, contactUser));
                messengerService.check(data.msgNo);
                messengerService.scrollBottom();
            } else {    // 다른창을 보고있을때 상대방 메세지가 도착하여 메시지 알림 갱신
                // viewMessengerNoti(data);    //상단바 알림 -> websocketjs에서 처리
                messengerService.viewMessengerList(data);   //메신저창 리스트
            }
            break;
        case 'success':
            if(contactUser === data.resId) { // 내가 보낸 메시지 표시
                $('#messageView').append(template.message(data, contactUser));
                messengerService.scrollBottom();
            }
            break;
        case 'check':
            if(authUserId === data.contactUser) { // 상대방이 내 메시지를 확인했을 때
                messengerService.readMsg(data);
            } else if(contactUser === data.contactUser) { //내가 상대방 메세지를 확인하여 알림 개수를 지우기
                messengerService.readMsg(data, true);
            }
            break;
        case 'sendError':

            break;
    }
}