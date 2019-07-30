package me.vita.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface StatisticsMapper {
	List<String> wordcloud(@Param("big") String big, @Param("small")String small);
	List<String> frequency(@Param("big") String big);

}
