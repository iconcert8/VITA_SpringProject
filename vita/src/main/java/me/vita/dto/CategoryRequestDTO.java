package me.vita.dto;

import java.util.List;

import lombok.Data;

@Data
public class CategoryRequestDTO {
	private String bigGroup;
	private String categoryRequestSmallGroup;
	private Integer count;
	private List<Integer> feedNo;
}
