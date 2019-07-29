package me.vita.mapper;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import me.vita.dto.MessengerDTO;

public interface MessengerMapper {

	@Select("select systimestamp from dual")
	Date test();

	void selectList(Map<String, Object> map);

	List<MessengerDTO> selectListContactUser(@Param("user") String userId, @Param("contact") String contactUser);

}
