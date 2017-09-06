package data;

import java.util.Set;

import entities.Challenge;

public interface ChallengeDAO {
	public Set<Challenge> indexChallenge(Integer uid);

	public Challenge showChallenge(Integer uid, Integer challengeId);

	public Challenge createChallenge(Integer uid, String challengeJson);

	public Challenge updateChallenge(Integer uid, Integer challengeId, String challengeJson);

	public Boolean destroyChallenge(Integer uid, Integer challengeId);

}
