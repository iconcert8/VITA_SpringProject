package me.vita.mapper;

import org.apache.ibatis.annotations.Param;

public interface LoginMapper {	
	public String selectPw(@Param("userId") String userId);
	public void insertUser(@Param("userId") String userId, @Param("userPass") String userPass, @Param("userNick") String userNick,
			@Param("userEmail") String userEmail, @Param("userImg") String userImg, @Param("authkey") String authkey, @Param("authstatus") String authstatus);
	public int selectIdcnt(@Param("userId") String userId);
	public String selectAuthstatus(@Param("userId") String userId);
	public String selectAuthkey(@Param("userId") String userId);
	public void updateAuthstatus(@Param("userId") String userId);
}
