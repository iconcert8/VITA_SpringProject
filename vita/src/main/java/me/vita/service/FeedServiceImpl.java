package me.vita.service;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import me.vita.domain.CategoryRequestVO;
import me.vita.domain.FeedImageVO;
import me.vita.domain.SearchVO;
import me.vita.domain.UserVO;
import me.vita.dto.CategoryFilterDTO;
import me.vita.dto.FeedDTO;
import me.vita.mapper.CategoryMapper;
import me.vita.mapper.CategoryRequestMapper;
import me.vita.mapper.FeedImageMapper;
import me.vita.mapper.FeedMapper;
import me.vita.mapper.SearchMapper;
import me.vita.mapper.TagMapper;

@Service
public class FeedServiceImpl implements FeedService {

	@Autowired
	private FeedMapper mapper;

	@Autowired
	private FeedImageMapper feedImageMapper;

	@Autowired
	private TagMapper tagMapper;

	@Autowired
	private SearchMapper searchMapper;

	@Autowired
	private CategoryMapper categoryMapper;

	@Autowired
	private CategoryRequestMapper categoryRequestMapper;

	// @Autowired
	// private ServletContext ser;

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
		insertSearchKeyword(user, filter);
		List<FeedDTO> feedDTOs = mapper.selectList(user, filter, "popular");
		// 썸네일 이미지 리스트 각각 가져오기
		for (FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
			// dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}

	@Override
	public List<FeedDTO> getListRecent(UserVO user, CategoryFilterDTO filter) {
		insertSearchKeyword(user, filter);
		List<FeedDTO> feedDTOs = mapper.selectList(user, filter, "recent");
		// 썸네일 이미지 리스트 각각 가져오기
		for (FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
			// dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}

	@Override
	public List<FeedDTO> getListNewsFeed(UserVO user, CategoryFilterDTO filter) {
		insertSearchKeyword(user, filter);
		List<FeedDTO> feedDTOs = mapper.selectList(user, filter, "newsFeed");
		// 썸네일 이미지 리스트 각각 가져오기
		for (FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
			// dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}

	@Override
	public List<FeedDTO> getListFavorite(UserVO user, CategoryFilterDTO filter) {
		insertSearchKeyword(user, filter);
		List<FeedDTO> feedDTOs = mapper.selectList(user, filter, "favorite");
		// 썸네일 이미지 리스트 각각 가져오기
		for (FeedDTO dto : feedDTOs) {
			dto.setFeedImages(feedImageMapper.selectList(dto.getFeedNo()));
			// dto.setTags(tagMapper.selectList(dto.getFeedNo()));
		}
		return feedDTOs;
	}

	@Override
	public List<FeedDTO> getListUserFeed(UserVO user, CategoryFilterDTO filter) {
		insertSearchKeyword(user, filter);
		List<FeedDTO> feedDTOs = mapper.selectList(user, filter, "userFeed");
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
		mapper.insert(feedDTO);
		int feedNo = feedDTO.getFeedNo();

		List<String> tags = feedDTO.getTags();

		for (String tag : tags) {
			tagMapper.insert(feedDTO.getFeedNo(), tag);
		}

		// 카테고리 요청 등록

		if (feedDTO.getCategoryTemp() != null && feedDTO.getCategoryTemp() != "") {

			CategoryRequestVO categoryRequestVO = new CategoryRequestVO();

			String bigGroup = categoryMapper.getBigGroup(feedDTO.getCategoryNo());
			String categoryRequestSamllGroup = feedDTO.getCategoryTemp();

			categoryRequestVO.setBigGroup(bigGroup);
			categoryRequestVO.setCategoryRequestSmallGroup(categoryRequestSamllGroup);
			categoryRequestVO.setFeedNo(feedNo);

			categoryRequestMapper.request(categoryRequestVO);
		}
		// 파일 업로드 ---------------------------------------------
		String feedImgUploadPath = "C:\\upload";

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
			new File(uploadPath, uploadFileName);
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
	@Transactional
	public boolean registerImg(MultipartFile[] multi, Integer feedNo) {
		for (MultipartFile multipartFile : multi) {
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

	@Override
	public boolean remove(Integer feedNo) {
		return mapper.delete(feedNo) == 1;
	}

	public void insertSearchKeyword(UserVO user, CategoryFilterDTO filter) {
		String userId = user.getUserId();
		if (userId.equals("guest") || userId.equals("")) {
			userId = null;
		}
		if (filter.getSearch() != null && filter.getSearch().size() > 0) {
			for (String searchKeyword : filter.getSearch()) {
				SearchVO searchVO = new SearchVO();
				searchVO.setSearchKeyword(searchKeyword);
				searchVO.setUserId(userId);
				searchMapper.insert(searchVO);
			}
		}
	}
}