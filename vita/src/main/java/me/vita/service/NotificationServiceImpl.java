package me.vita.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.vita.domain.FeedVO;
import me.vita.domain.NotificationVO;
import me.vita.dto.NotificationDTO;
import me.vita.mapper.FeedMapper;
import me.vita.mapper.NotificationMapper;

@Service
public class NotificationServiceImpl implements NotificationService {

	@Autowired
	NotificationMapper mapper;

	@Autowired
	FeedMapper feedMapper;

	@Override
	public boolean register(NotificationVO notificationVO) {

		// delete feed 알림의 경우 if문으로 간다
		if (notificationVO.getResId() == null) {
			FeedVO feedVO = feedMapper.select(notificationVO.getFeedNo());
			String content = feedVO.getFeedContent();
			if (content.length() > 20) {
				content = content.substring(0, 20);
			}
			if (notificationVO.getNotifyType().equals("delete")) {
				content = "관리자에 의해 \"" + content + "\" 게시물이 삭제 되었습니다.";
			} else if (notificationVO.getNotifyType().equals("deleteRecover")) {
				content = "관리자에 의해 \"" + content + "\" 게시물이 복구 되었습니다.";
			}
			notificationVO.setResId(feedVO.getUserId());
			notificationVO.setNotifyMsg(content);
		}
		return mapper.insert(notificationVO) == 1;
	}

	@Override
	public boolean remove(NotificationVO notificationVO) {
		return mapper.delete(notificationVO) > 0;
	}

	@Override
	public boolean modify(NotificationVO notificationVO) {
		return mapper.update(notificationVO) > 0;
	}

	@Override
	public boolean modifyNotifyChkAll(String userId) {
		return mapper.updatenotifyChkAll(userId) > -1;
	}

	@Override
	public List<NotificationDTO> getList(String userId, Integer page) {
		List<NotificationDTO> list = mapper.selectList(userId, page);
		if (list.size() != 0) {
			list.get(0).setNotifyChkCount(mapper.selectNotifyChkCount(userId));
		}
		return list;
	}

	@Override
	public int getNotifyChkCount(String userId) {
		return mapper.selectNotifyChkCount(userId);
	}

}
