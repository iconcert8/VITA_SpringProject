package me.vita.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import me.vita.domain.NotificationVO;
import me.vita.dto.NotificationDTO;

public interface NotificationMapper {
	
	int insert(NotificationVO notificationVO);
	
	int delete(NotificationVO notificationVO);
	
	int update(@Param("notifyNo")Integer notifyNo);
	
	List<NotificationDTO> selectList(@Param("userId")String userId, @Param("page")Integer page);
	
	int selectNotifyChkCount(@Param("userId")String userId);
}
