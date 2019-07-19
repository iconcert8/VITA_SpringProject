package me.vita.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import me.vita.domain.CategoryVO;
import me.vita.dto.CategoryRequestDTO;
import me.vita.mapper.CategoryMapper;
import me.vita.mapper.CategoryRequestMapper;
import me.vita.mapper.FeedMapper;

@Service
public class CategoryRequestServiceImpl implements CategoryRequestService{
	
	@Autowired
	private CategoryRequestMapper mapper;
	@Autowired
	private CategoryMapper categoryMapper;
	@Autowired
	private FeedMapper feedMapper;

	@Override
	@Transactional
	public boolean register(CategoryRequestDTO dto) {
		CategoryVO categoryVO = new CategoryVO();
		categoryVO.setBigGroup(dto.getBigGroup());
		categoryVO.setSmallGroup(dto.getCategoryRequestSmallGroup());
		categoryMapper.insert(categoryVO);
		
		for(String feedNo : dto.getFeedNoList().split("|")) {
			feedMapper.updateCategory(feedNo, categoryVO.getCategoryNo());
		}
		return mapper.delete(dto)==1;
	}

	@Override
	public boolean remove(CategoryRequestDTO dto) {
		return mapper.delete(dto) == 1;
	}

	@Override
	public List<CategoryRequestDTO> getList(String big, Integer page) {
		return mapper.selectList(big, page);
	}

}
