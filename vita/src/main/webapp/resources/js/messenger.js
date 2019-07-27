var ws = new WebSocket("ws://localhost:8081/messenger/websocket");

ws.onopen = function () {
    console.log("[!]info: messenger connection opened");
//    var msg = {
//        "type": "list",
//        "page": notifyPage
//    };
//    ws.send(JSON.stringify(msg));
}

ws.onmessage = function (event) {
//    var jsonData = event.data;
//    var data = JSON.parse(jsonData);
//    notificationCallback(data);
	console.log(event.data);
}

ws.onclose = function (event) {
    console.log("[!]info: messenger connection closed");
}

ws.onerror = function (event) {
    console.log("[!]info: messenger connection closed by error");
}


var messengerService = {
	sendMsg : function(msg) {
		ws.send(msg);
	}
		
}

$(document).ready(function() {
    
    var sendMsgForm = $('#sendMsgForm');
    
     // enter키
     sendMsgForm.on('keyup', function(event) {
    	var msg = $(this).val();
        if (event.keyCode == 13 && msg) {
            ws.send(msg);
        }
    });

    // 검색버튼
    $('#sendMsgBtn').on('click', function(event) {
        if(sendMsgForm.val()) {
            ws.send(sendMsgForm.val());
        }
    });
	
});