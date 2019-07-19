package me.vita.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryVO {
	
	private Integer categoryNo;
	private String bigGroup;
	private String smallGroup;

}
