
var notificationService = (function(){
	
	function webSocketLoad(){
		var ws = new WebSocket("ws://localhost:8081/notification/websocket");
		
		ws.open = function(){
			console.log("info: connection opened");
		}
		
		ws.onmessage = function(event){
			console.log(event);
		}

		ws.onclose = function(event){
			console.log("info: connection closed");
		}
		
		ws.onerror = function(event){
			console.log("info: connection closed by error");
		}
		
		/*
		 * button event  
		*/
		//good event
		$(document).on('click', '.good', function(){
			var resId = $(this).data("userid");
			var feedNo = $(this).data("feedno");
			
			var msg = {"type":"nogood", "resId":resId, "feedNo":feedNo};
			ws.send(JSON.stringify(msg));
		});
		//good cancel event
		$(document).on('click', '.nogood', function(){
			var resId = $(this).data("userid");
			var feedNo = $(this).data("feedno");
			
			var msg = {"type":"good", "resId":resId, "feedNo":feedNo};
			ws.send(JSON.stringify(msg));
		});
		//favorite event
		$(document).on('click', '.favor', function(){
			var resId = $(this).data("userid");
			var feedNo = $(this).data("feedno");
			
			var msg = {"type":"nofavorite", "resId":resId, "feedNo":feedNo};
			ws.send(JSON.stringify(msg));
		});
		//favorite cancel event
		$(document).on('click', '.nofavor', function(){
			var resId = $(this).data("userid");
			var feedNo = $(this).data("feedno");
			
			var msg = {"type":"favorite", "resId":resId, "feedNo":feedNo};
			ws.send(JSON.stringify(msg));
		});
		//favorite event
		$(document).on('click', '.fln', function(){
			var resId = $(this).data("userid");
			
			var msg = {"type":"nofollow", "resId":resId};
			ws.send(JSON.stringify(msg));
		});
		//favorite cancel event
		$(document).on('click', '.nofln', function(){
			var resId = $(this).data("userid");
			
			var msg = {"type":"follow", "resId":resId};
			ws.send(JSON.stringify(msg));
		});
		
	}
	
	return {webSocketLoad:webSocketLoad};
})();