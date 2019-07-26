package me.vita.service;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.request;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import me.vita.controller.FeedController;
import me.vita.domain.FeedImageVO;
import me.vita.domain.UserVO;
import me.vita.dto.CategoryFilterDTO;
import me.vita.dto.FeedDTO;
import me.vita.mapper.FeedImageMapper;
import me.vita.mapper.FeedMapper;
import me.vita.mapper.TagMapper;

@Service
public class FeedServiceImpl implements FeedService{
	
	@Autowired
	private FeedMapper mapper;
	
	@Autowired
	private FeedImageMapper feedImageMapper;
	
	@Autowired
	private TagMapper tagMapper;
	
	@Autowired
	ServletContext ser;
	
	@Override
	@Transactional
	public FeedDTO get(UserVO user, Integer feedNo) {
		FeedDTO feedDTO = mapper.selectDetail(user, feedNo);
		feedDTO.setFeedImages(feedImageMapper.selectList(feedNo));
		feedDTO.setTags(tagMapper.selectList(feedNo));
		return feedDTO;
	}

	@Override
	public List<FeedDTO> getListPopular(UserVO user, CategoryFilterDTO filter) {
		List<FeedDTO> feedDTOs = mapper.selectListPopular(user, filter);
		//썸네일 이미지 리스트 각각 가져오기
		for(FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
//			dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}

	@Override
	public List<FeedDTO> getListRecent(UserVO user, CategoryFilterDTO filter) {
		List<FeedDTO> feedDTOs = mapper.selectListRecent(user, filter);
		//썸네일 이미지 리스트 각각 가져오기
		for(FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
//			dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}

	@Override
	public List<FeedDTO> getListNewsFeed(UserVO user, CategoryFilterDTO filter) {
		List<FeedDTO> feedDTOs = mapper.selectListNewsFeed(user, filter);
		//썸네일 이미지 리스트 각각 가져오기
		for(FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
//			dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}

	@Override
	public List<FeedDTO> getListFavorite(UserVO user, CategoryFilterDTO filter) {
		List<FeedDTO> feedDTOs = mapper.selectListFavorite(user, filter);
		//썸네일 이미지 리스트 각각 가져오기
		for(FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
//			dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}

	@Override
	public List<FeedDTO> getListUserFeed(UserVO user, CategoryFilterDTO filter) {
		List<FeedDTO> feedDTOs = mapper.selectListUserFeed(user, filter);
		//썸네일 이미지 리스트 각각 가져오기
		for(FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
//			dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}
	
	@Override
	@Transactional
	public boolean register(FeedDTO feedDTO) {
		System.out.println("register start ----------------------");
		
		int result = mapper.insert(feedDTO);
		
		List<String> tags = feedDTO.getTags();
		
		for(String tag : tags) {
			tagMapper.insert(feedDTO.getFeedNo(), tag);
			System.out.println("tag입력 성공일껄" + tag);
		}
		
		
		
		
		String a = ser.getRealPath("/resources");
		
		System.out.println("real path :   " + a);
		
		String path = System.getProperty("user.dir");
		String uploadFolder = "\\resources\\upload";
		File uploadPath = new File(uploadFolder, getFolder());
		
		System.out.println("uploadPath : " + uploadPath);
		
		System.out.println(path);
		
		List<FeedImageVO> imgs = feedDTO.getFeedImages();
		
		for(FeedImageVO img : imgs) {
			feedImageMapper.insert(img);
		}
		
	
		
		return result == 1;
	}
	private String getFolder() {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yy-MM-dd");

		Date date = new Date();

		String str = dateFormat.format(date);

		return str.replace("-", File.separator);
	}
}
