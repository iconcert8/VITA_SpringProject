package me.vita.dto;

import java.util.List;

import lombok.Data;

@Data
public class CategoryFilterDTO {
	
	private String type;
	private Integer page;
	private List<String> filter;
	private List<String> search;
	private String goToUserId;

}
