package me.vita.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.log4j.Log4j;
import me.vita.domain.DeletedFeedVO;
import me.vita.dto.DeletedFeedDTO;
import me.vita.security.Auth;
import me.vita.security.Auth.Role;
import me.vita.service.DeletedFeedService;

@Controller
@RequestMapping("/deletedFeed")
@Log4j
@Auth(Role.ADMIN)
public class DeletedFeedController {
	
	@Autowired
	private DeletedFeedService service;
	
	@GetMapping("/list/{page}")
	@ResponseBody
	public List<DeletedFeedVO> getList(@PathVariable("page") Integer page) {
		return service.getList(page);
	}
	
	@GetMapping("/{feedNo}")	
	@ResponseBody
	public DeletedFeedDTO get(@PathVariable("feedNo") Integer feedNo) {
		return service.get(feedNo);
	}
 
	@PutMapping("/{feedNo}")
	public ResponseEntity<String> modify(@PathVariable("feedNo") Integer feedNo) {
		if(service.modify(feedNo)) {
			return new ResponseEntity<String>("success", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
