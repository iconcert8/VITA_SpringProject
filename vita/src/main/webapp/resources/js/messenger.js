
var contactUser;
$(document).ready(function () {

    var sendMsgForm = $('#sendMsgForm');
    var messengerListDiv = $('#messengerList');
    var messageViewDiv = $('#messageView');
    var messengerContactInfoH5 = $('#messengerContactInfo');

    // 메시지 보내기
    var sendMsg = function (msg) {
        var sendMsg = {
            type: "message",
            msg: msg,
            resId: contactUser
        }
        messengerService.send(sendMsg);
    }

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
            scrollBottom();

            // 상대바 메시지 읽었음 확인 메시지 전송
            var check = {
                type: 'check',
                msgNo : msgNo,
                contactUser : contactUser
            }
            console.log(check);
            
            messengerService(check);
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
            sendMsg(msg);
            $(this).val('');
        }
    });

    // 보내기버튼
    $('#sendMsgBtn').on('click', function (event) {
        if (sendMsgForm.val()) {
            sendMsg(sendMsgForm.val());
            sendMsgForm.val('');
        }
    });
});

function scrollBottom() {
    var element = document.getElementById('messageView');
    element.scrollTop = element.scrollHeight;
}

function messengerAnalyzer(data) {
    switch (data.type) {
        case 'message':
            if (contactUser === data.userId) {
                $('#messageView').append(template.message(data, contactUser));
                scrollBottom();
            }
            break;
        case 'success':
            if(contactUser === data.resId) {
                $('#messageView').append(template.message(data, contactUser));
                scrollBottom();
            }
            break;
        case 'noti':

            break;
        case 'sendError':

            break;
    }
}
