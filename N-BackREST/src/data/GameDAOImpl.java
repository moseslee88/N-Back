package data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import entities.Challenge;
import entities.Game;

@Transactional
@Repository
public class GameDAOImpl implements GameDAO {

	@PersistenceContext
	private EntityManager em;

	@Override
	public Set<Game> indexGame() {
		String query = "SELECT c FROM Challenge c";
		List<Game> gameList = em.createQuery(query, Game.class)
				.getResultList();

		Set<Game> games = new HashSet<Game>(gameList);
		return games;
	}

	@Override
	public Game showGame(Integer gameId) {
		String query = "SELECT c FROM Challenge c WHERE c.id=:id";
		Game game = em.createQuery(query, Game.class)
				.setParameter("id", gameId)
				.getResultList()
				.get(0);
		return game;
	}
	
	
}
