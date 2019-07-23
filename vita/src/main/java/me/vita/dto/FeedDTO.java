package me.vita.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.vita.domain.FeedImageVO;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedDTO {
	
	//feed
	private Integer feedNo;
	private String feedContent;
	private String feedLimitContent;
	private Integer feedGoodCnt;
	private Integer feedReplyCnt;
	private Date feedDate;
	private Date feedUpdate;
	private String feedLock;
	private String categoryTemp;
	
	//category
	private Integer categoryNo;
	private String bigGroup;
	private String smallGroup;
	
	//user
	private String userId;
	private String userNick;
	private String userImgUuid;
	private String userImgUploadPath;
	private String userImgFileName;
	
	private String isGood;
	private String isFavorite;
	private String isReply;
	
	private List<FeedImageVO> feedImages;
	private List<String> tags;
	
}
