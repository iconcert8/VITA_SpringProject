package me.vita.mapper;

import java.util.List;

import me.vita.domain.CategoryVO;

public interface CategoryMapper {

	int insert(CategoryVO categoryVO);

	List<String> selectListBig();

	List<String> selectListSmall(String big);

}
