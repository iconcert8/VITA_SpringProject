package me.vita.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.vita.domain.DeletedFeedVO;
import me.vita.domain.FeedVO;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeletedFeedDTO {

	private FeedVO feedVO;
	private DeletedFeedVO deletedFeedVO;
	
}
