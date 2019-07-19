package me.vita.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.extern.log4j.Log4j;
import me.vita.domain.UserVO;
import me.vita.dto.FollowDTO;
import me.vita.security.Auth;
import me.vita.service.FollowService;

@Controller
@Log4j
@RequestMapping("/follow")
/*
 * 팔로우 페이지 이동, 팔로잉 리스트(검색포함), 팔로워 리스트(검색포함), 사람찾기 검색 결과 리스트, 팔로우 추가, 팔로우 삭제
 */
public class FollowController {

	@Autowired
	FollowService service;
	
	@GetMapping("")
	public void view() {}
	
	@GetMapping("/list/follower/{search}")
	@Auth
	@ResponseBody
	public List<FollowDTO> getListFollower(@SessionAttribute("authUser") UserVO user, @PathVariable("search") String search){
		String resId = user.getUserId();
		return service.getListFollower(resId, search);
	}
	
	@GetMapping("/list/following/{search}")
	@Auth
	@ResponseBody
	public List<FollowDTO> getListFollowing(@SessionAttribute("authUser") UserVO user, @PathVariable("search") String search){
		String reqId = user.getUserId();
		return service.getListFollowing(reqId, search);
	}
	
	@GetMapping("/list/{search}")
	@Auth
	@ResponseBody
	public List<FollowDTO> getList(@SessionAttribute("authUser") UserVO user, @PathVariable("search") String search){
		String reqId = user.getUserId();
		return service.getList(reqId, search);
	}
}
