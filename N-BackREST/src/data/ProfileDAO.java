package data;

import java.util.Set;

import entities.Profile;

public interface ProfileDAO {
	public Set<Profile> indexProfile();

	public Profile showProfile(Integer userId, Integer profileId);

	public Profile createProfile(Integer userId, String profileJson);

	public Profile updateProfile(Integer userId, Integer profileId, String profileJson);

	public Boolean destroyProfile(Integer userId, Integer profileId);

}
