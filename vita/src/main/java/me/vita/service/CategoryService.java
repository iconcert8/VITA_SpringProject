package me.vita.service;

import java.util.List;

public interface CategoryService {
	
	List<String> getListBig();

	List<String> getListSmall(String big);

}
