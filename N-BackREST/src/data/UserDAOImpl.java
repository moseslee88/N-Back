package data;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.User;

@Transactional
@Repository
public class UserDAOImpl implements UserDAO {

	@PersistenceContext
	private EntityManager em;

	@Override
	public Set<User> indexUser() {
		String queryString = "Select u from User u";
		List<User> list = em.createQuery(queryString, User.class).getResultList();
		Set<User> users = new HashSet<>(list);
		return users;
	}

	@Override
	public User showUser(Integer userId) {
		User u = em.find(User.class, userId);
		return u;
	}

	@Override
	public User createUser(String userJson) {
		ObjectMapper mapper = new ObjectMapper();
		User newUser = null;
		try {
			newUser = mapper.readValue(userJson, User.class);
			em.persist(newUser);
			em.flush();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return newUser;
	}

	@Override
	public User updateUser(Integer userId, String userJson) {
		User managedUser = em.find(User.class, userId);
		ObjectMapper mapper = new ObjectMapper();
		try {
			User myMappedUser = mapper.readValue(userJson, User.class);
			managedUser.setEmail(myMappedUser.getEmail());
			managedUser.setPassword(myMappedUser.getPassword());
			managedUser.setChallenges(myMappedUser.getChallenges());
			managedUser.setFriends(myMappedUser.getFriends());
			managedUser.setProfile(myMappedUser.getProfile());
			managedUser.setResults(myMappedUser.getResults());
			managedUser.setTargetChallenges(myMappedUser.getTargetChallenges());

			
		}catch(IOException e) {
			e.printStackTrace();
		}
		
		return null;
	}

	@Override
	public Boolean destroyUser(Integer userId) {
		User deleteUser= em.find(User.class, userId);
		em.remove(deleteUser);
		if(deleteUser == null) {
			return false;
		}
		return null;
	}

}
