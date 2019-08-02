package me.vita.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import me.vita.security.Auth;
import me.vita.security.Auth.Role;
import me.vita.service.StatisticsService;

@Controller
@RequestMapping("/statistics")
public class StatisticsController {

	@Autowired
	StatisticsService service;

	@GetMapping("/frequency/{big}")
	@Auth(Role.ADMIN)
	@ResponseBody
	public String frequency(@PathVariable("big") String big) {
		if (big.equals("null"))
			big = null;
		return service.frequency(big);
	}

	@GetMapping("/wordcloud/{big}/{small}")
	@Auth(Role.ADMIN)
	@ResponseBody
	public String wordcloud(@PathVariable("big") String big, @PathVariable("small") String small) {
		if (big.equals("null"))
			big = null;
		if (small.equals("null"))
			small = null;
		return service.wordcloud(big, small);
	}

	@GetMapping("/timeseries/{period}/{big}/{small}")
	@Auth(Role.ADMIN)
	@ResponseBody
	public String timeseries(@PathVariable("period") String period, @PathVariable("big") String big,
			@PathVariable("small") String small) {
		if (period.equals("null"))
			period = null;
		if (big.equals("null"))
			big = null;
		if (small.equals("null"))
			small = null;
		return service.timeseries(period, big, small);
	}
}
