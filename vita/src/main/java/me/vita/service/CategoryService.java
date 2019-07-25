package me.vita.service;

import java.util.List;

import me.vita.domain.CategoryVO;

public interface CategoryService {
	
	List<String> getListBig();

	List<CategoryVO> getListSmall(String big);

}
