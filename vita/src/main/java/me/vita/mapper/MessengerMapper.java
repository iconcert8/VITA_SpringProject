package me.vita.mapper;

import java.util.Date;

import org.apache.ibatis.annotations.Select;

public interface MessengerMapper {
	
	@Select("select systimestamp from dual")
	Date test();

}
