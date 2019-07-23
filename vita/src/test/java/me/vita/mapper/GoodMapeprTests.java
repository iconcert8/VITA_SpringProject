package me.vita.mapper;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.extern.log4j.Log4j;
import me.vita.domain.GoodVO;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"file:src/main/webapp/WEB-INF/spring/root-context.xml"})
@Log4j
public class GoodMapeprTests {

	@Autowired
	GoodMapper mapper;
	
	
	//@Test
	public void insertTest(){
		GoodVO goodVO = new GoodVO();
		goodVO.setUserId("userId1");
		goodVO.setFeedNo(1);
		mapper.insert(goodVO);
	}
	@Test
	public void deleteTest(){
		GoodVO goodVO = new GoodVO();
		goodVO.setUserId("userId1");
		goodVO.setFeedNo(1);
		mapper.delete(goodVO);
	}
	
	
}
