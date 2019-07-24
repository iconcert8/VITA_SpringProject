package me.vita.handler;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import me.vita.domain.NotificationVO;
import me.vita.domain.UserVO;
import me.vita.dto.NotificationDTO;
import me.vita.service.NotificationService;

public class NotificationHandler extends TextWebSocketHandler{
	
	//키:유저아이디 값:유저세션 
	Map<String, Object> userSessions = new HashMap<String, Object>();
	
	@Autowired
	NotificationService service;
	
	
	//연결완료시
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		if(getUser(session) == null){
			session.close();
			return;
		}
		
		String userId = getUser(session).getUserId();
		
		//Map에 유저아이디, 유저세션을 put
		userSessions.put(userId, session);
	}
	
	//메세지 받고 보낼때
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		if(getUser(session) == null){
			session.close();
			return;
		}
		//기본적으로 내정보를 갖고 온다
		UserVO myInfo = getUser(session);

		//json으로 보낸 메세지 받기
		String requestText = message.getPayload();
		JsonParser jsonParser = new JsonParser();
		JsonObject jsonObject = (JsonObject) jsonParser.parse(requestText);
		
		//json객체에서 인스턴스 추출
		String type = jsonObject.get("type").getAsString();
		String resId = jsonObject.get("resId") == null? null: jsonObject.get("resId").getAsString();
		Integer feedNo = jsonObject.get("feedNo") == null? null: jsonObject.get("feedNo").getAsInt();
		Integer page = jsonObject.get("page") == null? 0: jsonObject.get("page").getAsInt();
		String notifyType = jsonObject.get("notifyType") == null? null: jsonObject.get("notifyType").getAsString();

		
		String myId = myInfo.getUserId();
		if(myId.equals(resId)){return;}
		
		//상대방에게 보낼 데이터 담는 곳
		JsonObject responseObject = new JsonObject();
		
		//DB에 보낼 데이터 담는 곳
		NotificationVO notificationVO = new NotificationVO();
		notificationVO.setReqId(myId);
		notificationVO.setResId(resId);
		notificationVO.setFeedNo(feedNo);
		
		switch (type) {
			case "notifyChkAll":
				service.modifyNotifyChkAll(myId);
				return;
			case "list":
				List<NotificationDTO> list = service.getList(myId, page);
				String data = new Gson().toJson(list);
				session.sendMessage(new TextMessage(data));
				return;
			case "update":
				notificationVO.setReqId(resId);
				notificationVO.setResId(myId);
				notificationVO.setNotifyType(notifyType);
				service.modify(notificationVO);
				return;
			case "follow":
				notificationVO.setNotifyType("follow");
				notificationVO.setNotifyMsg(myId+"님이 팔로우 하였습니다");
				service.register(notificationVO);
				
				responseObject.addProperty("notifyMsg", myId+"님이 팔로우 하였습니다");
				responseObject.addProperty("notifyType", "follow");
				break;
			case "nofollow":
				notificationVO.setNotifyType("follow");
				service.remove(notificationVO);
				return;
			case "good":
				notificationVO.setNotifyType("good");
				notificationVO.setNotifyMsg(myId+"님이 게시글에 좋아요를 눌렀습니다");
				service.register(notificationVO);
				
				responseObject.addProperty("notifyMsg", myId+"님이 게시글에 좋아요를 눌렀습니다");
				responseObject.addProperty("notifyType", "good");
				responseObject.addProperty("feedNo", feedNo);
				break;
			case "nogood":
				notificationVO.setNotifyType("good");
				service.remove(notificationVO);
				return;
			case "favorite":
				notificationVO.setNotifyType("favorite");
				notificationVO.setNotifyMsg(myId+"님이 게시글을 즐겨찾기 하였습니다");
				service.register(notificationVO);
				
				responseObject.addProperty("notifyMsg", myId+"님이 게시글을 즐겨찾기 하였습니다");
				responseObject.addProperty("notifyType", "favorite");
				responseObject.addProperty("feedNo", feedNo);
				break;
			case "nofavorite":
				notificationVO.setNotifyType("favorite");
				service.remove(notificationVO);
				return;
			default:
				break;
		}
		
		//상대방 웹소켄 세션
		WebSocketSession responseSession = (WebSocketSession)userSessions.get(resId);
		if(responseSession == null) return;
		
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		String notifyDate = dateFormat.format(new Date());
		
		responseObject.addProperty("notifyDate", notifyDate);
		responseObject.addProperty("notifyChk", "F");
		responseObject.addProperty("userId", myInfo.getUserId());
		responseObject.addProperty("userNick", myInfo.getUserNick());
		responseObject.addProperty("userImgUuid", myInfo.getUserImgUuid());
		responseObject.addProperty("userImgUploadPath", myInfo.getUserImgUploadPath());
		responseObject.addProperty("userImgFileName", myInfo.getUserImgFileName());
		
		JsonArray responseArray = new JsonArray();
		responseArray.add(responseObject);
		
		String data = new Gson().toJson(responseArray);
		responseSession.sendMessage(new TextMessage(data));
		
	}
	
	
	//연결 종료시
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		if(getUser(session) == null){
			session.close();
			return;
		}
		String userId = getUser(session).getUserId();
		
		//Map에 유저아이디, 유저세션을 remove
		userSessions.remove(userId);
		
	}
	
	
	 public UserVO getUser(WebSocketSession session) {
		//웹소켓 세션으로 http세션을 구한다.
		Map<String, Object> httpSession = session.getAttributes();
		//http세션에서 유저아이디를 구해온다.
		UserVO user = (UserVO)httpSession.get("authUser");
		
		return user;
	 }

}
