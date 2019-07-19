package me.vita.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import me.vita.domain.FeedVO;
import me.vita.domain.UserVO;
import me.vita.dto.CategoryFilterDTO;
import me.vita.dto.FeedDTO;

public interface FeedMapper {

	FeedVO select(Integer feedNo);
	
	FeedDTO selectDetail(Integer feedNo);

	List<FeedDTO> selectListHot(@Param("user") UserVO user, @Param("filter") CategoryFilterDTO filter);

	List<FeedDTO> selectListRecent(@Param("user") UserVO user, @Param("filter") CategoryFilterDTO filter);

	List<FeedDTO> selectListNewsFeed(@Param("user") UserVO user, @Param("filter") CategoryFilterDTO filter);

	List<FeedDTO> selectListFavorite(@Param("user") UserVO user, @Param("filter") CategoryFilterDTO filter);

	List<FeedDTO> selectListUserFeed(@Param("user") UserVO user, @Param("filter") CategoryFilterDTO filter);

	int updateGoodCnt(Integer num);

	int updateReplyCnt(Integer num);
	
	int updateFeedDel(Integer feedNo);
	
	int updateCategory(String feedNo, Integer categoryNo);

	int insert(FeedDTO feedDTO);



}
