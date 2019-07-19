package me.vita.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequestVO {
	
	private Integer categoryRequestNo;
	private String bigGroup;
	private String categoryRequestSamllGroup;
	private Date categoryRequestDate;
	private Integer feedNo;

}
