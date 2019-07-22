package me.vita.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.vita.domain.FollowVO;
import me.vita.dto.FollowDTO;
import me.vita.mapper.FollowMapper;

@Service
public class FollowServiceImpl implements FollowService{

	@Autowired
	private FollowMapper mapper;
	
	@Override
	public List<FollowDTO> getList(String reqId, String search, Integer page) {
		return mapper.selectList(reqId, search, page);
	}
	@Override
	public List<FollowDTO> getListFollower(String resId, String search, Integer page) {
		return mapper.selectListFollower(resId, search, page);
	}
	@Override
	public List<FollowDTO> getListFollowing(String reqId, String search, Integer page) {
		return mapper.selectListFollowing(reqId, search, page);
	}
	
	@Override
	public boolean register(FollowVO followVO) {
		return mapper.insert(followVO) == 1;
	}
	
	@Override
	public boolean remove(FollowVO followVO) {
		return mapper.delete(followVO) == 1;
	}
}
