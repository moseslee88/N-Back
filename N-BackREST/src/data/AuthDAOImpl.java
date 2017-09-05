package data;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import entities.User;

@Transactional
public class AuthDAOImpl implements AuthDAO {

	@PersistenceContext
	private EntityManager em;

	@Autowired
	private PasswordEncoder encoder;

	@Override
	public User register(User u) {
		String passwordSha = encoder.encode(u.getPassword());
		u.setPassword(passwordSha);
		em.persist(u);
		em.flush();
		return u;
	}

	@Override
	public User login(User u) {
		String queryString = "SELECT u FROM User u WHERE u.email = :email";

		User managedUser = em.createQuery(queryString, User.class).setParameter("email", u.getEmail()).getResultList()
				.get(0);
		if (encoder.matches(u.getPassword(), managedUser.getPassword())) {
			return managedUser;
		}
		return null;
	}

}
