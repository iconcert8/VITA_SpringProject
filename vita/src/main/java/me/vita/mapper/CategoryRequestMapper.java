package me.vita.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import me.vita.domain.CategoryRequestVO;
import me.vita.dto.CategoryRequestDTO;

public interface CategoryRequestMapper {

	int insert(CategoryRequestVO vo);

	List<CategoryRequestDTO> selectList(@Param("big") String big, @Param("page") Integer page);

	List<Integer> selectListFeedNo(CategoryRequestDTO dto);

	int delete(CategoryRequestDTO dto);

	int request(CategoryRequestVO categoryRequestVO);

}
