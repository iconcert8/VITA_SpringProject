package me.vita.domain;

import java.util.Date;

import lombok.Data;

@Data
public class FavoriteVO {
	private String userId;
	private Integer feedNo;
	private Date favoriteDate;
}
