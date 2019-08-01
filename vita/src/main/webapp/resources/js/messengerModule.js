
var contactUser;
var messengerWs;    // websocket
var messengerNotiCount = 0; //전체알림 숫자표시변수

var messengerOpenFlag = false;
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

            console.log('readMsg ' + leftCount + ',' + topCount);
            if (leftCount === 0 && topCount === 0) return;
            leftCount = topCount = leftCount - data.count;
            if (leftCount === 0) {
                leftTarget.addClass('d-none');
                topTarget.addClass('d-none');
            } else {
                leftTarget.text(leftCount);
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
    viewMessengerNoti: function (data, success) {
        var messengerNotiListDiv = $('#messengerNotiList'); //알림바 메시지 알림 목록영역
        var authUserId = $('#authUserId').val();

        if (success) {
            var successRefreshTemp = messengerNotiListDiv.find(`a[data-contact="${data.resId}"]`).clone();
            successRefreshTemp.addClass('active').find('.lastMsg').text(data.msg);
            messengerNotiListDiv.find(`a[data-contact="${data.resId}"]`).remove();
            messengerNotiListDiv.prepend(successRefreshTemp);
            return;
        }
        if (Array.isArray(data)) {
            var tempCount = 0;
            $.each(data, function (i, item) {
                if (item.userId === '목록이 존재 하지 않아요') {
                    messengerNotiListDiv.append(`<div class="font-weight-bolder dropdown-item noShowList">목록이 존재 하지 않아요</div>`);
                    return;
                }
                messengerNotiListDiv.append(template.notiMessengerList(item));
                tempCount += item.readless;
            });
            messengerService.displayMessengerNotiCount(tempCount);
        } else {
            if (authUserId === data.resId) {
                // console.log(data.userId +', ' + )
                var tempCount = parseInt(messengerNotiListDiv.find(`span[data-contact="${data.userId}"]`).text()) + 1;
                if(!tempCount) tempCount = 1;
                console.log('noti tempcount: ' + tempCount);
                

                messengerNotiListDiv.find(`a[data-contact='${data.userId}']`).remove();
                $('#goToMessengerBtn').after(template.notiMessengerList(data, tempCount));
                messengerService.displayMessengerNotiCount(1);
            }
        }
    },
    viewMessengerList: function (data, success) {
        var messengerListDiv = $('#messengerList');
        var authUserId = $('#authUserId').val();
        if (success) {
            var successRefreshTemp = messengerListDiv.find(`a[data-contact="${contactUser}"]`).clone();
            successRefreshTemp.addClass('active').find('.lastMsg').text(data.msg);
            messengerListDiv.find(`a[data-contact="${contactUser}"]`).remove();
            messengerListDiv.prepend(successRefreshTemp);
            return;
        }
        if (Array.isArray(data)) {
            $.each(data, function (i, item) {
                if (item.userId === '목록이 존재 하지 않아요') {
                    messengerListDiv.append(`<div class="font-weight-bolder dropdown-item noShowList">목록이 존재 하지 않아요</div>`);
                    return;
                }
                messengerListDiv.append(template.messengerList(item));
            });
        } else {
            if (authUserId === data.resId) {
                var tempCount = parseInt(messengerListDiv.find(`span[data-contact="${data.userId}"]`).text()) + 1;
                if(!tempCount) tempCount = 1;
                console.log('noti tempcount: ' + tempCount);

                messengerListDiv.find(`a[data-contact='${data.userId}']`).remove();
                messengerListDiv.prepend(template.messengerList(data, tempCount));
            }
        }
    },
    selectContactUser: function (element) {
        var messengerListDiv = $('#messengerList');
        var messageViewDiv = $('#messageView');
        var messengerContactInfoH5 = $('#messengerContactInfo');
        // 초기화
        msgDays = [];

        // active이동
        messengerListDiv.find('a[data-contact]').removeClass('active');
        $(element).addClass('active');
        contactUser = $(element).data('contact');

        // 유저 정보 불러오기
        userService.get(contactUser, function (result) {
            messengerContactInfoH5.empty().append(template.messengerContactInfo(result));
        });
        messengerService.get(contactUser, function (result) {
            messageViewDiv.empty();
            var msgNo;
            $.each(result, function (i, item) {
                if (i === result.length - 1) {
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
    displayMessengerNotiCount: function (addCount) {
        messengerNotiCount += addCount;
        var display = messengerNotiCount;
        if (messengerNotiCount > 300) display = '300+';
        if (messengerNotiCount < 0) {
            messengerNotiCount = 0;
            display = 0;
        }

        $('#messengerToalCnt').text(display);
    },
    search: function (searchId) {
        followService.getListFollowing(searchId, '', function (result) {
            $('#messengerSearchList').empty();
            $.each(result, function (i, item) {
                $('#messengerSearchList').append(template.messengerSearch(item));
            });
        });
    },
    addMessenger: function (contactUserId) {
        var messengerListDiv = $('#messengerList');
        var messageViewDiv = $('#messageView');
        var messengerContactInfoH5 = $('#messengerContactInfo');
        // 초기화
        msgDays = [];
        // $(element).addClass('active');
        // contactUser = $(element).data('contact');
        contactUser = contactUserId;

        // 유저 정보 불러오기
        userService.get(contactUserId, function (result) {
            $('.noShowList').remove();
            messengerContactInfoH5.empty().append(template.messengerContactInfo(result));
            messengerListDiv.prepend(template.messengerList(result));
            // active이동
            messengerListDiv.find('a[data-contact]').removeClass('active');
            messengerListDiv.find(`a[data-contact="${contactUserId}"]`).addClass('active');
        });
        messageViewDiv.empty();
    },
    listAndSearchToggle: function (searchFlag) {
        var messengerListDiv = $('#messengerList');
        var messengerSearchListDiv = $('#messengerSearchList');
        var messengerListBtn = $('#msgListBtn');
        if (messengerListDiv.hasClass('d-none') && !searchFlag) {
            messengerListBtn.addClass('active');
            messengerListDiv.removeClass('d-none');
            messengerSearchListDiv.addClass('d-none');
        } else {
            messengerListBtn.removeClass('active');
            messengerListDiv.addClass('d-none');
            messengerSearchListDiv.removeClass('d-none');
        }
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

                messengerService.viewMessengerNoti(data);
                messengerService.viewMessengerList(data);
            } else {    // 다른창을 보고있을때 상대방 메세지가 도착하여 메시지 알림 갱신
                messengerService.viewMessengerNoti(data);                         //상단바 알림
                if (messengerOpenFlag) messengerService.viewMessengerList(data);   //메신저창 리스트
            }
            break;
        case 'success':
            if (contactUser === data.resId) { // 내가 보낸 메시지 표시
                $('#messageView').append(template.message(data, contactUser));
                messengerService.viewMessengerNoti(data, true);
                messengerService.viewMessengerList(data, true);
                messengerService.scrollBottom();
            }
            break;
        case 'check':
            if (authUserId === data.contactUser) { // 상대방이 내 메시지를 확인했을 때
                messengerService.readMsg(data);
            } else if (contactUser === data.contactUser) { //내가 상대방 메세지를 확인하여 알림 개수를 지우기
                messengerService.readMsg(data, true);
            }
            break;
        case 'sendError':

            break;
    }
}