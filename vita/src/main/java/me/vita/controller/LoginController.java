package me.vita.controller;


import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import lombok.AllArgsConstructor;
import me.vita.service.LoginService;


@Controller
@RequestMapping("/login")
@AllArgsConstructor
public class LoginController {
	
	private LoginService service;
	
	
	//로그인페이지로 이동
	@GetMapping("")
	public void login(){}
	
	
	//로그인
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public ModelAndView submit(@RequestParam("id") String id, @RequestParam("pw") String pw, ModelAndView mav){
		mav.addObject("id", id);
		mav.addObject("pw", pw);
		String password = service.getPw(id);
		if(password==null){
			mav.setViewName("loginfail");
			mav.addObject("response", "id가 존재하지 않음");
		}else{
			//아이디 존재
			if(password.equals(pw)){
				//로그인 성공
				if(service.getAuthstatus(id).equals("T")){
					//이메일 인증 완료된 경우
					mav.setViewName("loginsuccess");
					mav.addObject("response", "id,pw 일치, 이메일인증완료");
				}else{
					//이메일 인증 안된 경우
					mav.setViewName("emailAuth");
					mav.addObject("id", id);
					mav.addObject("response", "id,pw 일치, 이메일인증필요");
				}
			}else{
				//로그인 실패
				mav.setViewName("loginfail");
				mav.addObject("response", "id일치 pw불일치");
			}
		}
		return mav;
	}
	
	@RequestMapping(value="/authorize", method=RequestMethod.POST)
	public ModelAndView authorize(@RequestParam("id") String id, @RequestParam("authKey") String authKey,ModelAndView mav){

		System.out.println("==================확인");
		mav.setViewName("authorize");
		System.out.println("==================확인2");
		System.out.println("authkey: "+service.getAuthkey(id));
		System.out.println(authKey);
		
		if(service.getAuthkey(id).equals(authKey)){
			mav.addObject("response", "이메일 인증이 완료되었습니다.");
			service.modifyAuthstatus(id);
		}else{
			mav.addObject("response", "인증코드가 다릅니다.");
		}
		
		
		return mav;
	}
	
	
	//회원가입페이지로 이동
	@GetMapping(value="/signup")
	public String gosignup(){
		return "signup";
	}

	
	//회원가입
	@PostMapping(value="/signup")
	public String signup(@RequestParam("id") String id, @RequestParam("password") String pw, @RequestParam("nickname") String nick, @RequestParam("email") String email)throws Exception{
		service.register(id, pw, nick, email, "");
		return "redirect:/login";
	}
	
	@RequestMapping(value="/idcheck", method=RequestMethod.POST, produces ="application/json; charset=UTF-8")
	@ResponseBody
	public Map<Object, Object> idcheck(@RequestBody String userId){
		int count = service.getUserIdcnt(userId);
		Map<Object, Object> map = new HashMap<Object, Object>();
		map.put("cnt", count);
		
		return map;

		
	}
	
	

	
	
}
