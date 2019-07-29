package me.vita.service;

import java.util.List;

import me.vita.domain.UserVO;
import me.vita.dto.UserDTO;

public interface UserService {

	public String getPw(String userId);

	public void register(UserVO userVO) throws Exception;

	public int getUserIdcnt(String userId);

	public String getAuthstatus(String userId);

	public String getAuthkey(String userId);

	public void modifyAuthstatus(String userId);

	public UserDTO get(String myId, String userId);

	public boolean login(UserVO vo);

	public List<String> getSearchkey();

}
