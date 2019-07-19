package me.vita.domain;

import java.util.Date;

import lombok.Data;

@Data
public class ReplyVO {
	private Integer replyNo;
	private Integer feedNo;
	private String userId;
	private String replyContent;
	private Date replyDate;
	
}
