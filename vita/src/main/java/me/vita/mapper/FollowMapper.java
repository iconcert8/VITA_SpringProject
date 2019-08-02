package me.vita.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import me.vita.domain.FollowVO;
import me.vita.dto.FollowDTO;

public interface FollowMapper {

	List<FollowDTO> selectList(@Param("userId") String userId, @Param("search") String search,
			@Param("page") Integer page);

	List<FollowDTO> selectListFollower(@Param("userId") String userId, @Param("search") String search,
			@Param("page") Integer page);

	List<FollowDTO> selectListFollowing(@Param("userId") String userId, @Param("search") String search,
			@Param("page") Integer page);

	int insert(FollowVO followVO);

	int delete(FollowVO followVO);

}
