package me.vita.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import me.vita.domain.FeedVO;
import me.vita.domain.UserVO;
import me.vita.dto.CategoryFilterDTO;
import me.vita.dto.FeedDTO;

public interface FeedMapper {

	FeedVO select(@Param("feedNo") Integer feedNo);

	FeedDTO selectDetail(@Param("user") UserVO user, @Param("feedNo") Integer feedNo);

	List<FeedDTO> selectListPopular(@Param("user") UserVO user, @Param("filter") CategoryFilterDTO filter);

	List<FeedDTO> selectListRecent(@Param("user") UserVO user, @Param("filter") CategoryFilterDTO filter);

	List<FeedDTO> selectListNewsFeed(@Param("user") UserVO user, @Param("filter") CategoryFilterDTO filter);

	List<FeedDTO> selectListFavorite(@Param("user") UserVO user, @Param("filter") CategoryFilterDTO filter);

	List<FeedDTO> selectListUserFeed(@Param("user") UserVO user, @Param("filter") CategoryFilterDTO filter);

	int updateGoodCnt(@Param("feedNo") Integer feedNo, @Param("num") Integer num);

	int updateReplyCnt(@Param("feedNo") Integer feedNo, @Param("num") Integer num);

	int updateFeedDel(@Param("feedNo") Integer feedNo, @Param("feedDel") String feedDel);

	int updateCategory(@Param("feedNo") Integer feedNo, @Param("categoryNo") Integer categoryNo);

	int insert(FeedDTO feedDTO);

	int delete(@Param("feedNo") Integer feedNo);

}
