package me.vita.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import me.vita.domain.UserVO;

public class AuthInterceptor extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		if (handler instanceof HandlerMethod == false) {
			return true;
		}

		HandlerMethod handlerMethod = (HandlerMethod) handler;

		Auth auth = handlerMethod.getMethodAnnotation(Auth.class);
		Auth adminRole = handlerMethod.getMethod().getDeclaringClass().getAnnotation(Auth.class);

		if (auth == null) {
			return true;
		}
		
		HttpSession session = request.getSession();
		if (session.getAttribute("authUser") == null || session.getAttribute("guset") != null) {
			session.removeAttribute("guest");
			session.removeAttribute("authUser");
			response.sendRedirect(request.getContextPath() + "/user/login");
			return false;
		}
		
		UserVO authUser = (UserVO) session.getAttribute("authUser");
		if (authUser == null) {
			response.sendRedirect(request.getContextPath() + "/user/login");
			return false;
		}

		//관리자 권한	
		if (adminRole != null) { // ClassType Annotation
			if (adminRole.value().equals("ADMIN")) {
				if (authUser.getUserId().equals("root") == false) {
					response.sendRedirect(request.getContextPath() + "/user/login");
					return false;
				}
			}
		} else if (auth.value().toString().equals("ADMIN")) { // method Annotation
			if (authUser.getUserId().equals("root") == false) {
				response.sendRedirect(request.getContextPath() + "/user/login");
				return false;
			}
		}
		return true;
	}

}
