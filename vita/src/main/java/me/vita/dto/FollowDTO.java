package me.vita.dto;

import java.util.Date;

import lombok.Data;

@Data
public class FollowDTO {

	//follow
	private String reqId;
	private String resId;
	private Date followDate;
	
	//user information
	//followerlist reqId information
	//followingList resId information
	private String userNick;
	private String userLock;
	private String userImgUuid;
	private String userImgUploadPath;
	private String userImgFileName;
	
	//if i'm resId then am i follow reqId?
	private String isFollow;
	
}
