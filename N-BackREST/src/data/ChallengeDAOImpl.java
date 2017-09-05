package data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.*;

@Transactional
@Repository
public class ChallengeDAOImpl implements ChallengeDAO {

	@PersistenceContext
	private EntityManager em;

	@Override
	public Set<Challenge> indexChallenge(Integer uid) {
		String query = "SELECT c FROM Challenge c WHERE c.user.id = :id";
		List<Challenge> challengeList = em.createQuery(query, Challenge.class).setParameter("id", uid).getResultList();

		Set<Challenge> challenges = new HashSet<Challenge>(challengeList);
		return challenges;
	}

	@Override
	public Challenge showChallenge(Integer uid, Integer challengeId) {
		String query = "SELECT c FROM Challenge c WHERE c.user.id = :uid AND c.id =:cid";
		Challenge challenge = em.createQuery(query, Challenge.class).setParameter("uid", uid)
				.setParameter("cid", challengeId).getResultList().get(0);
		return challenge;
	}

	@Override
	public Challenge createChallenge(Integer uid, Integer challengedUserId, String challengeJson) {
		User u = em.find(User.class, uid);
		User challengedUser = em.find(User.class, challengedUserId);
		Challenge challenge = null;

		ObjectMapper om = new ObjectMapper();
		try {
			challenge = om.readValue(challengeJson, Challenge.class);
			challenge.setUser(u);
			challenge.setTargetUser(challengedUser);
			em.persist(challenge);
			em.flush();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return challenge;
	}

	@Override
	public Challenge updateChallenge(Integer uid, Integer challengeId, String challengeJson) {
		User u = em.find(User.class, uid);
		Challenge managed = em.find(Challenge.class, challengeId);
		Challenge c = null;

		try {
			ObjectMapper om = new ObjectMapper();
			c = om.readValue(challengeJson, Challenge.class);

			managed.setResult(c.getResult());
			managed.setTargetUser(c.getTargetUser());
			managed.setUser(c.getUser());

		} catch (Exception e) {
			e.printStackTrace();
		}

		return managed;
	}

	@Override
	public Boolean destroyChallenge(Integer uid, Integer challengeId) {
		Challenge c = em.find(Challenge.class, challengeId);
		if (uid == c.getUser().getId()) {
			try {
				em.remove(c);

			} catch (Exception e) {
				// TODO: handle exception
			}
		}
		return null;
	}

}
