package me.vita.domain;

import java.util.Date;

import lombok.Data;

@Data
public class SearchVO {

	private Integer searchNo;
	private String searchKeyword;
	private Date searchDate;
	private String userId;
}
