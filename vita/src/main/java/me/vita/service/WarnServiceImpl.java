package me.vita.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import me.vita.domain.DeletedFeedVO;
import me.vita.domain.WarnVO;
import me.vita.dto.WarnDetailDTO;
import me.vita.dto.WarnSimpleDTO;
import me.vita.mapper.DeletedFeedMapper;
import me.vita.mapper.WarnMapper;

@Service
public class WarnServiceImpl implements WarnService {

	@Autowired
	private WarnMapper mapper;
	@Autowired
	private DeletedFeedMapper deletedFeedMapper;
	
	@Override
	public List<WarnSimpleDTO> getList(Integer page) {
		return mapper.selectList(page);
	}
	
	@Override
	public WarnDetailDTO get(Integer feedNo) {
		return mapper.select(feedNo);
	}
	
	
	@Override
	@Transactional
	public boolean remove(Integer feedNo, DeletedFeedVO deletedFeedVO) {
		mapper.modify(feedNo);
		return deletedFeedMapper.insert(deletedFeedVO) > 0;
	}
	
	@Override
	public boolean modify(Integer feedNo) {
		return mapper.modify(feedNo) > 0;
	}
	
	@Override
	public boolean register(WarnVO warnVO) {
		return mapper.insert(warnVO) > 0;
	}
	
	
}
