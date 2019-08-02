package me.vita.mapper;

import org.apache.ibatis.annotations.Param;

import me.vita.domain.UserVO;
import me.vita.dto.UserDTO;

public interface UserMapper {

	int insert(UserVO userVO);

	UserVO selectUserInfo(@Param("userId") String userId);

	UserDTO select(@Param("myId") String myId, @Param("userId") String userId);

	String selectPw(@Param("userId") String userId);

	int selectIdcnt(@Param("userId") String userId);

	String selectAuthstatus(@Param("userId") String userId);

	String selectAuthkey(@Param("userId") String userId);

	void updateAuthstatus(@Param("userId") String userId);

	UserVO originalImgFile(UserVO userInfo);

	int updateUserImg(UserVO userInfo);

}
