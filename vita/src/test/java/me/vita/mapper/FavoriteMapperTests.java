package me.vita.mapper;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.extern.log4j.Log4j;
import me.vita.domain.FavoriteVO;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"file:src/main/webapp/WEB-INF/spring/root-context.xml"})
@Log4j
public class FavoriteMapperTests {

	
	@Autowired
	FavoriteMapper mapper;
	
	//@Test
	public void insertTest(){
		FavoriteVO favoriteVO = new FavoriteVO();
		favoriteVO.setUserId("userId1");
		favoriteVO.setFeedNo(1);
		
		mapper.insert(favoriteVO);
	}
	@Test
	public void deleteTest(){
		FavoriteVO favoriteVO = new FavoriteVO();
		favoriteVO.setUserId("userId1");
		favoriteVO.setFeedNo(1);
		
		mapper.delete(favoriteVO);
	}
}
