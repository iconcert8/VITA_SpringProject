package me.vita.mapper;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"file:src/main/webapp/WEB-INF/spring/root-context.xml"})
@Log4j
public class MessengerMapperTests {
	
	@Autowired
	private MessengerMapper mapper;
	
	@Test
	public void milisecondTest() {
		Date date = mapper.test();
		log.info(date);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy:MM:dd:HH:mm:ss:SSS");
		log.info(sdf.format(date));
//		Calendar cal = Calendar.getInstance();
//		cal.setTime(date);
//		log.info(cal.get(Calendar.MILLISECOND));
	}

}
