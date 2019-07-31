package me.vita.service;

import java.util.List;

import me.vita.domain.MessengerVO;
import me.vita.domain.UserVO;
import me.vita.dto.MessengerDTO;

public interface MessengerService {

	List<MessengerDTO> getList(UserVO user);

	List<MessengerDTO> getListContactUser(UserVO user, String contactUser);

	boolean register(MessengerVO sendMsg);

	MessengerDTO get(Integer msgNo);

	int modify(String reqId, String resId, Integer msgNo);

}
