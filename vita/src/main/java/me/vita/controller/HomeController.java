package me.vita.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import me.vita.domain.UserVO;
import me.vita.mapper.SearchMapper;
import me.vita.mapper.UserMapper;
import me.vita.security.Auth;
import me.vita.security.AuthUser;

@Controller
public class HomeController {
	
	@Autowired
	SearchMapper searhMapper;
	
	@GetMapping("/")
	public String home(@AuthUser UserVO user) {
		return "home";
	}
	
	@GetMapping("/rank")
	@ResponseBody
	public List<String> rank(){
		return searhMapper.selectRank();
	};
	
}
