package me.vita.mapper;

import org.apache.ibatis.annotations.Param;

import me.vita.domain.UserVO;
import me.vita.dto.UserDTO;

public interface UserMapper {

	int insert(UserVO userVO);

	int login(UserVO userVO);

	UserDTO select(String myId, String userId);

	UserVO testGet(@Param("userId") String userId);
}
