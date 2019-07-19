package me.vita.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.extern.log4j.Log4j;
import me.vita.domain.UserVO;
import me.vita.dto.UserDTO;
import me.vita.security.Auth;
import me.vita.service.UserService;

@Controller
@Log4j
@RequestMapping("/user")
/*
 * 회원가입페이지, 로그인페이지, 회원가입 처리, 로그인처리(interceptor), 유저정보
 */
public class UserController {
	
	@Autowired
	UserService service;
	
	
	@PostMapping("/new")
	public String register(UserVO userVO, RedirectAttributes rttr) {
		if(service.register(userVO)) {
			rttr.addFlashAttribute("reuslt", "Welcom "+userVO.getUserId());
			return "redirect:/";
		}else {
			rttr.addFlashAttribute("reuslt", "THe Server is Bad");
			return "redirect:회원가입 페이지";
		}
	}
	
	
	@GetMapping("/login")
	public String view() {
		return "로그인 페이지";
	}
	
	
	@PostMapping("/login")
//	interceptor 처리 / 로그인 실패시 작동
	public String login(RedirectAttributes rttr) {
		rttr.addFlashAttribute("reuslt", "Login is fail / Please Check ID and Password");
		return "redirect:/user/login";
	}
	
	
	//유저 상세보기
	@GetMapping("/{userId}")
	@ResponseBody
	@Auth
	public UserDTO get(@SessionAttribute("authUser") UserVO user, @PathVariable("userId") String userId) {
		UserDTO userDTO = service.get(user.getUserId(), userId);
		if(user.getUserId().equals(userId)) {
			userDTO.setIsFollow("me");
		}
		return userDTO;
	}
	
	
	
}
