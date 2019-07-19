package me.vita.service;

import java.util.List;

import me.vita.dto.CategoryRequestDTO;

public interface CategoryRequestService {

	List<CategoryRequestDTO> getList(String big, Integer page);

	boolean register(CategoryRequestDTO dto);

	boolean remove(CategoryRequestDTO dto);

}
