package me.vita.service;

import java.util.List;
import me.vita.dto.UserDTO;

public interface UserService {

	public void register(String id, String pw, String nick, String email) throws Exception;

	public String getPw(String userId);

	public int getUserIdcnt(String userId);

	public String getAuthstatus(String userId);

	public String getAuthkey(String userId);

	public void modifyAuthstatus(String userId);

	public UserDTO get(String myId, String userId);

	public List<String> getSearchkey();

}
