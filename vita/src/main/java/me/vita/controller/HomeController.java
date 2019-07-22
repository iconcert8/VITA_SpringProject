package me.vita.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import me.vita.domain.UserVO;
import me.vita.mapper.UserMapper;

@Controller
public class HomeController {
	
	@Autowired
	UserMapper mapper;
	
	@GetMapping("/")
	public String home() {
		return "home";
	}
	
	@GetMapping("/testlogin")
	public String testlogin() {
		return "testlogin";
	}
	
	@PostMapping("/testlogin")
	public String home(HttpServletRequest request,@RequestParam("userId") String userId){
		String go = "home";
		UserVO authUser = mapper.testGet(userId);
		if(authUser == null){
			go = "testlogin";
		}else{
			request.getSession().setAttribute("authUser", authUser);
		}
		return go;
	}
	
}
