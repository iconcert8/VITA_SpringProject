package me.vita.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import me.vita.domain.UserVO;
import me.vita.mapper.UserMapper;
import me.vita.security.Auth;
import me.vita.security.AuthUser;

@Controller
public class HomeController {
	
	@Autowired
	UserMapper mapper;
	
	@GetMapping("/")
	public String home(@AuthUser UserVO user) {
		return "home";
	}
	
	@GetMapping("/testlogin")
	public String testlogin() {
		return "testlogin";
	}
	
	@PostMapping("/testlogin")
	public String testlogin(@RequestParam("userId") String userId, HttpServletRequest request){
		
		String go = "home";
		UserVO authUser = mapper.testGet(userId);
		if(authUser == null){
			go = "testlogin";
		} else {
			request.getSession().removeAttribute("guest");
			request.getSession().setAttribute("authUser", authUser);
			if(userId.equals("root")){
				go = "admin";
			}
		}
		return go;
	}
	
	@GetMapping("/testlogout")
	public String testlogout(HttpServletRequest request) {
		request.getSession().removeAttribute("authUser");
		return "redirect:/";
	}
	
}
