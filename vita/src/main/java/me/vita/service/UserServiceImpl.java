package me.vita.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import me.vita.domain.MailUtils;
import me.vita.domain.TempKey;
import me.vita.domain.UserVO;
import me.vita.dto.UserDTO;
import me.vita.mapper.UserMapper;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserMapper mapper;
	private JavaMailSender mailSender;

	
	@Override
	public UserDTO get(String myId, String userId) {
		return mapper.select(myId, userId);
	}
	
	@Override
	public String getPw(String userId) {
		return mapper.selectPw(userId);
	}

	@Override
	public void register(UserVO userVO) throws Exception {
		String authkey = new TempKey().getkey(10, false);
		
		MailUtils sendMail = new MailUtils(mailSender);
		
		sendMail.setSubject("[VITA]sign-up authKey");
		sendMail.setText(new StringBuffer().append("<h1>AuthKey</h1>").append("<p>AuthKey: <b> ")
				.append(authkey).append("  </b></p>").toString());
		sendMail.setFrom("Administer ", "Juan");
		sendMail.setTo(userVO.getUserEmail());
		sendMail.send();
		
		
		userVO.setAuthKey(authkey);
		userVO.setAuthStatus("F");
		
		mapper.insert(userVO);
	}

	@Override
	public int getUserIdcnt(String userId) {
		return mapper.selectIdcnt(userId);
	}

	@Override
	public String getAuthstatus(String userId) {
		return mapper.selectAuthstatus(userId);
	}

	@Override
	public String getAuthkey(String userId) {
		return mapper.selectAuthkey(userId);
	}

	@Override
	public void modifyAuthstatus(String userId) {
		mapper.updateAuthstatus(userId);
	}

	@Override
	public boolean login(UserVO userVO) {
		return mapper.login(userVO) == 1;
	}
}
