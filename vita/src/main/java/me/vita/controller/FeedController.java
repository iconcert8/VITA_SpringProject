package me.vita.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.log4j.Log4j;
import me.vita.domain.UserVO;
import me.vita.dto.CategoryFilterDTO;
import me.vita.dto.FeedDTO;
import me.vita.security.Auth;
import me.vita.security.AuthUser;
import me.vita.service.FeedService;

@Controller
@Log4j
@RequestMapping("/feed")
/*
 * 메인페이지 리스트, 카테고리 리스트(검색포함) 피드 상세 - 원본 이미지가져오기, 피드내용, 좋아요갯수, 즐겨찾기유무, 작성자,
 * 기준번호(vo?)
 * 
 * 상세보기
 * 
 * 리스트포함 내용-피드 넘버, 간략내용, 좋아요갯수, 댓글개수, 즐겨찾기 유무, 카테고리, 작성자,섬네일 이미지 가져오기, 기준번호(vo?)
 * 
 * 모든 리스트는 페이징번호로 스크롤링 처리
 * 
 * ----회원전용----- @Auth Feed 작성, 삭제 뉴스피드 리스트, 즐겨찾기 리스트, , 내글 리스트
 */
public class FeedController {

	@Autowired
	private FeedService service;
	
	@GetMapping("/{feedNo}")
	@ResponseBody
	public FeedDTO get(@SessionAttribute("authUser") UserVO user, @PathVariable("feedNo") Integer feedNo) {
		return service.get(user, feedNo);
	}

	@PostMapping("/list")
	@ResponseBody
	public List<FeedDTO> getList(@AuthUser UserVO user, @RequestBody CategoryFilterDTO filter) {
		System.out.println("......................................................." + filter);
		if(filter.getType().equals("popular")) {
			return service.getListPopular(user, filter);
		} else if(filter.getType().equals("recent")) {
			return service.getListRecent(user, filter);
		}
		return null;
	}
	
	@PostMapping("/list/newsfeed")
	@ResponseBody
	@Auth
	public List<FeedDTO> getListNewsFeed(@SessionAttribute("authUser") UserVO user, @RequestBody CategoryFilterDTO filter) {
		System.out.println(".......................................................newsFeed" + filter);
		return service.getListNewsFeed(user, filter);
	}
	
	@PostMapping("/list/favorite")
	@ResponseBody
	@Auth
	public List<FeedDTO> getListFavorite(@SessionAttribute("authUser") UserVO user, @RequestBody CategoryFilterDTO filter) {
		return service.getListFavorite(user, filter);
	}
	
	@PostMapping("/list/userfeed")
	@ResponseBody
	@Auth
	public List<FeedDTO> getListMyFeed(@SessionAttribute("authUser") UserVO user, @RequestBody CategoryFilterDTO filter) {
//		List<FeedDTO> list = service.getListUserFeed(user, filter);
//		log.info(list);
//		return list;
		return service.getListUserFeed(user, filter);
	}
	
	@PostMapping("/new")
	@Auth
	public /*ResponseEntity<String>*/ void register(@SessionAttribute("authUser") UserVO user, FeedDTO feedDTO, MultipartFile[] uploadFile) {
		log.info("controller start");
		log.info(user);
		log.info(feedDTO);
		for(MultipartFile multi : uploadFile){
			log.info(multi.getOriginalFilename());
		}

		feedDTO.setUserId(user.getUserId());
		if(service.register(feedDTO)) {
			log.info("feedcontroller");
			String uploadFolder = "../upload";
			for(MultipartFile multi : uploadFile){
				String uploadFileName = multi.getOriginalFilename();
				
//				uploadFileName = uploadFileName.substring(uploadFileName.lastIndexOf("\\") + 1);
				System.out.println(uploadFileName);
			}
			
			System.out.println(uploadFolder);
			
			
			
			
			
			
			
			
			
			
			
//			return new ResponseEntity<String>("success", HttpStatus.OK);
		}else {
//			return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}