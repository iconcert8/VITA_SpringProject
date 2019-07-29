
var msgws;
var messengerWebSocket = function() {
    msgws = new WebSocket("ws://localhost:8081/messenger/websocket");

    msgws.onopen = function () {
        console.log("[!]info: messenger connection opened");
        //    var msg = {
        //        "type": "list",
        //        "page": notifyPage
        //    };
        //    ws.send(JSON.stringify(msg));
    }

    msgws.onmessage = function (event) {
        //    var jsonData = event.data;
        //    var data = JSON.parse(jsonData);
        //    notificationCallback(data);
        console.log(event.data);
    }

    msgws.onclose = function (event) {
        console.log("[!]info: messenger connection closed");
    }

    msgws.onerror = function (event) {
        console.log("[!]info: messenger connection closed by error");
    }
}
messengerWebSocket();
