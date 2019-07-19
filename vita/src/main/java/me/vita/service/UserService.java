package me.vita.service;

import me.vita.domain.UserVO;
import me.vita.dto.UserDTO;

public interface UserService {

	boolean register(UserVO userVO);

	boolean login(UserVO userVO);

	UserDTO get(String myId, String userId);
}
