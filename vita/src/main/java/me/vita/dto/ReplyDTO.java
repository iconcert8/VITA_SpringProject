package me.vita.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ReplyDTO {
	//reply
	private Integer replyNo;
	private Integer feedNo;
	private String replyContent;
	private Date replyDate;
	
	//user
	private String userId;
	private String userNick;
	private String userLock;
	private String userImgUuid;
	private String userImgUploadPath;
	private String userImgFileName;
	
	//is the reply mine??
	private String isMyReply;
}
