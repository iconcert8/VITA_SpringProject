package me.vita.dto;

import lombok.Data;

@Data
public class UserDTO {
	
	//user
	private String userId;
	private String userNick;
	private String userLock;
	private String userImgUuid;
	private String userImgUploadPath;
	private String userImgFileName;
	
	//is follow that user?
	private String reqId;	// authUser를 follow하고 있는지
	private String isFollow;	// authUser가 이user를 follow하고 있는지
}
