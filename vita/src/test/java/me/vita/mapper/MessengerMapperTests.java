package me.vita.mapper;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.extern.log4j.Log4j;
import me.vita.domain.MessengerVO;
import me.vita.dto.MessengerDTO;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"file:src/main/webapp/WEB-INF/spring/root-context.xml"})
//@RunWith(JUnit4.class)
@Log4j
public class MessengerMapperTests {
	
	@Autowired
	private MessengerMapper mapper;
	
//	@Test
	public void milisecondTest() {
//		Date date = mapper.test();
		String dateStr[] = "2019:7:28:15:12:45:765".split(":");

		Calendar c = Calendar.getInstance();
		c.set(Integer.parseInt(dateStr[0]),
				Integer.parseInt(dateStr[1]),
				Integer.parseInt(dateStr[2]),
				Integer.parseInt(dateStr[3]),
				Integer.parseInt(dateStr[4]),
				Integer.parseInt(dateStr[5]));
		c.set(Calendar.MILLISECOND, Integer.parseInt(dateStr[6]));
		Date date = c.getTime();
		
		
		log.info(date);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy:MM:dd:HH:mm:ss:SSS");
		log.info(sdf.format(date));
//		Calendar cal = Calendar.getInstance();
//		cal.setTime(date);
//		log.info(cal.get(Calendar.MILLISECOND));
	}
	
//	@Test
	public void procudureTest() {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", "userId1");
		mapper.selectList(map);
		log.info(map.get("userId"));
		List<MessengerDTO> list = (List<MessengerDTO>) map.get("list");
		if(list.size() == 0) {
			log.info("...................................null");
		} else {
			list.forEach(msg -> log.info(msg));
		}
	}
	
	@Test
	public void insertDateTest() {
		MessengerVO msg = new MessengerVO();
		msg.setMsg("insert메세지");
		msg.setMsgDate(new Date());
		msg.setMsgChk("F");
		msg.setReqId("userId1");
		msg.setResId("userId2");
		
		mapper.insert(msg);
		log.info(msg);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy:MM:dd:HH:mm:ss:SSS");
		log.info(sdf.format(msg.getMsgDate()));
	}

}
