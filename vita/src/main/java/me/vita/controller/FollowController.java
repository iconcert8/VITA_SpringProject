package me.vita.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.extern.log4j.Log4j;
import me.vita.domain.FollowVO;
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
	
	@GetMapping("/list/follower/{search}/{page}")
	@Auth
	@ResponseBody
	public List<FollowDTO> getListFollower(@SessionAttribute("authUser") UserVO user, @PathVariable("search") String search, @PathVariable("page") Integer page){
		search = checkNull(search);
		String userId = user.getUserId();
		return service.getListFollower(userId, search, page);
	}
	
	@GetMapping("/list/following/{search}/{page}")
	@Auth
	@ResponseBody
	public List<FollowDTO> getListFollowing(@SessionAttribute("authUser") UserVO user, @PathVariable("search") String search, @PathVariable("page") Integer page){
		search = checkNull(search);
		String userId = user.getUserId();
		return service.getListFollowing(userId, search, page);
	}
	
	@GetMapping("/list/{search}/{page}")
	@Auth
	@ResponseBody
	public List<FollowDTO> getList(@SessionAttribute("authUser") UserVO user, @PathVariable("search") String search, @PathVariable("page") Integer page){
		search = checkNull(search);
		String userId = user.getUserId();
		return service.getList(userId, search, page);
	}
	
	@PostMapping("/new")
	@Auth
	@ResponseBody
	public ResponseEntity<String> register(@SessionAttribute("authUser") UserVO user, @RequestBody String resId){
		FollowVO followVO = new FollowVO();
		followVO.setReqId(user.getUserId());
		followVO.setResId(resId);
		if(service.register(followVO)){
			return new ResponseEntity<String>(HttpStatus.OK);
		}else{
			return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/{resId}")
	@Auth
	@ResponseBody
	public ResponseEntity<String> remove(@SessionAttribute("authUser") UserVO user, @PathVariable String resId){
		FollowVO followVO = new FollowVO();
		followVO.setReqId(user.getUserId());
		followVO.setResId(resId);
		if(service.remove(followVO)){
			return new ResponseEntity<String>(HttpStatus.OK);
		}else{
			return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public String checkNull(String search){
		if(search.equals("null")){
			return null;
		}
		return search;
	}
}
