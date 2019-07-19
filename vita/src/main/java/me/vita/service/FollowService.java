package me.vita.service;

import java.util.List;

import me.vita.dto.FollowDTO;

public interface FollowService {

	List<FollowDTO> getListFollower(String resId, String search);

	List<FollowDTO> getListFollowing(String reqId, String search);

	List<FollowDTO> getList(String reqId, String search);

}
