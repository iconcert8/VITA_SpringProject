package me.vita.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import me.vita.domain.NotificationVO;
import me.vita.security.Auth;
import me.vita.security.Auth.Role;
import me.vita.service.FeedService;
import me.vita.service.NotificationService;

@Controller
@RequestMapping("/notification")
public class NotificationController {

	@Autowired
	private NotificationService service;
	
	
	@PostMapping("/new")
	@Auth(Role.ADMIN)
	public ResponseEntity<String> register(@RequestBody NotificationVO notificationVO){
		
		if(service.register(notificationVO)){
			return new ResponseEntity<String>("success", HttpStatus.OK);
		}else{
			return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
