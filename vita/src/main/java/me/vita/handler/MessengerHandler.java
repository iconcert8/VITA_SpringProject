package me.vita.handler;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import me.vita.service.MessengerService;

public class MessengerHandler extends TextWebSocketHandler{
	//키:유저아이디 값:유저세션 
	Map<String, Object> userSessions = new HashMap<String, Object>();
	
	@Autowired
	MessengerService service;
	
	//연결완료시
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		String userId = getUserId(session);
		
		//Map에 유저아이디, 유저세션을 put
		userSessions.put(userId, session);
	}
	
	//메세지 받고 보낼때
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		

		
	}
	
	
	//연결 종료시
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		
		String userId = getUserId(session);
		
		//Map에 유저아이디, 유저세션을 remove
		userSessions.remove(userId);
		
	}
	
	
	 public String getUserId(WebSocketSession session) {
		//웹소켓 세션으로 http세션을 구한다.
		Map<String, Object> httpSession = session.getAttributes();
		//http세션에서 유저아이디를 구해온다.
		String userId = (String)httpSession.get("authUser");
		
		return userId;
	 }
}





