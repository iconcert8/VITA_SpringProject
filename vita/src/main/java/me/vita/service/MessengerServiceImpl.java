package me.vita.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.vita.domain.MessengerVO;
import me.vita.domain.UserVO;
import me.vita.dto.MessengerDTO;
import me.vita.mapper.MessengerMapper;

@Service
public class MessengerServiceImpl implements MessengerService{
	
	@Autowired
	MessengerMapper mapper;

	@Override
	public List<MessengerDTO> getList(UserVO user) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", user.getUserId());
		mapper.selectList(map);
		List<MessengerDTO> list = (List<MessengerDTO>) map.get("list");
		if(list.size() == 0) {
			MessengerDTO noMsg = new MessengerDTO();
			noMsg.setUserId((String) map.get("userId"));
			list.add(noMsg);
		}
		return list;
	}

	@Override
	public List<MessengerDTO> getListContactUser(UserVO user, String contactUser) {
		return mapper.selectListContactUser(user.getUserId(), contactUser);
	}
	
}
