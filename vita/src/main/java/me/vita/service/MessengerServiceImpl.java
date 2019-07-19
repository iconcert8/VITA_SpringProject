package me.vita.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.vita.mapper.MessengerMapper;

@Service
public class MessengerServiceImpl implements MessengerService{
	
	@Autowired
	MessengerMapper mapper;
	
}
