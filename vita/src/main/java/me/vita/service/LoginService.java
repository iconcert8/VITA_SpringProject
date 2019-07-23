package me.vita.service;

public interface LoginService {
	
	public String getPw(String userId);
	
	public void register(String userId, String userPass, String userNick, String userEmail, String userImg)throws Exception;
	
	public int getUserIdcnt(String userId);
	
	public String getAuthstatus(String userId);
	
	public String getAuthkey(String userId);
	
	public void modifyAuthstatus(String userId);
}
