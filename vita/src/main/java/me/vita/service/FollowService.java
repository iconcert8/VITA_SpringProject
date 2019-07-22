package me.vita.service;

import java.util.List;

import me.vita.domain.FollowVO;
import me.vita.dto.FollowDTO;

public interface FollowService {

	List<FollowDTO> getListFollower(String resId, String search, Integer page);

	List<FollowDTO> getListFollowing(String reqId, String search, Integer page);

	List<FollowDTO> getList(String reqId, String search, Integer page);

	boolean register(FollowVO followVO);

	boolean remove(FollowVO followVO);

}
