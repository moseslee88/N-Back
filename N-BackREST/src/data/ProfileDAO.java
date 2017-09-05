package data;

import java.util.Set;

import entities.Profile;

public interface ProfileDAO {
	public Set<Profile> indexProfile();

	public Profile showProfile(Integer profileId);

	public Profile createProfile(String profileJson);

	public Profile updateProfile(Integer profileId, String profileJson);

	public Boolean destroyProfile(Integer profileId);

}
