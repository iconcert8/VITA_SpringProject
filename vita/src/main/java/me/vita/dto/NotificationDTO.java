package me.vita.dto;

import lombok.Data;

@Data
public class NotificationDTO {

	//notification
	private Integer notifyNo;
	private String userId; //reqId
	private Integer feedNo;
	private String notifyType;
	private String notifyMsg;
	private String notifyDate;
	private String notifyChk;
	
	//reqId info
	private String userNick;
	private String userImgUuid;
	private String userImgUploadPath;
	private String userImgFileName;
}
