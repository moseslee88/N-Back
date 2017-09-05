package data;

import java.util.Set;

import entities.Result;

public interface ResultDAO {
	public Set<Result> indexResult();

	public Result showResult(Integer resultId);

	public Result createResult(String resultJson);

	public Result updateResult(Integer resultId, String resultJson);

	public Boolean destroyResult(Integer resultId);

}
