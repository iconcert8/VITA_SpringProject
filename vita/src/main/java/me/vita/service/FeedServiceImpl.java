package me.vita.service;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.processing.SupportedSourceVersion;
import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.log4j.Log4j;
import me.vita.domain.FeedImageVO;
import me.vita.domain.UserVO;
import me.vita.dto.CategoryFilterDTO;
import me.vita.dto.FeedDTO;
import me.vita.mapper.FeedImageMapper;
import me.vita.mapper.FeedMapper;
import me.vita.mapper.TagMapper;

@Service
@Log4j
public class FeedServiceImpl implements FeedService {

	@Autowired
	private FeedMapper mapper;

	@Autowired
	private FeedImageMapper feedImageMapper;

	@Autowired
	private TagMapper tagMapper;

	@Autowired
	private ServletContext ser;

	// @Autowired
	// MultipartFile m;

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
		// 썸네일 이미지 리스트 각각 가져오기
		for (FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
			// dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}

	@Override
	public List<FeedDTO> getListRecent(UserVO user, CategoryFilterDTO filter) {
		List<FeedDTO> feedDTOs = mapper.selectListRecent(user, filter);
		// 썸네일 이미지 리스트 각각 가져오기
		for (FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
			// dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}

	@Override
	public List<FeedDTO> getListNewsFeed(UserVO user, CategoryFilterDTO filter) {
		List<FeedDTO> feedDTOs = mapper.selectListNewsFeed(user, filter);
		// 썸네일 이미지 리스트 각각 가져오기
		for (FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
			// dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}

	@Override
	public List<FeedDTO> getListFavorite(UserVO user, CategoryFilterDTO filter) {
		List<FeedDTO> feedDTOs = mapper.selectListFavorite(user, filter);
		// 썸네일 이미지 리스트 각각 가져오기
		for (FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
			// dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}

	@Override
	public List<FeedDTO> getListUserFeed(UserVO user, CategoryFilterDTO filter) {
		List<FeedDTO> feedDTOs = mapper.selectListUserFeed(user, filter);
		// 썸네일 이미지 리스트 각각 가져오기
		for (FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
			// dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}

	@Override
	@Transactional
	public int register(FeedDTO feedDTO) {
		int result = mapper.insert(feedDTO);

		List<String> tags = feedDTO.getTags();

		for (String tag : tags) {
			tagMapper.insert(feedDTO.getFeedNo(), tag);
		}

		// 파일 업로드 ---------------------------------------------
		// String feedImgUploadPath = ser.getRealPath("/resources");
		String feedImgUploadPath = "C:\\upload";
		
		int feedNo = feedDTO.getFeedNo();
		
		File uploadPath = new File(feedImgUploadPath, getFolder());
		
		// 폴더가 없으면 폴더를 생성
		if (uploadPath.exists() == false) {
			uploadPath.mkdirs();
		}
		
		
		feedImgUploadPath = uploadPath.toString();
		
		List<FeedImageVO> imgs = feedDTO.getFeedImages();

		// 이미지 이름을 가져와서 img객체를 지정해주기
		for (FeedImageVO img : imgs) {
			UUID uuid = UUID.randomUUID();
			img.setFeedImgUuid(uuid.toString());
			img.setFeedImgUploadPath(feedImgUploadPath);
			img.setFeedNo(feedNo);
			feedImageMapper.insert(img);

			String uploadFileName = uuid.toString() + "_" + img.getFeedImgFileName();
			File saveFile = new File(uploadPath, uploadFileName);
		}
		return feedNo;
	}

	private String getFolder() {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yy-MM-dd");

		Date date = new Date();

		String str = dateFormat.format(date);

		return str.replace("-", File.separator);
	}

	@Override
	public boolean registerImg(MultipartFile[] multi, Integer feedNo) {
		for(MultipartFile multipartFile : multi){
			String feedImgFileName = multipartFile.getOriginalFilename();

			FeedImageVO data = new FeedImageVO();
			
			data.setFeedImgFileName(feedImgFileName);
			data.setFeedNo(feedNo);
			
			FeedImageVO re = feedImageMapper.getData(data);
			
			File uploadPath = new File(re.getFeedImgUploadPath());

			String uploadFileName = re.getFeedImgUuid() + "_" + re.getFeedImgFileName();
			
			File saveFile = new File(uploadPath, uploadFileName);
			
			try {
				multipartFile.transferTo(saveFile);
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
		}
		return true;
	}
}