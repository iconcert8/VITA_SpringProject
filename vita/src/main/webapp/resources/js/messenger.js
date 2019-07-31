

$(document).ready(function () {

    var sendMsgForm = $('#sendMsgForm');
    var messengerListDiv = $('#messengerList');
    var messageViewDiv = $('#messageView');
    var messengerContactInfoH5 = $('#messengerContactInfo');

    contactUser = $('#contactUser').val();

    // var viewMessengerPage = function () {
        messengerListDiv.empty();
        messengerService.getList(function (result) {
            messengerService.viewMessengerList(result);
            if(contactUser) {
                var select = messengerListDiv.find(`a[data-contact='${contactUser}']`);   
                messengerService.selectContactUser(select);
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