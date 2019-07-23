package me.vita.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.extern.log4j.Log4j;
import me.vita.domain.GoodVO;
import me.vita.mapper.GoodMapeprTests;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"file:src/main/webapp/WEB-INF/spring/root-context.xml"})
@Log4j
public class GoodServiceTests {
	
	@Autowired
	GoodService service;
	
	//@Test
	public void registerTest(){
		GoodVO goodVO = new GoodVO();
		goodVO.setFeedNo(1);
		goodVO.setUserId("userId1");
		
		service.register(goodVO);
	}
	
	@Test
	public void removeTest(){
		GoodVO goodVO = new GoodVO();
		goodVO.setFeedNo(1);
		goodVO.setUserId("userId1");
		
		service.remove(goodVO);
	}
}
