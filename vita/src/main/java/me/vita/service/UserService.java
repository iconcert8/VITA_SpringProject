package me.vita.service;

import org.springframework.web.multipart.MultipartFile;

import me.vita.domain.UserVO;
import me.vita.dto.UserDTO;

public interface UserService {

	public boolean register(UserVO userVO) throws Exception;

	public String getPw(String userId);

	public int getUserIdcnt(String userId);

	public String getAuthstatus(String userId);

	public String getAuthkey(String userId);

	public void modifyAuthstatus(String userId);

	public UserDTO get(String myId, String userId);

	public UserVO getUserInfo(String userId);

	public boolean updateUserImg(String userId, MultipartFile userImgFileName);

}
