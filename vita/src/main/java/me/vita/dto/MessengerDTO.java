package me.vita.dto;

import java.util.Date;

import lombok.Data;

@Data
public class MessengerDTO {
	
//	last Msg
	private Integer msgNo;
	private String msg;
	private Date msgDate;
	private String msgChk;
	private String msgDel;
	private String reqId;
	private String resId;
	
//	userInfo
	private String userId;
	private String userNick;
	private String userImgUuid;
	private String userImgUploadPath;
	private String userImgFileName;
	
	private Integer readless;

}
