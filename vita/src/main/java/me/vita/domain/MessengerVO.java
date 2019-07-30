package me.vita.domain;

import java.util.Date;

import lombok.Data;

@Data
public class MessengerVO {
	
	private Integer msgNo;
	private String msg;
	private Date msgDate;
	private String msgChk;
	private String msgDel;
	private String reqId;
	private String resId;
	
}
