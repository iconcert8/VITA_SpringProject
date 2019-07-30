package me.vita.handler;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import me.vita.domain.UserVO;
import me.vita.service.MessengerService;

public class MessengerHandler extends TextWebSocketHandler {

	// 키:유저아이디 값:유저세션
	Map<String, Object> userSessions = new HashMap<String, Object>();

	@Autowired
	MessengerService service;

	// 연결완료시
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		if (getUser(session) == null) {
			session.close();
			return;
		}

		String userId = getUser(session).getUserId();

		// Map에 유저아이디, 유저세션을 put
		userSessions.put(userId, session);
	}

	// 메세지 받고 보낼때
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

//		System.out.println("websocket msg : " + message);
		
		// json으로 보낸 메세지 받기
		String requestText = message.getPayload();
		JsonObject jsonObject = (JsonObject)new JsonParser().parse(requestText);

		// json객체에서 인스턴스 추출
		String msg = jsonObject.get("msg").getAsString();
		Long msgDate = jsonObject.get("msgDate").getAsLong();
		String reqId = jsonObject.get("reqId").getAsString();
		String resId = jsonObject.get("resId").getAsString();
		
		

	}

	// 연결 종료시
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		if (getUser(session) == null) {
			session.close();
			return;
		}
		String userId = getUser(session).getUserId();

		// Map에 유저아이디, 유저세션을 remove
		userSessions.remove(userId);

	}

	public UserVO getUser(WebSocketSession session) {
		// 웹소켓 세션으로 http세션을 구한다.
		Map<String, Object> httpSession = session.getAttributes();
		// http세션에서 유저아이디를 구해온다.
		UserVO user = (UserVO) httpSession.get("authUser");

		return user;
	}
}
