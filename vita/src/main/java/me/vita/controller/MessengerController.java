package me.vita.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import me.vita.domain.UserVO;
import me.vita.dto.MessengerDTO;
import me.vita.security.Auth;
import me.vita.service.MessengerService;

@Controller
@RequestMapping("/messenger")
/*
 * 메신저 페이지 이동, 메신저 리스트, 메신저 목록 리스트
 */
public class MessengerController {

	@Autowired
	private MessengerService service;

	@GetMapping("")
	@Auth
	public void view(@ModelAttribute("contactUser") String contactUser) {
	}

	@GetMapping("/{contactUser}")
	@Auth
	public String viewContactUser(@PathVariable("contactUser") String contactUser, RedirectAttributes rttr) {
		rttr.addFlashAttribute("contactUser", contactUser);
		return "redirect:/messenger";
	}

	@GetMapping("/list")
	@Auth
	@ResponseBody
	public List<MessengerDTO> getList(@SessionAttribute("authUser") UserVO user) {
		return service.getList(user);
	}

	@GetMapping("/list/{contactUser}")
	@Auth
	@ResponseBody
	public List<MessengerDTO> getListContactUser(@SessionAttribute("authUser") UserVO user,
			@PathVariable("contactUser") String contactUser) {
		return service.getListContactUser(user, contactUser);
	}

}
