
var contactUser;
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
            displayMessengerNotiCount(-data.count); //totalCount
            
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
    }
}