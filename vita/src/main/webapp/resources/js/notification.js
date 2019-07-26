
var notificationService = (function(){
	
	var authUserId = $('#authUserId').val();
	var notifyCnt = 0;
	var notifyPage = 0;
	
	function webSocketLoad(){
		var ws = new WebSocket("ws://localhost:8081/notification/websocket");
		
		ws.onopen = function(){
			console.log("info: connection opened");
			var msg = {"type":"list", "page":notifyPage};
			ws.send(JSON.stringify(msg));
		}
		
		ws.onmessage = function(event){
			var jsonData = event.data;
			var data = JSON.parse(jsonData);
			notificationCallback(data);
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
		//good cancel event
		$(document).on('click', '.good', function(){
			var resId = $(this).data("userid");
			var feedNo = $(this).data("feedno");
			
			var msg = {"type":"nogood", "resId":resId, "feedNo":feedNo};
			ws.send(JSON.stringify(msg));
		});
		//good event
		$(document).on('click', '.nogood', function(){
			var resId = $(this).data("userid");
			var feedNo = $(this).data("feedno");
			
			var msg = {"type":"good", "resId":resId, "feedNo":feedNo};
			ws.send(JSON.stringify(msg));
		});
		//favorite cancel event
		$(document).on('click', '.favor', function(){
			var resId = $(this).data("userid");
			var feedNo = $(this).data("feedno");
			
			var msg = {"type":"nofavorite", "resId":resId, "feedNo":feedNo};
			ws.send(JSON.stringify(msg));
		});
		//favorite event
		$(document).on('click', '.nofavor', function(){
			var resId = $(this).data("userid");
			var feedNo = $(this).data("feedno");
			
			var msg = {"type":"favorite", "resId":resId, "feedNo":feedNo};
			ws.send(JSON.stringify(msg));
		});
		//follow cancel event
		$(document).on('click', '.fln', function(){
			var resId = $(this).data("userid");
			
			var msg = {"type":"nofollow", "resId":resId};
			ws.send(JSON.stringify(msg));
		});
		//follow event
		$(document).on('click', '.nofln', function(){
			var resId = $(this).data("userid");
			
			var msg = {"type":"follow", "resId":resId};
			ws.send(JSON.stringify(msg));
		});
		
		//notification list click event
		$(document).on('click', '.dropdown-item', function(event){
			event.preventDefault();
			event.stopPropagation();
			
			var notifyType = $(this).data("notifytype");
			if(notifyType == "follow"){
				
			}else if(notifyType == "good" || notifyType == "favorite"){
				var feedNo = $(this).data("feedno");

		        feedService.get(feedNo, function (result) {
		            $("#feedDetailModal").empty().append(template.feedDetail(result, authUserId));
		            
		            //댓글 출력
		            replyPageNo = 0;
		            replyService.getList(feedNo, replyPageNo, function (result) {
		            	$("#feedDetailModal").find('#replyModal').append(template.reply(result));
		            });
		            $("#feedDetailModal").modal("show");
		        });
			}
			
		});
		//notification nocheck click event 
		$(document).on('click', '.nochk', function(){
			var notifyType = $(this).data("notifytype");
			var resId = $(this).data("userid");
			var feedNo = $(this).data("feedno");
			var msg = {"type":"update", "resId":resId, "feedNo":feedNo, "notifyType":notifyType};
			ws.send(JSON.stringify(msg));
			
			$(this).removeClass('nochk').removeClass('bg-primary');
			notifyCnt--;
			updateNotifyCnt(notifyCnt);
		});
		//notification allcheck click event
		$(document).on('click', '.notification-ChkAll', function(event){
			var msg = {"type":"notifyChkAll"};
			ws.send(JSON.stringify(msg));
			
			$(".notification-list-block").find(".nochk").removeClass('nochk').removeClass('bg-primary');
			notifyCnt = 0;
			updateNotifyCnt(notifyCnt);
		});


		var html = "";
		function notificationCallback(data){
			html = "";
			if(data.length == 1){
				$.each(data, function(index, item){
					printNotification(index, item);
					$(".notification-ChkAll").after(html);
				});
			}else{
				$.each(data, function(index, item){
					printNotification(index, item);
					$(".notification-list-block").append(html);
				});
			}
			
		}
		
		function printNotification(index, item){
			var fileCallPath = encodeURIComponent(item.userImgUploadPath+"/s_"+item.userImgUuid+"_"+item.userImgFileName);
			
			//임시 이미지
			fileCallPath = 'test.gif';
			
			html="";
			
			if(item.notifyType == "follow"){
				//상대방 페이지로 이동
				if(item.notifyChk == "F"){
					notifyCnt++;
					html += '<a class="dropdown-item bg-primary nochk" href="#" data-userid="'+item.userId+'" data-notifytype="'+item.notifyType+'">';
				}else{
					html += '<a class="dropdown-item" href="#" data-userid="'+item.userId+'" data-notifytype="'+item.notifyType+'">';						
				}
			}else if(item.notifyType == "good" || item.notifyType == "favorite"){
				//해당피드 상세보기
				// '<div data-toggle="modal" data-target="#feedDetailModal">'
				if(item.notifyChk == "F"){
					notifyCnt++;
					html += '<a class="dropdown-item bg-primary nochk" data-userid="'+item.userId+'" data-feedno="'+item.feedNo+'" data-notifytype="'+item.notifyType+'">';						
				}else{
					html += '<a class="dropdown-item" data-userid="'+item.userId+'" data-feedno="'+item.feedNo+'" data-notifytype="'+item.notifyType+'">';						
				}
			}else{
				if(item.notifyChk == "F"){
					notifyCnt++;
					html += '<a class="dropdown-item bg-primary nochk" data-userid="'+item.userId+'" data-feedno="'+item.feedNo+'" data-notifytype="'+item.notifyType+'">';
				}else{
					html += '<a class="dropdown-item"  data-userid="'+item.userId+'" data-feedno="'+item.feedNo+'" data-notifytype="'+item.notifyType+'">';					
				}
			}
			
			html += 		'<img class="img-1" style="vertical-align:top" src="/display?fileName='+fileCallPath+'">';
			html += 	'<div class="d-inline-block m-0 p-0">'+item.notifyMsg+'<br>';
			html += 		'<span style="font-size:10px; color:gray;">'+item.notifyDate.substring(0,16)+'</span>';
			html += 	'</div>';
			html += '</a>';
			
			updateNotifyCnt(notifyCnt);
		}
		
		function updateNotifyCnt(cnt){
			if(cnt > 99){
				$(".notification-cnt").text(99);					
			}else{
				$(".notification-cnt").text(cnt);
			}
		}
		
	}
	
	//delete 피드 알림
	function register(notification){
		
		$.ajax({
			type:'post',
			url: '/notification/new',
			data: JSON.stringify(notification),
			contentType:"application/json; charset=utf-8",
			success: function(){
				if(callback){
					callback();
				}
			}
		});
	}
	
	return {webSocketLoad:webSocketLoad, register:register};
})();