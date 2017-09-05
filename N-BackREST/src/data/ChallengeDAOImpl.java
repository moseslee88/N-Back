package data;

import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import entities.Challenge;

@Transactional
@Repository
public class ChallengeDAOImpl implements ChallengeDAO {

	@PersistenceContext
	private EntityManager em;
	
	@Override
	public Set<Challenge> indexChallenge() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Challenge showChallenge(Integer challengeId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Challenge createChallenge(String challengeJson) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Challenge updateChallenge(Integer challengeId, String challengeJson) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean destroyChallenge(Integer challengeId) {
		// TODO Auto-generated method stub
		return null;
	}

}
