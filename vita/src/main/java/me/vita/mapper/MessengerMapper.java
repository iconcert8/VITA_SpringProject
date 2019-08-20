package me.vita.mapper;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import me.vita.domain.MessengerVO;
import me.vita.dto.MessengerDTO;

public interface MessengerMapper {

	void selectList(Map<String, Object> map);

	List<MessengerDTO> selectListContactUser(@Param("user") String userId, @Param("contact") String contactUser);

	int insert(MessengerVO msg);

	MessengerDTO select(Integer msgNo);

	int update(@Param("reqId") String reqId, @Param("resId") String resId, @Param("msgNo") Integer msgNo);

}
