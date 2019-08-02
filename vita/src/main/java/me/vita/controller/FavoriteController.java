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

import me.vita.domain.FavoriteVO;
import me.vita.domain.UserVO;
import me.vita.security.Auth;
import me.vita.service.FavoriteService;

@Controller
@RequestMapping("/favorite")
/*
 * 즐겨찾기 추가, 즐겨찾기 삭제
 */
public class FavoriteController {

	@Autowired
	FavoriteService service;

	@PostMapping("/new")
	@Auth
	public ResponseEntity<String> register(@SessionAttribute("authUser") UserVO user, @RequestBody Integer feedNo) {
		FavoriteVO favoriteVO = new FavoriteVO();
		favoriteVO.setFeedNo(feedNo);
		favoriteVO.setUserId(user.getUserId());
		if (service.register(favoriteVO)) {
			return new ResponseEntity<String>("success", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/{feedNo}")
	@Auth
	public ResponseEntity<String> remove(@SessionAttribute("authUser") UserVO user,
			@PathVariable("feedNo") Integer feedNo) {
		FavoriteVO favoriteVO = new FavoriteVO();
		favoriteVO.setUserId(user.getUserId());
		favoriteVO.setFeedNo(feedNo);
		if (service.remove(favoriteVO)) {
			return new ResponseEntity<String>("success", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}
