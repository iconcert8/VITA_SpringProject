package me.vita.mapper;

import java.util.List;

public interface TagMapper {

	List<String> selectList(Integer feedNo);

	int insert(Integer feedNo, String tag);

}
