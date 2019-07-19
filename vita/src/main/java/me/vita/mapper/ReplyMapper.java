package me.vita.mapper;

import java.util.List;

import me.vita.domain.ReplyVO;
import me.vita.dto.ReplyDTO;

public interface ReplyMapper {

	int insert(ReplyVO replyVO);

	int delete(Integer replyNo);

	List<ReplyDTO> selectList(String userId, Integer feedNo, Integer page);

	Integer selectCount(Integer feedNo);

}
