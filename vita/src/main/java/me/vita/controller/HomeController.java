package me.vita.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import me.vita.domain.UserVO;
import me.vita.mapper.SearchMapper;
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
	public List<String> rank() {
		return searhMapper.selectRank();
	};

}
