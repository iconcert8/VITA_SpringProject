package me.vita.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;
import me.vita.security.Auth;
import me.vita.security.Auth.Role;

@Controller
@Log4j
@RequestMapping("/admin")
/*
 * 관리자페이지 이동, 신고 리스트, 카테고리 요청 리스트, 통계보기, 삭제복구
 *  
 * type @Auth
 */ 
public class AdminController {
	
	@GetMapping("")
	@Auth(Role.ADMIN)
	public void view() {}
	

}
