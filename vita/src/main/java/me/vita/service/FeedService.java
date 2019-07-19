package me.vita.service;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;

import me.vita.domain.UserVO;
import me.vita.dto.CategoryFilterDTO;
import me.vita.dto.FeedDTO;

public interface FeedService {

	FeedDTO get(Integer feedNo);
	
	List<FeedDTO> getListHot(UserVO user, CategoryFilterDTO filter);

	List<FeedDTO> getListRecent(UserVO user, CategoryFilterDTO filter);

	List<FeedDTO> getListNewsFeed(UserVO user, CategoryFilterDTO filter);

	List<FeedDTO> getListFavorite(UserVO user, CategoryFilterDTO filter);

	List<FeedDTO> getListUserFeed(UserVO user, CategoryFilterDTO filter);

	boolean register(FeedDTO feedDTO);

}
