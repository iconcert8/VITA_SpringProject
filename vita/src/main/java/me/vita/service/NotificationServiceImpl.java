package me.vita.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.vita.mapper.NotificationMapper;

@Service
public class NotificationServiceImpl implements NotificationService{

	
	@Autowired
	NotificationMapper mapper;
}
