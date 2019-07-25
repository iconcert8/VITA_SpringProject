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
	private String warnMsg;
	private String warnCategory;
	private String warnChk;
	private Date warnDate;

}
