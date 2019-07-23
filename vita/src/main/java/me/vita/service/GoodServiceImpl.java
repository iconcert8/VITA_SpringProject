package me.vita.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import lombok.Setter;
import me.vita.domain.GoodVO;
import me.vita.mapper.FeedMapper;
import me.vita.mapper.GoodMapper;

@Service
public class GoodServiceImpl implements GoodService{

	@Autowired
	private GoodMapper mapper;
	
	@Autowired
	private FeedMapper feedMapper;
	
	
	@Override
	@Transactional
	public boolean register(GoodVO goodVO) {
		feedMapper.updateGoodCnt(goodVO.getFeedNo(),1);
		return mapper.insert(goodVO) == 1;
	}
	
	@Override
	@Transactional
	public boolean remove(GoodVO goodVO) {
		feedMapper.updateGoodCnt(goodVO.getFeedNo(),-1);
		return mapper.delete(goodVO) == 1;
	}
}
