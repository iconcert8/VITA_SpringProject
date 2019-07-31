package me.vita.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import me.vita.domain.DeletedFeedVO;
import me.vita.domain.WarnVO;
import me.vita.dto.WarnSimpleDTO;
import me.vita.mapper.DeletedFeedMapper;
import me.vita.mapper.FeedMapper;
import me.vita.mapper.WarnMapper;

@Service
public class WarnServiceImpl implements WarnService {

	@Autowired
	private WarnMapper mapper;
	
	@Autowired FeedMapper feedMapper;
	
	@Autowired
	private DeletedFeedMapper deletedFeedMapper;
	
	@Override
	public List<WarnSimpleDTO> getList(Integer page) {
		return mapper.selectList(page);
	}
	
	@Override
	public List<WarnVO> getListRequest(Integer feedNo) {
		return mapper.selectListRequest(feedNo);
	}
	
	
	@Override
	@Transactional
	public boolean remove(Integer feedNo, DeletedFeedVO deletedFeedVO) {
		mapper.update(feedNo);
		feedMapper.updateFeedDel(feedNo, "T");
		return deletedFeedMapper.insert(deletedFeedVO) > 0;
	}
	
	//신고 취소시 삭제
	@Override
	public boolean modify(Integer feedNo) {
		return mapper.delete(feedNo) > 0;
	}
	
	@Override
	public boolean register(WarnVO warnVO) {
		return mapper.insert(warnVO) == 1;
	}
	
	
}
