package me.vita.domain;

import java.util.Date;

import lombok.Data;

@Data
public class FollowVO {
	private String reqId;
	private String resId;
	private Date followDate;
}
