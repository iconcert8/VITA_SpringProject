package me.vita.service;

import java.util.List;

import me.vita.domain.NotificationVO;

public interface NotificationService {
	
	boolean register(NotificationVO notificationVO);
	
	boolean remove(Integer notifyNo);
	
	boolean modify(Integer notifyNo);
	
	List<NotificationVO> getList(String userId, Integer page);
	
	int getNotifyChkCount(String userId);
}
