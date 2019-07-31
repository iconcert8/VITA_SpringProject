package me.vita.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.extern.log4j.Log4j;
import me.vita.domain.UserVO;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class MessengerServiceTests {
	
	@Autowired
	private MessengerService service;
	
//	@Test
	public void mapToList() {
		UserVO user = new UserVO();
		user.setUserId("userId4");
		
		log.info(service.getList(user));
	}
	
	@Test
	public void getTest() {
		log.info(service.get(33));
	}

}
