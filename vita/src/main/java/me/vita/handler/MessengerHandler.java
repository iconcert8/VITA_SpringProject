package me.vita.handler;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import me.vita.domain.MessengerVO;
import me.vita.domain.UserVO;
import me.vita.dto.MessengerDTO;
import me.vita.service.MessengerService;

public class MessengerHandler extends TextWebSocketHandler {

	// 키:유저아이디 값:유저세션
	Map<String, Object> userSessions = new HashMap<String, Object>();

	@Autowired
	MessengerService service;

	// 연결완료시
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("MessengerHandler connect");
		for (String key : userSessions.keySet()) {
			System.out.println("user : " + key);
		}
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
		JsonParser jsonParse = new JsonParser();
		JsonObject jobj = (JsonObject) jsonParse.parse(requestText);

		// json객체에서 인스턴스 추출
		String type = jobj.get("type").getAsString();

		switch (type) {
		case "message":
			sendMessage(session, jobj);
			break;
		case "noti":

			break;
		case "check":
			checkMessage(session, jobj);
			break;
		default:
			break;
		}
		if (type.equals("message")) {

		}
	}

	private void checkMessage(WebSocketSession session, JsonObject jobj) {
		String reqId = jobj.get("contactUser").getAsString();
		String resId = getUser(session).getUserId();
		Integer msgNo = jobj.get("msgNo").getAsInt();
		
		if(service.modify(reqId, resId, msgNo));
		
	}

	private void sendMessage(WebSocketSession session, JsonObject jobj) throws IOException {
		String msg = jobj.get("msg").getAsString();
		String reqId = getUser(session).getUserId();
		String resId = jobj.get("resId").getAsString();

		MessengerVO sendMsg = new MessengerVO();
		sendMsg.setMsg(msg);
		sendMsg.setReqId(reqId);
		sendMsg.setResId(resId);
		sendMsg.setMsgDate(new Date());

		WebSocketSession responseSession = (WebSocketSession) userSessions.get(resId);
		if (service.register(sendMsg)) { // 메시지 입력 성공
			if (responseSession != null) {
				MessengerDTO responseDTO = service.get(sendMsg.getMsgNo());
				JsonObject responseJobj = (JsonObject) new Gson().toJsonTree(responseDTO);
				
				responseJobj.addProperty("type", "message");
				responseSession.sendMessage(new TextMessage(new Gson().toJson(responseJobj)));
			}
			jobj.addProperty("msgNo", sendMsg.getMsgNo());
			jobj.addProperty("msgDate", sendMsg.getMsgDate().getTime());
			jobj.addProperty("msgChk", sendMsg.getMsgChk());
			jobj.addProperty("msgChk", "F");
			jobj.addProperty("reqId", reqId);
			jobj.addProperty("type", "success");
			session.sendMessage(new TextMessage(new Gson().toJson(jobj)));
		} else { // 메시지 입력 실패
			jobj.addProperty("type", "sendError");
			session.sendMessage(new TextMessage(new Gson().toJson(jobj)));
		}

	}

	// 연결 종료시
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("MessengerHandler close");
		if (getUser(session) == null) {
			session.close();
			return;
		}
		String userId = getUser(session).getUserId();

		// Map에 유저아이디, 유저세션을 remove
		userSessions.remove(userId);

	}

	public UserVO getUser(WebSocketSession session) {
		Map<String, Object> httpSession = session.getAttributes();
		UserVO user = (UserVO) httpSession.get("authUser");

		return user;
	}
}
