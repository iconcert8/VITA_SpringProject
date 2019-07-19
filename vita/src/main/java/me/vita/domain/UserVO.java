package me.vita.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserVO {
	
	private String userId;
	private String userPass;
	private String userNick;
	private String userEmail;
	private String userLock;
	private String userImgUuid;
	private String userImgUploadPath;
	private String userImgFileName;
	
	private String AuthKey;
	private String AuthStatus; // T or F
}
