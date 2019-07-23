package me.vita.dto;

import java.util.Date;

import lombok.Data;

@Data
public class NotificationDTO {

	//notification
	private Integer notifyNo;
	private String userId; //reqId
	private Integer feedNo;
	private String notifyType;
	private String notifyMsg;
	private Date notifyDate;
	private String notifyChk;
	
	//reqId info
	private String userNick;
	private String userImgUuid;
	private String userImgUploadPath;
	private String userImgFileName;
}
