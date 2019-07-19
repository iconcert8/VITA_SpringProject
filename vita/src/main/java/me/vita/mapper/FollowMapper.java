package me.vita.mapper;

import java.util.List;

import me.vita.dto.FollowDTO;

public interface FollowMapper {

	List<FollowDTO> selectList(String reqId, String search);

	List<FollowDTO> selectListFollower(String resId, String search);

	List<FollowDTO> selectListFollowing(String reqId, String search);

}
