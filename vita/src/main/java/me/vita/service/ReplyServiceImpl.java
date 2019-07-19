package me.vita.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import me.vita.domain.ReplyVO;
import me.vita.dto.ReplyDTO;
import me.vita.mapper.FeedMapper;
import me.vita.mapper.ReplyMapper;

@Service
public class ReplyServiceImpl implements ReplyService {

	@Autowired
	private ReplyMapper mapper;
	
	@Autowired
	private FeedMapper feedMapper;
	
	@Override
	@Transactional
	public boolean register(ReplyVO replyVO) {
		feedMapper.updateReplyCnt(1);
		return mapper.insert(replyVO) > 0;
	}

	@Override
	public List<ReplyDTO> getList(String userId, Integer feedNo, Integer page) {
		return mapper.selectList(userId, feedNo, page);
	}

	@Override
	public boolean remove(Integer replyNo) {
		feedMapper.updateReplyCnt(-1);
		return mapper.delete(replyNo) > 0;
	}

	@Override
	public Integer getCount(Integer feedNo) {
		return mapper.selectCount(feedNo);
	}

}
