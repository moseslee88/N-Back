package data;

import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import entities.Result;

@Transactional
@Repository
public class ResultDAOImpl implements ResultDAO {
	
	@PersistenceContext
	private EntityManager em;


	@Override
	public Set<Result> indexResult() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result showResult(Integer resultId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result createResult(String resultJson) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result updateResult(Integer resultId, String resultJson) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean destroyResult(Integer resultId) {
		// TODO Auto-generated method stub
		return null;
	}

}
