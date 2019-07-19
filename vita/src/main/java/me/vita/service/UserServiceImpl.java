package me.vita.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.vita.domain.UserVO;
import me.vita.dto.UserDTO;
import me.vita.mapper.UserMapper;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserMapper mapper;

	@Override
	public boolean register(UserVO userVO) {
		return mapper.insert(userVO) > 0;
	}

	@Override
	public boolean login(UserVO userVO) {
		return mapper.login(userVO) == 1;
	}

	@Override
	public UserDTO get(String myId, String userId) {
		return mapper.select(myId, userId);
	}

}
