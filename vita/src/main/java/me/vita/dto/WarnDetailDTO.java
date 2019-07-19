package me.vita.dto;

import java.util.List;

import lombok.Data;
import me.vita.domain.CategoryVO;
import me.vita.domain.FeedVO;
import me.vita.domain.UserVO;
import me.vita.domain.WarnVO;

@Data
public class WarnDetailDTO {
	
	private FeedVO feedVO;
	private UserVO userVO;
	private CategoryVO categoryVO;
	private List<WarnVO> warns;
	
}
