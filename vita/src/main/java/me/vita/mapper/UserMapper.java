package me.vita.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Param;
import me.vita.domain.UserVO;
import me.vita.dto.UserDTO;

public interface UserMapper {

	void insert(UserVO userVO);

	int login(UserVO userVO);

	UserDTO select(@Param("myId") String myId, @Param("userId") String userId);

	UserVO testGet(@Param("userId") String userId);

	String selectPw(@Param("userId") String userId);

	void insertUser(@Param("userId") String userId, @Param("userPass") String userPass,
			@Param("userNick") String userNick, @Param("userEmail") String userEmail, @Param("userImg") String userImg,
			@Param("authkey") String authkey, @Param("authstatus") String authstatus);

	int selectIdcnt(@Param("userId") String userId);

	String selectAuthstatus(@Param("userId") String userId);

	String selectAuthkey(@Param("userId") String userId);

	void updateAuthstatus(@Param("userId") String userId);

	List<String> selectSearchkeyword();
}
