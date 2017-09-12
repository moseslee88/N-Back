package data;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Game;
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
	public Set<Result> indexAllResult() {
		String query = "SELECT r FROM Result r";
		List<Result> resultList = em.createQuery(query, Result.class)
				.getResultList();
		
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
	public Result createResult(Integer userId,Integer gameId, String resultJson) {
		Game g = em.find(Game.class, gameId);
		User u = em.find(User.class,	userId);
		Result result = null;
		ObjectMapper om = new ObjectMapper();
		
		try {
			result = om.readValue(resultJson, Result.class);
			result.setUser(u);
			result.setGame(g);
			em.persist(result);
			em.flush();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}

	@Override
	public Collection<ResultGameDTO> addGames(Set<Result> results) {
		List<ResultGameDTO> gameResults = new ArrayList<>();
		results.forEach(r -> {
			Result resultWithGame = em.createQuery("SELECT r FROM Result r JOIN FETCH r.game WHERE r.id = :id", Result.class)
				.setParameter("id", r.getId())
				.getResultList()
				.get(0);
			
			gameResults.add(new ResultGameDTO(resultWithGame));
		});
		
		return gameResults;
		
	}
	
	

}
