
var messengerWs;
var messengerWebSocket = function () {
    messengerws = new WebSocket("ws://localhost:8081/messenger/websocket");

    messengerws.onopen = function () {
        console.log("[!]info: messenger connection opened");
    }

    messengerws.onmessage = function (event) {
        var responseData = event.data;
        var data = JSON.parse(responseData);
        messengerAnalyzer(data);
    }

    messengerws.onclose = function (event) {
        console.log("[!]info: messenger connection closed");
    }

    messengerws.onerror = function (event) {
        console.log("[!]info: messenger connection closed by error");
    }
}
messengerWebSocket();