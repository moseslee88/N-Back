package data;

import java.util.Set;

import entities.User;

public interface UserDAO {
	public Set<User> indexUser();

	public User showUser(Integer userId);

	public User createUser(String userJson);

	public User updateUser(Integer userId, String userJson);

	public Boolean destroyUser(Integer userId);

}
