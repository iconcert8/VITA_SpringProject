package me.vita.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import me.vita.domain.DeletedFeedVO;
import me.vita.dto.DeletedFeedDTO;
import me.vita.mapper.DeletedFeedMapper;
import me.vita.mapper.FeedMapper;

@Service
public class DeletedFeedServiceImpl implements DeletedFeedService{
	
	@Autowired
	private DeletedFeedMapper mapper;
	@Autowired
	private FeedMapper feedMapper;

	@Override
	public List<DeletedFeedVO> getList(Integer page) {
		return mapper.selectList(page);
	}

	@Override
	@Transactional
	public DeletedFeedDTO get(Integer feedNo) {
		DeletedFeedDTO dto = new DeletedFeedDTO();
		dto.setFeedVO(feedMapper.select(feedNo));
		dto.setDeletedFeedVO(mapper.select(feedNo));
		return dto;
	}

	@Override
	@Transactional
	public boolean modify(Integer feedNo) {
		feedMapper.updateFeedDel(feedNo);
		return mapper.delete(feedNo) == 1;
	}

}
