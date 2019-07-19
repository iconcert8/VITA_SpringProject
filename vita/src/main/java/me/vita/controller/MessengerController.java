package me.vita.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/messenger")
/*
 * 메신저 페이지 이동, 메신저 리스트, 메신저 목록 리스트
 */
public class MessengerController {

	@GetMapping("")
	public void view() {  }
}
