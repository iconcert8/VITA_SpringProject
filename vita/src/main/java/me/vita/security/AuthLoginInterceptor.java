package me.vita.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import me.vita.domain.UserVO;

@Component
public class AuthLoginInterceptor extends HandlerInterceptorAdapter {
	/*
	 * @Autowired private UserService service;
	 */
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		if (request.getMethod().equals("GET")) {
			System.out.println("login method : get");
			return true;
		} else {
			System.out.println("login method : post");
			String id = request.getParameter("userId");
			String pass = request.getParameter("userPass");

			UserVO vo = new UserVO();
			vo.setUserId(id);
			vo.setUserPass(pass);

			/*
			 * 로그인 확인 if(service.login(vo)) {
			 * request.getSession().setAttribute("authUser", vo);
			 * response.sendRedirect("/"); }else { // 로그인 실패시 return true; }
			 */
		}
		return false;
	}

}
