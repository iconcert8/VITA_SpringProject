package me.vita.dto;

import java.util.List;

import lombok.Data;

@Data
public class CategoryFilterDTO {
	
	private String type;	// 전체글 / 인기순
	private Integer page;	// 출력된 페이지의 마지막 피드 번호
	private List<Integer> filter;
	private List<String> search;
	private String goToUserId;

}
