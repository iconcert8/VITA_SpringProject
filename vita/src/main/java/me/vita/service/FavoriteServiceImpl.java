package me.vita.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.vita.domain.FavoriteVO;
import me.vita.mapper.FavoriteMapper;

@Service
public class FavoriteServiceImpl implements FavoriteService {

	@Autowired
	FavoriteMapper mapper;

	@Override
	public boolean register(FavoriteVO favoriteVO) {
		return mapper.insert(favoriteVO) > 0;
	}

	@Override
	public boolean remove(FavoriteVO favoriteVO) {
		return mapper.delete(favoriteVO) > 0;
	}

}
