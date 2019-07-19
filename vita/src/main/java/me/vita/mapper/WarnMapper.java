package me.vita.mapper;

import java.util.List;

import me.vita.domain.DeletedFeedVO;
import me.vita.domain.WarnVO;
import me.vita.dto.WarnDetailDTO;
import me.vita.dto.WarnSimpleDTO;

public interface WarnMapper {

	List<WarnSimpleDTO> selectList(Integer page);

	WarnDetailDTO select(Integer feedNo);

	int modify(Integer feedNo);

	int insert(WarnVO warnVO);
}
