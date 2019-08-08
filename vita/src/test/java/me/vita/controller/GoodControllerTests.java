package me.vita.controller;

import static org.hamcrest.CoreMatchers.startsWith;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import me.vita.domain.UserVO;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration({"file:src/main/webapp/WEB-INF/spring/root-context.xml",
						"file:src/main/webapp/WEB-INF/spring/appServlet/servlet-context.xml"})
public class GoodControllerTests {

	@Autowired
	private WebApplicationContext ctx;
	
	private MockMvc mockMvc;
	private MockHttpSession session;
	private MockHttpServletRequest request;
	
	@Before
	public void setup(){
		this.mockMvc = MockMvcBuilders.webAppContextSetup(ctx).build();
		UserVO user = new UserVO();
		user.setUserId("iconcert8");
		user.setAuthStatus("T");
		user.setUserNick("booGyeom");
		
		session = new MockHttpSession();
		session.setAttribute("authUser", user);
		
		request = new MockHttpServletRequest();
		request.setSession(session);
		
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
	}
	
	@Test
	public void registerTest() throws Exception{
		
		mockMvc.perform(MockMvcRequestBuilders.post("/good/new")
					.contentType(MediaType.APPLICATION_JSON)
					.content("{\"feedNo\":1}")
				).andReturn();
	}
	
}
