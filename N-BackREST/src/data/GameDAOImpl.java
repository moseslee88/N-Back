package data;

import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import entities.Game;

public class GameDAOImpl implements GameDAO {

	@PersistenceContext
	private EntityManager em;
	
	@Override
	public Set<Game> indexGame() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Game showGame(Integer gameId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Game createGame(String gameJson) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Game updateGame(Integer gameId, String gameJson) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean destroyGame(Integer gameId) {
		// TODO Auto-generated method stub
		return null;
	}

}
