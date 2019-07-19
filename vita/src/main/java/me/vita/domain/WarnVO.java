package me.vita.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WarnVO {
	
	private Integer feedNo;
	private String userId;
	private String feedLimitContent;
	private String WarnMsg;
	private String WarnCategory;
	private String WarnChk;
	private Date warnDate;

}
