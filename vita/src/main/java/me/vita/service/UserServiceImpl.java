package me.vita.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import me.vita.domain.MailUtils;
import me.vita.domain.TempKey;
import me.vita.domain.UserVO;
import me.vita.mapper.UserMapper;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserMapper mapper;
	private JavaMailSender mailSender;

	@Override
	public String getPw(String userId) {
		// TODO Auto-generated method stub
		return mapper.selectPw(userId);
	}

	@Override
	public void register(String userId, String userPass, String userNick, String userEmail) throws Exception {
		// TODO Auto-generated method stub
		String authkey = new TempKey().getkey(10, false);
		
		MailUtils sendMail = new MailUtils(mailSender);
		
		sendMail.setSubject("[VITA]sign-up authKey");
		sendMail.setText(new StringBuffer().append("<h1>AuthKey</h1>").append("<p>AuthKey: <b> ")
				.append(authkey).append("  </b></p>").toString());
		sendMail.setFrom("Administer ", "Juan");
		sendMail.setTo(userEmail);
		sendMail.send();
		
		
		
		
		
		mapper.insertUser(userId, userPass, userNick, userEmail, "", authkey, "F");
	}

	@Override
	public int getUserIdcnt(String userId) {
		// TODO Auto-generated method stub
		return mapper.selectIdcnt(userId);
	}

	@Override
	public String getAuthstatus(String userId) {
		// TODO Auto-generated method stub
		return mapper.selectAuthstatus(userId);
	}

	@Override
	public String getAuthkey(String userId) {
		// TODO Auto-generated method stub
		return mapper.selectAuthkey(userId);
	}

	@Override
	public void modifyAuthstatus(String userId) {
		// TODO Auto-generated method stub
		mapper.updateAuthstatus(userId);
	}

	@Override
	public boolean login(UserVO vo) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public String[] getSearchkey() {
		// TODO Auto-generated method stub
		System.out.println("getsearchkey()="+mapper.selectSearchkeyword());
		return mapper.selectSearchkeyword();
	}

}
