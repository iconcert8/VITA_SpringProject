package me.vita.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import me.vita.domain.FollowVO;
import me.vita.dto.FollowDTO;

public interface FollowMapper {

	List<FollowDTO> selectList(@Param("reqId") String reqId, @Param("search") String search, @Param("page") Integer page);

	List<FollowDTO> selectListFollower(@Param("resId")String resId, @Param("search") String search, @Param("page") Integer page);

	List<FollowDTO> selectListFollowing(@Param("reqId")String reqId, @Param("search") String search, @Param("page") Integer page);

	int insert(FollowVO followVO);

	int delete(FollowVO followVO);

}
