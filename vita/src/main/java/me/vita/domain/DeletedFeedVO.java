package me.vita.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeletedFeedVO {

	private Integer deletedFeedNo;
	private String deletedFeedReason;
	private String warnCategory;
	private Date deletedFeedDate;
	private Integer feedNo;
	private String feedLimitContent;
}
