package data;

import java.util.Set;

import entities.Challenge;
import entities.Game;

public interface NbackDAO {
	  public Set<Game> index(int uid);

	  public Game show(int uid, int gid);

	  public Game create(int uid, String todoJson);

	  public Game update(int uid, String todoJson);
	  
	  public Challenge show(int uid, int gid);

	  public Challenge create(int uid, String todoJson);

	  public Challenge update(int uid, String todoJson);

	  public Boolean destroy(int uid, int gid);
}
