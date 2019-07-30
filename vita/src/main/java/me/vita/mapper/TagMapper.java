package me.vita.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface TagMapper {

	List<String> selectList(Integer feedNo);

	int insert(@Param("feedNo") Integer feedNo, @Param("tag") String tag);

}

