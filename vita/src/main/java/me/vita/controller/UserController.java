package me.vita.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import me.vita.domain.UserVO;
import me.vita.dto.UserDTO;
import me.vita.mapper.UserMapper;
import me.vita.security.Auth;
import me.vita.security.AuthUser;
import me.vita.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService service;
	UserMapper mapper;
	
	@GetMapping("/new")
	public String signupview(){
		return "signup";
	}
	
	@PostMapping("/new")
	public String register(UserVO userVO, RedirectAttributes rttr)throws Exception {
		if(service.register(userVO)){
			rttr.addFlashAttribute("response", "로그인 시도 후 이메일 인증을 해주십시오");
			return "redirect:/user/login";
		}else{
			rttr.addFlashAttribute("response", "실패하였습니다. 다시 시도해 주십시오");
			return "redirect:/user/new";
		}
	}
	
	@PostMapping("/idcheck")
	@ResponseBody
	public Map<Object, Object> idcheck(@RequestBody String userId){
		System.out.println(userId);
		int count = service.getUserIdcnt(userId);
		Map<Object, Object> map = new HashMap<Object, Object>();
		map.put("cnt", count);
		return map;
	}
	
	@GetMapping("/logout")
	public String testlogout(HttpServletRequest request) {
		request.getSession().removeAttribute("authUser");
		return "redirect:/";
	}
	
	@GetMapping("/login")
	public String view() {return "login";}
	
	@PostMapping("/login")
	public String login(HttpServletRequest request, @RequestParam("userId") String userId, @RequestParam("userPass") String userPass, RedirectAttributes rttr) {
		String password = service.getPw(userId);
		if(password==null){
			//입력한 id에 해당하는 pw가 db에 없을때
			rttr.addFlashAttribute("response", "id가 존재하지 않음");
			return "redirect:/user/login";
		}else{
			//id와 pw가 모두 db에 존재할때
			if(password.equals(userPass)){
				if(service.getAuthstatus(userId).equals("T")){
					//이메일 인증 완료시
					UserVO authUser = service.getUserInfo(userId);
					request.getSession().removeAttribute("guest");
					request.getSession().setAttribute("authUser", authUser);
					if(userId.equals("root")){
						return "redirect:/admin";
					}
					return "redirect:/";
				}else{
					//이메일 인증 미완료
					rttr.addFlashAttribute("response", "email인증 필요");
					rttr.addFlashAttribute("userId", userId);
					return "redirect:/user/login/emailAuth";
				}
			}else{
				rttr.addFlashAttribute("response", "password 불일치");
				rttr.addFlashAttribute("userId", userId);
				return "redirect:/user/login";
			}
		}
	}
	
	
	@GetMapping("/login/emailAuth")
	public String emailAuth(){return "emailAuth";}
	
	@PostMapping("/login/emailAuth")
	public String emailAuth(HttpServletRequest request, @RequestParam("userId") String userId, @RequestParam("authKey")String authKey, RedirectAttributes rttr){
		String dbAuthKey = service.getAuthkey(userId);
		if(dbAuthKey.equals(authKey)){
			UserVO authUser = service.getUserInfo(userId);
			request.getSession().removeAttribute("guest");
			request.getSession().setAttribute("authUser", authUser);
			service.modifyAuthstatus(userId);
			return "redirect:/";
		}else{
			rttr.addFlashAttribute("response", "인증키가 불일치 합니다");
			rttr.addFlashAttribute("userId", userId);
			return "redirect:/user/login/emailAuth";
		}
	}

	@GetMapping("/{userId}")
	@ResponseBody
	public UserDTO get(@AuthUser UserVO user, @PathVariable("userId") String userId) {
		UserDTO userDTO = service.get(user.getUserId(), userId);
		System.out.println(userDTO);
//		if(user.getUserId().equals(userId)) {
//			userDTO.setIsFollow("me");
//		}
		return userDTO;
	}
	
	@GetMapping("/gotoUser/{gotoUser}")
	@Auth
	public String viewContactUser(@PathVariable("gotoUser") String gotoUser, RedirectAttributes rttr) {
		rttr.addFlashAttribute("gotoUser", gotoUser);
		return "redirect:/";
	}
	
}
