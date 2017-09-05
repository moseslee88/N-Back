package data;

import java.util.Set;

import entities.Challenge;

public interface ChallengeDAO {
	public Set<Challenge> indexChallenge();

	public Challenge showChallenge(Integer challengeId);

	public Challenge createChallenge(String challengeJson);

	public Challenge updateChallenge(Integer challengeId, String challengeJson);

	public Boolean destroyChallenge(Integer challengeId);

}
