package me.vita.mapper;

import org.apache.ibatis.annotations.Param;

import me.vita.domain.UserVO;
import me.vita.dto.UserDTO;

public interface UserMapper {

	int login(UserVO userVO);

	UserDTO select(@Param("myId") String myId, @Param("userId") String userId);

	UserVO testGet(@Param("userId") String userId);

	String selectPw(@Param("userId") String userId);

	void insert(UserVO userVO);

	int selectIdcnt(@Param("userId") String userId);

	String selectAuthstatus(@Param("userId") String userId);

	String selectAuthkey(@Param("userId") String userId);

	void updateAuthstatus(@Param("userId") String userId);

}
