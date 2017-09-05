package data;

import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import entities.User;

@Transactional
@Repository
public class UserDAOImpl implements UserDAO {

	@PersistenceContext
	private EntityManager em;
	
	@Override
	public Set<User> indexUser() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User showUser(Integer userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User createUser(String userJson) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User updateUser(Integer userId, String userJson) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean destroyUser(Integer userId) {
		// TODO Auto-generated method stub
		return null;
	}

}
