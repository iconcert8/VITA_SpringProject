package me.vita.service;

import java.util.List;

import org.rosuda.REngine.REXP;
import org.rosuda.REngine.Rserve.RConnection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.vita.mapper.StatisticsMapper;

@Service
public class StatisticsServiceImpl implements StatisticsService {
	
	@Autowired
	StatisticsMapper mapper;
	
	
	
	@Override
	public String frequency(String big) {
		List<String> grouplist = mapper.frequency(big);
		
 		if(grouplist.size() == 0) return "null.jpg";
		String contents = "group <- c(";
		for(int i = 0; i < grouplist.size(); i++){
			if(i == grouplist.size()-1) contents += "'"+grouplist.get(i).replace(",", "")+"')";
			else contents += "'"+grouplist.get(i).replace(",", "")+"',";
		}

		RConnection c = null;
		
		try{
			c = new RConnection();
			c.eval("library(ggplot2)");
			c.eval(contents);
			c.eval("qplot(group)+labs(y = \"count\")");
			c.eval("ggsave(\"C:/upload/frequency.jpg\")");
		}catch (Exception e) {
			e.printStackTrace();
		}finally {
			c.close();
		}
		
		return "frequency.jpg";
	}
	

	//워드 클라우드 인코딩.....
	@Override
	public String wordcloud(String big, String small) {
		/*List<String> feedList = mapper.wordcloud(big, small);
		String contents = "";
		for(String content : feedList){
			contents += content+" ";
		}
		
		RConnection c = null;
		try {
			c = new RConnection();
			c.eval("library(tm)");
			c.eval("library(wordcloud)");
			c.eval("library(KoNLP)");
			c.eval("library(RColorBrewer)");
			
			c.eval("text = '"+contents+"'");
			String[] notword = {"내", "것", "때문", "때", "한", "도", "을", "를", "이", "가", "은", "는", "에", "에게", "께"};
			c.assign("notword", notword);
			
			c.eval("words = unlist(sapply(text, extractNoun, USE.NAMES = FALSE))");
			System.out.println(c.eval("Encoding(words)").asString());
			String[] strs = c.eval("words").asStrings();
			for(String str : strs){
				System.out.println(str);
			}
			
			c.eval("wordfreq = table(words)");
			//c.eval("wordfreq = wordfreq[!names(wordfreq) %in% notword]");
			
			
			c.eval("png(filename = \"c:/upload/test2.png\")");
			c.eval("wordcloud(names(wordfreq), freq=wordfreq, max.words = 100, random.order = FALSE, colors = brewer.pal(8, \"Dark2\"))");
			c.eval("dev.off()");
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			c.close();
		}*/
		
		
		return "test2.png";
	}

}
