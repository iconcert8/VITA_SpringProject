package me.vita.domain;

import java.util.Date;

import lombok.Data;

@Data
public class NotificationVO {
	
	private Integer notifyNo;
	private String reqId;
	private String resId;
	private Integer feedNo;
	private String notifyType;
	private String notifyMsg;
	private Date notifyDate;
	private String notifyChk;
}
