package data;

import java.util.Collection;
import java.util.Set;

import entities.Result;

public interface ResultDAO {
	public Set<Result> indexResult(Integer userId);

	public Result showResult(Integer userId, Integer resultId);

	public Result createResult(Integer userId, String resultJson);

	public Collection<ResultGameDTO> addGames(Set<Result> results);


}
