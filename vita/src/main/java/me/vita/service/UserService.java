package me.vita.service;

import me.vita.domain.UserVO;

public interface UserService {

	public String getPw(String userId);
	
	public void register(String userId, String userPass, String userNick, String userEmail)throws Exception;
	
	public int getUserIdcnt(String userId);
	
	public String getAuthstatus(String userId);
	
	public String getAuthkey(String userId);
	
	public void modifyAuthstatus(String userId);
	
	public boolean login(UserVO vo);
	
	public String[] getSearchkey();
}
