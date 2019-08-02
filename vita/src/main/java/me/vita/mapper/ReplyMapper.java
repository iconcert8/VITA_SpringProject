package me.vita.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import me.vita.domain.ReplyVO;
import me.vita.dto.ReplyDTO;

public interface ReplyMapper {

	int insert(ReplyVO replyVO);

	int delete(Integer replyNo);

	List<ReplyDTO> selectList(@Param("userId") String userId, @Param("feedNo") Integer feedNo,
			@Param("page") Integer page);

	Integer selectCount(Integer feedNo);

	// 피드삭제 시 댓글 전체삭제
	int deleteAll(Integer feedNo);

}
