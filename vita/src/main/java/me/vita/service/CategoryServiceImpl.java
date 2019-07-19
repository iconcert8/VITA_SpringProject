package me.vita.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.vita.mapper.CategoryMapper;

@Service
public class CategoryServiceImpl implements CategoryService{

	@Autowired
	CategoryMapper mapper;
	
	@Override
	public List<String> getListBig() {
		return mapper.selectListBig();
	}

	@Override
	public List<String> getListSmall(String big) {
		return mapper.selectListSmall(big);
	}

}
