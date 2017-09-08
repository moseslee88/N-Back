package data;

import entities.Game;
import entities.Result;
import entities.User;

public class ResultGameDTO extends Result {
	
	public ResultGameDTO() {
		this(new Result());
	}
	
	public ResultGameDTO(Result result) {
		this.game = result.getGame();
		super.id = result.getId();
		super.points = result.getPoints();
		super.difficulty = result.getDifficulty();
		super.datetime = result.getDatetime();
	}
	
	private Game game;

	public Game getGame() {
		return game;
	}

	public void setGame(Game game) {
		this.game = game;
	}

}
