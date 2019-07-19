package me.vita.service;

import me.vita.domain.FavoriteVO;

public interface FavoriteService {

	boolean register(FavoriteVO favoriteVO);

	boolean remove(FavoriteVO favoriteVO);

}
