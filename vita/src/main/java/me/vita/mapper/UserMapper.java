package me.vita.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Param;

import me.vita.domain.UserVO;
import me.vita.dto.UserDTO;

public interface UserMapper {

	void insert(@Param("userId") String id,@Param("userPass") String pw,@Param("userNick") String nick,@Param("userEmail") String email,@Param("authkey") String authkey,@Param("authstatus") String authstatus);

	UserVO testGet(@Param("userId") String userId);
	
	UserDTO select(@Param("myId") String myId, @Param("userId") String userId);

	String selectPw(@Param("userId") String userId);

	int selectIdcnt(@Param("userId") String userId);

	String selectAuthstatus(@Param("userId") String userId);

	String selectAuthkey(@Param("userId") String userId);

	void updateAuthstatus(@Param("userId") String userId);

	List<String> selectSearchkeyword();
}
