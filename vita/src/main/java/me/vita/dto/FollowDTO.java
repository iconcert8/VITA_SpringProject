package me.vita.dto;

import java.util.Date;

import lombok.Data;

@Data
public class FollowDTO {

	
	private String userId;
	private Date followDate;
	
	//user information
	private String userNick;
	private String userLock;
	private String userImgUuid;
	private String userImgUploadPath;
	private String userImgFileName;
	
	//do you follow that user?
	private String isFollow;
	
}
