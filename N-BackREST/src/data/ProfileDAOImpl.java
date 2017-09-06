package data;

import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import entities.Profile;

@Transactional
@Repository
public class ProfileDAOImpl implements ProfileDAO {

	@PersistenceContext
	private EntityManager em;

	@Override
	public Set<Profile> indexProfile(Integer userId) {
		
		return null;
	}

	@Override
	public Profile showProfile(Integer userId, Integer profileId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Profile createProfile(Integer userId, String profileJson) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Profile updateProfile(Integer userId, Integer profileId, String profileJson) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean destroyProfile(Integer userId, Integer profileId) {
		// TODO Auto-generated method stub
		return null;
	}
	


}
