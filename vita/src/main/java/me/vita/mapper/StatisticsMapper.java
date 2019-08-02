package me.vita.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import me.vita.dto.StatisticsTimeseriesDTO;

public interface StatisticsMapper {
	List<String> frequency(@Param("big") String big);

	List<String> wordcloud(@Param("big") String big, @Param("small") String small);

	List<StatisticsTimeseriesDTO> timeseries(@Param("period") String period, @Param("big") String big,
			@Param("small") String small);

}
