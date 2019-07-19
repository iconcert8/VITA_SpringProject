package me.vita.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	
	@Override
	@Transactional
	public FeedDTO get(Integer feedNo) {
		FeedDTO feedDTO = mapper.selectDetail(feedNo);
		feedDTO.setFeedImages(feedImageMapper.selectList(feedNo));
		feedDTO.setTags(tagMapper.selectList(feedNo));
		return feedDTO;
	}

	@Override
	public List<FeedDTO> getListHot(UserVO user, CategoryFilterDTO filter) {
		List<FeedDTO> feedDTOs = mapper.selectListHot(user, filter);
		//썸네일 이미지 리스트 각각 가져오기
		for(FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
			dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}

	@Override
	public List<FeedDTO> getListRecent(UserVO user, CategoryFilterDTO filter) {
		List<FeedDTO> feedDTOs = mapper.selectListRecent(user, filter);
		//썸네일 이미지 리스트 각각 가져오기
		for(FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
			dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}

	@Override
	public List<FeedDTO> getListNewsFeed(UserVO user, CategoryFilterDTO filter) {
		List<FeedDTO> feedDTOs = mapper.selectListNewsFeed(user, filter);
		//썸네일 이미지 리스트 각각 가져오기
		for(FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
			dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}

	@Override
	public List<FeedDTO> getListFavorite(UserVO user, CategoryFilterDTO filter) {
		List<FeedDTO> feedDTOs = mapper.selectListFavorite(user, filter);
		//썸네일 이미지 리스트 각각 가져오기
		for(FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
			dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}

	@Override
	public List<FeedDTO> getListUserFeed(UserVO user, CategoryFilterDTO filter) {
		List<FeedDTO> feedDTOs = mapper.selectListUserFeed(user, filter);
		//썸네일 이미지 리스트 각각 가져오기
		for(FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
			dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}
	
	@Override
	@Transactional
	public boolean register(FeedDTO feedDTO) {
		int result = mapper.insert(feedDTO);
		
		List<FeedImageVO> imgs = feedDTO.getFeedImages();
		for(FeedImageVO img : imgs) {
			feedImageMapper.insert(img);
		}
		
		List<String> tags = feedDTO.getTags();
		for(String tag : tags) {
			tagMapper.insert(feedDTO.getFeedNo(), tag);
		}
	
		return result == 1;
	}

}
