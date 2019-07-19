package me.vita.domain;

import java.util.Date;

import lombok.Data;

@Data
public class GoodVO {
	private String userId;
	private Integer feedNo;
	private Date goodDate;
}
