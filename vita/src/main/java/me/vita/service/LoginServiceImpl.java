package me.vita.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import me.vita.domain.MailUtils;
import me.vita.domain.TempKey;
import me.vita.mapper.LoginMapper;
@Service
@AllArgsConstructor
public class LoginServiceImpl implements LoginService {
	
	
	
	private LoginMapper mapper;
	
	private JavaMailSender mailSender;
	
	@Override
	public String getPw(String userId) {
		// TODO Auto-generated method stub
		return mapper.selectPw(userId);
	}

	@Override
	public void register(String userId, String userPass, String userNick, String userEmail, String userImg)throws Exception {
		// TODO Auto-generated method stub
		
		String authkey = new TempKey().getkey(10, false);
		
		MailUtils sendMail = new MailUtils(mailSender);
		
		sendMail.setSubject("[VITA]sign-up authKey");
		sendMail.setText(new StringBuffer().append("<h1>AuthKey</h1>").append("<p>AuthKey: <b> ")
				.append(authkey).append("  </b></p>").toString());
		sendMail.setFrom("Administer ", "Juan");
		sendMail.setTo(userEmail);
		sendMail.send();
		
		
		
		
		
		mapper.insertUser(userId, userPass, userNick, userEmail, userImg, authkey, "F");
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
	
}
