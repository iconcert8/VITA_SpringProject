package me.vita.service;

import java.util.List;

import me.vita.domain.NotificationVO;
import me.vita.dto.NotificationDTO;

public interface NotificationService {

	boolean register(NotificationVO notificationVO);

	boolean remove(NotificationVO notificationVO);

	boolean modify(NotificationVO notificationVO);

	boolean modifyNotifyChkAll(String userId);

	List<NotificationDTO> getList(String userId, Integer page);

	int getNotifyChkCount(String userId);
}
