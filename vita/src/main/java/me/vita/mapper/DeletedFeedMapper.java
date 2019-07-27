package me.vita.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import me.vita.domain.DeletedFeedVO;

public interface DeletedFeedMapper {
	
	int insert(DeletedFeedVO deletedFeedVO);

	List<DeletedFeedVO> selectList(Integer page);

	DeletedFeedVO select(Integer feedNo);

	int delete(@Param("feedNo")Integer feedNo);
}
