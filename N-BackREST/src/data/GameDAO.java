package data;

import java.util.Set;

import entities.Game;

public interface GameDAO {
	public Set<Game> indexGame();

	public Game showGame(Integer gameId);
}
