package me.vita.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import me.vita.domain.ReplyVO;
import me.vita.dto.ReplyDTO;

public interface ReplyMapper {

	int insert(ReplyVO replyVO);

	int delete(Integer replyNo);

	List<ReplyDTO> selectList(@Param("feedNo") Integer feedNo);

	Integer selectCount(Integer feedNo);

}
