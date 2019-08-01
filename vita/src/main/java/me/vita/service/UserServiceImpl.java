package me.vita.service;

import java.io.File;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import me.vita.domain.FeedImageVO;
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
	public boolean register(UserVO userVO) throws Exception {

		String authKey = new TempKey().getkey(10, false);

		MailUtils sendMail = new MailUtils(mailSender);

		sendMail.setSubject("[VITA]sign-up authKey");
		sendMail.setText(new StringBuffer().append("<h1>AuthKey</h1>").append("<p>AuthKey: <b> ").append(authKey)
				.append("  </b></p>").toString());
		sendMail.setFrom("Administer ", "Juan");
		sendMail.setTo(userVO.getUserEmail());
		sendMail.send();

		userVO.setUserLock("A");
		userVO.setUserImgUuid("e9fj50f4-ry53-rj48-eh4h-12ys8225d9gk");
		userVO.setUserImgUploadPath("c:\\upload\\userProImg");
		userVO.setUserImgFileName("defaultProImg.png");
		userVO.setAuthKey(authKey);
		userVO.setAuthStatus("F");

		return mapper.insert(userVO) == 1;
	}

	@Override
	public UserVO getUserInfo(String userId) {
		return mapper.selectUserInfo(userId);
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
	public boolean updateUserImg(String userId, MultipartFile userImgFileName) {
		UserVO userInfo = new UserVO();
		String newImg = userImgFileName.getOriginalFilename();

		UUID userImgUuid = UUID.randomUUID();

		userInfo.setUserId(userId);
		userInfo.setUserImgUuid(userImgUuid.toString());
		userInfo.setUserImgFileName(newImg);

		System.out.println(userInfo);

		// 기존 이미지 삭제를 위한 데이터
		UserVO origin = mapper.originalImgFile(userInfo);

		// 이미지 복사해서 저장하기
		File uploadPath = new File(origin.getUserImgUploadPath());

		File saveFile = new File(uploadPath, (userImgUuid.toString() + "_" + newImg));

		try {
			userImgFileName.transferTo(saveFile);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

		return mapper.updateUserImg(userInfo)==1;
	}
}
