
var contactUser;
var messengerWs;    // websocket
var messengerNotiCount = 0; //전체알림 숫자표시변수
var messengerService = {
    sendMsg: function (msg) {
        var sendMsg = {
            type: "message",
            msg: msg,
            resId: contactUser
        }
        messengerws.send(JSON.stringify(sendMsg));
    },
    getList: function (success, error, complete) {
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
    get: function (contact, success, error, complete) {
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
    readMsg: function (data, countFlag) {
        if (!countFlag) {
            $('label[data-read]').each(function (i, item) {
                if ($(item).data('read') <= data.msgNo) {
                    $(item).remove();
                }
            });
        } else {
            messengerService.displayMessengerNotiCount(-data.count); //totalCount
            
            var leftTarget = $('#messengerList').find(`span[data-contact="${data.contactUser}"]`);
            var topTarget = $('#messengerNotiList').find(`span[data-contact="${data.contactUser}"]`);
            
            leftCount = parseInt(leftTarget.text());
            topCount = parseInt(topTarget.text());

            console.log('readMsg ' + leftCount+','+topCount);
            if(leftCount === 0 && topCount === 0) return;
            leftCount = topCount = leftCount - data.count;
            if(leftCount === 0) {
                leftTarget.addClass('d-none');
                topTarget.addClass('d-none');
            } else {
                leftTartget.text(leftCount);
                topTarget.text(topCount);
            }
        }
    },
    check: function (msgNo) {
        var check = {
            type: 'check',
            msgNo: msgNo,
            contactUser: contactUser
        }
        messengerws.send(JSON.stringify(check));
    },
    viewMessengerList : function (data) {
        var messengerListDiv = $('#messengerList');
        var authUserId = $('#authUserId').val();
        if (Array.isArray(data)) {
            $.each(data, function (i, item) {
                messengerListDiv.append(template.messengerList(item));
            });
        } else {
            if (authUserId === data.resId) {
                var tempCount = parseInt(messengerListDiv.find(`span[data-contact="${data.userId}"]`).text()) + 1;
                messengerListDiv.find(`a[data-contact='${data.userId}']`).remove();
                messengerListDiv.prepend(template.messengerList(data, tempCount));
            }
        }
    },
    selectContactUser : function (element) {
        var messengerListDiv = $('#messengerList');
        var messageViewDiv = $('#messageView');
        var messengerContactInfoH5 = $('#messengerContactInfo');
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
    },
    scrollBottom: function () {
        var element = document.getElementById('messageView');
        element.scrollTop = element.scrollHeight;
    },
    viewMessengerNoti : function (data) {
        var messengerNotiListDiv = $('#messengerNotiList'); //알림바 메시지 알림 목록영역
        var authUserId = $('#authUserId').val();
        if (Array.isArray(data)) {
            var tempCount = 0;
            $.each(data, function (i, item) {
                messengerNotiListDiv.append(template.notiMessengerList(item));
                tempCount += item.readless;
            });
            messengerService.displayMessengerNotiCount(tempCount);
        } else {
            if (authUserId === data.resId) {
                var tempCount = parseInt(messengerNotiListDiv.find(`span[data-contact="${data.userId}"]`).text()) + 1;
                messengerNotiListDiv.find(`a[data-contact='${data.userId}']`).remove();
                $('#goToMessengerBtn').after(template.notiMessengerList(data, tempCount));
                messengerService.displayMessengerNotiCount(1);
            }
        }
    },
    displayMessengerNotiCount : function (addCount) {
        messengerNotiCount += addCount;
        var display = messengerNotiCount > 300 ? '300+' : messengerNotiCount;
        $('#messengerToalCnt').text(display);
    }
}

var messengerAnalyzer = function (data) {
    var authUserId = $('#authUserId').val();
    console.log(data);
    
    switch (data.type) {
        case 'message':
            if (contactUser === data.userId) {// 메세지 도착시 상대방 창을 보고있어, 상대방 메세지 표시및 메시지 확인 전송
                $('#messageView').append(template.message(data, contactUser));
                messengerService.check(data.msgNo);
                messengerService.scrollBottom();
            } else {    // 다른창을 보고있을때 상대방 메세지가 도착하여 메시지 알림 갱신
                messengerService.viewMessengerNoti(data);    //상단바 알림
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