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
	private String reqId;
	private String isFollow;
}
