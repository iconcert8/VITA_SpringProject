package me.vita.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedVO {
	
	private Integer feedNo;
	private Integer categoryNo;
	private String userId;
	private String feedContent;
	private String feedLimitContent;
	private Integer feedGoodCnt;
	private Integer feedReplyCnt;
	private Date feedDate;
	private Date feedUpdate;
	private String feedLock;
	private String categoryTemp;
	private String feedDel;

}
