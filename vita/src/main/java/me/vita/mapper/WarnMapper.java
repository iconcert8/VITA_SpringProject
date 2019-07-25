package me.vita.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import me.vita.domain.WarnVO;
import me.vita.dto.WarnSimpleDTO;

public interface WarnMapper {

	List<WarnSimpleDTO> selectList(@Param("page")Integer page);

	List<WarnVO> selectListRequest(@Param("feedNo")Integer feedNo);

	int update(@Param("feedNo")Integer feedNo);

	int insert(WarnVO warnVO);
}
