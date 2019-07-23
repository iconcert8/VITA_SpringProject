package me.vita.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import me.vita.domain.NotificationVO;

public interface NotificationMapper {
	
	int insert(NotificationVO notificationVO);
	
	int delete(@Param("notifyNo")Integer notifyNo);
	
	int update(@Param("notifyNo")Integer notifyNo);
	
	List<NotificationVO> selectList(@Param("userId")String userId, @Param("page")Integer page);
	
	int selectNotifyChkCount(@Param("userId")String userId);
}
