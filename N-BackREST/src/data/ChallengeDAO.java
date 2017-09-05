package data;

import java.util.Set;

import entities.Game;

public interface ChallengeDAO {
	public Set<Game> indexGame();

	public Game showGame(Integer gameId);

	public Game createGame(String gameJson);

	public Game updateGame(Integer gameId, String gameJson);

	public Boolean destroyGame(Integer gameId);

}
