package me.vita.service;

public interface StatisticsService {

	public String frequency(String big);

	public String wordcloud(String big, String small);
	
	public String timeseries(String period, String big, String small);
}
