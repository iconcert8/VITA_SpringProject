package me.vita.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
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

import lombok.extern.log4j.Log4j;
import me.vita.dto.CategoryRequestDTO;
import me.vita.security.Auth;
import me.vita.security.Auth.Role;
import me.vita.service.CategoryRequestService;

@RequestMapping("/categoryRequest")
@Controller
@Log4j
public class CategoryRequestController {
	
	@Autowired
	private CategoryRequestService service;
	
	@GetMapping("/list/{big}/{page}")
	@ResponseBody
	@Auth(Role.ADMIN)
	public List<CategoryRequestDTO> getList(@PathVariable("big")String big, @PathVariable("page") Integer page) {
		String decodeBig = "";
		try {
			decodeBig = URLDecoder.decode(big, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return service.getList(decodeBig, page);
	}
	
	@PostMapping("/new")	//관리자 카테고리 추가 메소드
	@Auth(Role.ADMIN)
	public ResponseEntity<String> register(@RequestBody CategoryRequestDTO dto) {
		if(service.register(dto)) {
			return new ResponseEntity<String>("success", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("")
	@Auth(Role.ADMIN)
	public ResponseEntity<String> remove(@RequestBody CategoryRequestDTO dto){
		if(service.remove(dto)) {
			return new ResponseEntity<String>("success", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
