package me.vita.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;
import me.vita.service.CategoryService;

@Controller
@Log4j
@RequestMapping("/category")
/*
 * 대분류 리스트, 소분류 리스트
 */
public class CategoryController {
	
	@Autowired
	private CategoryService service;
	
	@GetMapping("/list/big")
	@ResponseBody// 대분류 리스트 가져오기
	public List<String> getListBig() {
		return service.getListBig();
	}
	
	@GetMapping("/list/{big}")
	@ResponseBody
	public List<String> getListSmall(@PathVariable("big") String big) {
		return service.getListSmall(big);
	}
	
}
