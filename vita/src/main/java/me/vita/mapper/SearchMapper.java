package me.vita.mapper;

import java.util.List;

import me.vita.domain.SearchVO;

public interface SearchMapper {

	List<String> selectRank();

	int insert(SearchVO searchVO);
}
