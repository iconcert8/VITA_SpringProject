package me.vita.service;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import me.vita.domain.UserVO;
import me.vita.dto.CategoryFilterDTO;
import me.vita.dto.FeedDTO;

public interface FeedService {

	FeedDTO get(UserVO user, Integer feedNo);
	
	List<FeedDTO> getListPopular(UserVO user, CategoryFilterDTO filter);

	List<FeedDTO> getListRecent(UserVO user, CategoryFilterDTO filter);

	List<FeedDTO> getListNewsFeed(UserVO user, CategoryFilterDTO filter);

	List<FeedDTO> getListFavorite(UserVO user, CategoryFilterDTO filter);

	List<FeedDTO> getListUserFeed(UserVO user, CategoryFilterDTO filter);

	int register(FeedDTO feedDTO);
	
	boolean registerImg(MultipartFile[] multi, Integer feedNo);
	
	boolean remove(Integer feedNo);

}
