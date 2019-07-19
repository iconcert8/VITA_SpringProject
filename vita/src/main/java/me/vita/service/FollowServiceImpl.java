package me.vita.service;

import java.util.List;

import org.springframework.stereotype.Service;

import me.vita.dto.FollowDTO;
import me.vita.mapper.FollowMapper;

@Service
public class FollowServiceImpl implements FollowService{

	private FollowMapper mapper;
	
	@Override
	public List<FollowDTO> getList(String reqId, String search) {
		return mapper.selectList(reqId, search);
	}
	@Override
	public List<FollowDTO> getListFollower(String resId, String search) {
		return mapper.selectListFollower(resId, search);
	}
	@Override
	public List<FollowDTO> getListFollowing(String reqId, String search) {
		return mapper.selectListFollowing(reqId, search);
	}
}
