package me.vita.mapper;

import java.util.List;

import me.vita.domain.CategoryRequestVO;
import me.vita.dto.CategoryRequestDTO;

public interface CategoryRequestMapper {
	
	int insert(CategoryRequestVO vo);

	List<CategoryRequestDTO> selectList(String big, Integer page);

	int delete(CategoryRequestDTO dto);
	
}
