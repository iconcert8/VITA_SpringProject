package me.vita.service;

import java.util.List;

import me.vita.domain.ReplyVO;
import me.vita.dto.ReplyDTO;

public interface ReplyService {

	boolean register(ReplyVO replyVO);

	List<ReplyDTO> getList(String userId, Integer feedNo, Integer page);

	boolean remove(Integer feedNo, Integer replyNo);

	Integer getCount(Integer feedNo);

	
}
