package me.vita.controller;

import java.awt.PageAttributes.MediaType;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;
import me.vita.domain.ReplyVO;
import me.vita.domain.UserVO;
import me.vita.dto.ReplyDTO;
import me.vita.security.Auth;
import me.vita.service.ReplyService;

@Controller
@Log4j
@RequestMapping("/reply")
@AllArgsConstructor
/*
 * 댓글 입력, 댓글 리스트(기준번호 필요), 댓글 사게, 댓글 개수
 */
public class ReplyController {
	
	@Autowired
	ReplyService service;

	@PostMapping("/new")
	@Auth
	public ResponseEntity<String> register(@SessionAttribute("authUser") UserVO user, @RequestBody ReplyVO replyVO){
		replyVO.setUserId(user.getUserId());
		System.out.println(replyVO);
		System.out.println(replyVO.getReplyContent());
		if(service.register(replyVO)) {
			return new ResponseEntity<String>("success", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/list/{feedNo}/{page}")
	@ResponseBody
	public List<ReplyDTO> getList(HttpServletRequest request,@PathVariable("feedNo") Integer feedNo, @PathVariable("page") Integer page){
		UserVO user = (UserVO)request.getSession().getAttribute("authUser");
		String userId = "none";
		if(user != null) userId = user.getUserId();
		
		return service.getList(userId, feedNo, page);
	}
	
	@DeleteMapping("/{feedNo}/{replyNo}")
	@Auth
	public ResponseEntity<String> remove(@PathVariable("feedNo") Integer feedNo, @PathVariable("replyNo") Integer replyNo){
		if(service.remove(feedNo, replyNo)) {
			return new ResponseEntity<String>("success", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	 
	@GetMapping("/{feedNo}/")
	public ResponseEntity<Integer> getCount(@PathVariable("replyNo") Integer feedNo) {
		Integer goodCount  = service.getCount(feedNo);
		return new ResponseEntity<Integer>(goodCount, HttpStatus.OK);
	}
	
	@DeleteMapping("/feed/{feedNo}")
	@Auth
	public ResponseEntity<String> feedRemove(@PathVariable("feedNo") Integer feedNo){
		if(service.feedRemove(feedNo)) {
			System.out.println("삭제 성공");
			return new ResponseEntity<String>("success", HttpStatus.OK);
		} else {
			System.out.println("삭제 씰패");
			return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
