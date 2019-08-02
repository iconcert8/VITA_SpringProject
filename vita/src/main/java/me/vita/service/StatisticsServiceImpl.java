package me.vita.service;

import java.util.List;

import org.rosuda.REngine.Rserve.RConnection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.vita.dto.StatisticsTimeseriesDTO;
import me.vita.mapper.StatisticsMapper;

@Service
public class StatisticsServiceImpl implements StatisticsService {

	@Autowired
	StatisticsMapper mapper;

	@Override
	public String frequency(String big) {
		List<String> list = mapper.frequency(big);

		if (list.size() == 0)
			return "C:/upload/null.jpg";
		String contents = "group <- c(";
		for (int i = 0; i < list.size(); i++) {
			if (i == list.size() - 1)
				contents += "'" + list.get(i).replace(",", "") + "')";
			else
				contents += "'" + list.get(i).replace(",", "") + "',";
		}

		RConnection c = null;

		try {
			c = new RConnection();
			c.eval("library(ggplot2)");
			c.eval(contents);
			c.eval("qplot(group)+labs(y = \"count\")");
			c.eval("ggsave(\"C:/upload/frequency.jpg\")");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			c.close();
		}

		return "C:/upload/frequency.jpg";
	}

	@Override
	public String wordcloud(String big, String small) {
		List<String> list = mapper.wordcloud(big, small);
		String contents = "";
		for (String content : list) {
			contents += content + " ";
		}

		if (contents.length() < 50) {
			return "C:/upload/null.jpg";
		}

		RConnection c = null;
		try {
			c = new RConnection();
			c.eval("library(tm)");
			c.eval("library(wordcloud)");
			c.eval("library(KoNLP)");
			c.eval("library(RColorBrewer)");

			c.eval("text = '" + contents + "'");
			c.eval("notword = c('내', '것', '때문', '때', '한', '도', '을', '를', '이', '가', '은', '는', '에', '에게', '께', '의', 'ㅋ', 'ㄷ', '리')");

			c.eval("words = unlist(sapply(text, extractNoun, USE.NAMES = FALSE))");

			c.eval("wordfreq = table(words)");
			c.eval("wordfreq = wordfreq[!names(wordfreq) %in% notword]");

			c.eval("png(filename = \"C:/upload/wordcloud.png\")");
			c.eval("wordcloud(names(wordfreq), freq=wordfreq, max.words = 100, random.order = FALSE, colors = brewer.pal(8, \"Dark2\"))");
			c.eval("dev.off()");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (c != null) {
				c.close();
			}
		}

		return "C:/upload/wordcloud.png";
	}

	@Override
	public String timeseries(String period, String big, String small) {
		List<StatisticsTimeseriesDTO> list = mapper.timeseries(period, big, small);
		if (list.size() < 2)
			return "C:/upload/null.jpg";

		String feedDate = "feedDate = c(";
		String feedCount = "feedCount = c(";
		for (int i = 0; i < list.size(); i++) {
			StatisticsTimeseriesDTO dto = list.get(i);
			if (i == list.size() - 1) {
				feedDate += "'" + dto.getFeedDate() + "')";
				feedCount += dto.getFeedCount() + ")";
			} else {
				feedDate += "'" + dto.getFeedDate() + "',";
				feedCount += dto.getFeedCount() + ",";
			}
		}
		RConnection c = null;
		try {
			c = new RConnection();
			c.eval("library(ggplot2)");
			c.eval(feedDate);
			c.eval(feedCount);
			c.eval("data = data.frame(feedDate, feedCount)");
			c.eval("ggplot(data, aes(x=feedDate, y=feedCount, group=1))+geom_line()");
			c.eval("ggsave(\"C:/upload/timeseries.jpg\")");

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (c != null) {
				c.close();
			}
		}

		return "C:/upload/timeseries.jpg";
	}

}
