package data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Challenge;
import entities.Result;
import entities.User;

@Transactional
@Repository
public class ResultDAOImpl implements ResultDAO {
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public Set<Result> indexResult(Integer userId) {
		String query = "SELECT r FROM Result r WHERE r.user.id = :id";
		List<Result> resultList = em.createQuery(query, Result.class)
				.setParameter("id", userId).getResultList();

		Set<Result> results = new HashSet<Result>(resultList);
		return results;
	}

	@Override
	public Result showResult(Integer userId, Integer resultId) {
		String query = "SELECT r FROM Result r WHERE r.user.id = :id AND r.id=:rid";
		Result r = em.createQuery(query, Result.class)
				.setParameter("id", userId)
				.setParameter("rid", resultId)
				.getResultList()
				.get(0);

		return r;
	}

	@Override
	public Result createResult(Integer userId, String resultJson) {
		User u = em.find(User.class,	userId);
		Result result = null;
		ObjectMapper om = new ObjectMapper();
		
		try {
			result = om.readValue(resultJson, Result.class);
			result.setUser(u);
			em.persist(result);
			em.flush();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	

}
