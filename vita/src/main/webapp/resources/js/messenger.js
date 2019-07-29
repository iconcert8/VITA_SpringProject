
$(document).ready(function () {

    var sendMsgForm = $('#sendMsgForm');
    var messengerListDiv = $('#messengerList');
    var messageViewDiv = $('#messageView');
    var contactUser;
    var days = [];
    var times = [];

    var viewMessengerPage = function (select) {
        messengerListDiv.empty();
        messengerService.getList(function (result) {
            $.each(result, function (i, item) {
                messengerListDiv.append(template.messengerList(item, select));
            });
        });
    }

    // 메신저 화면 클릭 이동
    viewMessengerPage();

    // 이벤트---------------------------------------------------------
    messengerListDiv.on('click', 'a', function (event) {
        // 초기화
        days = [];
        times = [];
        contactUser = $(this).data('contact');

        messengerService.get(contactUser, function (result) {
            
            messageViewDiv.empty();
            $.each(result, function (i, item) {
                console.log(item);
                var date = new Date(item.msgDate);
                var dateDay = date.getFullYear() + '년 ' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '월 ' + (date.getDate() < 9 ? '0' : '') + date.getDate() + '일';

                if (!days.includes(dateDay)) {
                    days.push(dateDay);
                    $('<div class="text-center bg-info font-weight-bolder"></div>').text(dateDay).appendTo(messageViewDiv);
                }

                var dateTime = (date.getHours() < 12 ? '오전 ' : '오후 ') + (date.getHours() > 12 ? date.getHours()-12 : date.getHours())
                        + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

                if(!times.includes(dateTime)){
                    times.push(dateTime);
                } else {
                    messageViewDiv.find(`label[date-time="${dateTime}"`).hide();
                }
                console.log(dateTime);
                
                messageViewDiv.append(template.message(item, contactUser, dateTime));
            });

        });
    });



    // enter키
    sendMsgForm.on('keyup', function (event) {
        var msg = $(this).val();
        if (event.keyCode == 13 && msg) {
            ws.send(msg);
        }
    });

    // 보내기버튼
    $('#sendMsgBtn').on('click', function (event) {
        if (sendMsgForm.val()) {
            ws.send(sendMsgForm.val());
        }
    });



});