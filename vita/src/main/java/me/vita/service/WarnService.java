package me.vita.service;

import java.util.List;

import me.vita.domain.DeletedFeedVO;
import me.vita.domain.WarnVO;
import me.vita.dto.WarnDetailDTO;
import me.vita.dto.WarnSimpleDTO;

public interface WarnService {
	
	public List<WarnSimpleDTO> getList(Integer page);
	public WarnDetailDTO get(Integer feedNo);
	public boolean remove(Integer feedNo, DeletedFeedVO deletedFeedVO);
	public boolean modify(Integer feedNo);
	public boolean register(WarnVO warnVO);
}
