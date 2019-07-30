package me.vita.mapper;

import java.util.List;

import me.vita.domain.FeedImageVO;

public interface FeedImageMapper {

	List<FeedImageVO> selectList(Integer feedNo);

	int insert(FeedImageVO img);

	FeedImageVO getData(FeedImageVO data);
}
