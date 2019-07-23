package me.vita.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.extern.log4j.Log4j;
import me.vita.domain.GoodVO;
import me.vita.domain.UserVO;
import me.vita.security.Auth;
import me.vita.service.GoodService;

@Controller
@Log4j
@RequestMapping("/good")
/*
 * 좋아요 신청, 좋아요 취소, 좋아요 개수
 */
public class GoodController {

	@Autowired
	GoodService service;
	
	@PostMapping("/new")
	@Auth
	public ResponseEntity<String> register(@SessionAttribute("authUser") UserVO user,@RequestBody Integer feedNo){
		GoodVO goodVO = new GoodVO();
		goodVO.setFeedNo(feedNo);
		goodVO.setUserId(user.getUserId());
		if(service.register(goodVO)) {
			return new ResponseEntity<String>("success", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/{feedNo}")
	@Auth
	public ResponseEntity<String> remove(@SessionAttribute("authUser") UserVO user, @PathVariable("feedNo") Integer feedNo){
		System.out.println("good feedNo : " +feedNo);
		GoodVO goodVO = new GoodVO();
		goodVO.setUserId(user.getUserId());
		goodVO.setFeedNo(feedNo);
		if(service.remove(goodVO)) {
			return new ResponseEntity<String>("success", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
}
