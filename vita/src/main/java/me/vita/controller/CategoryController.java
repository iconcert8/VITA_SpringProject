package me.vita.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import me.vita.domain.CategoryVO;
import me.vita.service.CategoryService;

@Controller
@RequestMapping("/category")
/*
 * 대분류 리스트, 소분류 리스트
 */
public class CategoryController {

	@Autowired
	private CategoryService service;

	@GetMapping("/list/big")
	@ResponseBody // 대분류 리스트 가져오기
	public List<String> getListBig() {
		List<String> list = service.getListBig();

		return list;
	}

	@GetMapping("/list/{big}")
	@ResponseBody
	public List<CategoryVO> getListSmall(@PathVariable("big") String big) {
		String decodeBig = "";
		try {
			decodeBig = URLDecoder.decode(big, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		return service.getListSmall(decodeBig);
	}
}