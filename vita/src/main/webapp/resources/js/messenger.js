

$(document).ready(function () {

    var sendMsgForm = $('#sendMsgForm');
    var messengerListDiv = $('#messengerList');
    var messageViewDiv = $('#messageView');
    var messengerContactInfoH5 = $('#messengerContactInfo');

    var viewMessengerPage = function () {
        messengerListDiv.empty();
        messengerService.getList(function (result) {
            $.each(result, function (i, item) {
                messengerListDiv.append(template.messengerList(item));
            });
        });
    }

    // 메신저 화면 클릭 이동
    viewMessengerPage();

    // 대화상대 선택
    var selectContactUser = function (element) {
        // 초기화
        msgDays = [];
        messengerListDiv.find('a[data-contact]').removeClass('active');
        $(element).addClass('active');
        contactUser = $(element).data('contact');

        messengerService.get(contactUser, function (result) {
            messageViewDiv.empty();
            var msgNo;
            $.each(result, function (i, item) {
                // user info
                if (i === 0) {
                    messengerContactInfoH5.empty().append(template.messengerContactInfo(item));
                } else if(i === result.length - 1) {
                    msgNo = item.msgNo;
                }
                messageViewDiv.append(template.message(item, contactUser));

            });
            messengerService.scrollBottom();

            // 상대바 메시지 읽었음 확인 메시지 전송
            messengerService.check(msgNo);
        });
    }

    // 이벤트---------------------------------------------------------
    // 목록 선택
    messengerListDiv.on('click', 'a', function (event) {
        selectContactUser(this);
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

function messengerAnalyzer(data) {
    var loginUserId = $('#authUserId').val();
    switch (data.type) {
        case 'message':
            // 상대방 메세지 표시및 확인 전송
            if (contactUser === data.userId) {
                $('#messageView').append(template.message(data, contactUser));
                messengerService.check(data.msgNo);
                messengerService.scrollBottom();
            }
            break;
        case 'success':
            // 내가 보낸 메시지 표시
            if(contactUser === data.resId) {
                $('#messageView').append(template.message(data, contactUser));
                messengerService.scrollBottom();
            }
            break;
        case 'check':
            if(contactUser === data.resId) {
                messengerService.readMsg(data.msgNo)
            } else if(loginUserId === data.resId) {
                messengerService.readMsg(data.msgNo, data.count);
            }
            break;
        case 'noti':

            break;
        case 'sendError':

            break;
    }
}
