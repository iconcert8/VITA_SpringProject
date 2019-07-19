package me.vita.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import me.vita.domain.DeletedFeedVO;
import me.vita.dto.DeletedFeedDTO;

public interface DeletedFeedService {

	List<DeletedFeedVO> getList(Integer page);

	DeletedFeedDTO get(Integer feedNo);

	boolean modify(Integer feedNo);

}
