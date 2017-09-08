package data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Profile;
import entities.User;

@Transactional
@Repository
public class ProfileDAOImpl implements ProfileDAO {

	@PersistenceContext
	private EntityManager em;

	@Override
	public Set<Profile> indexProfile() {
		//check later that syntax is correct for user id
		String queryString = "Select p from Profile p"; 
		List<Profile> list = em.createQuery(queryString, Profile.class).getResultList();
		Set<Profile> myProfiles = new HashSet<>(list);
		
		return myProfiles;
	}

	@Override
	public Profile showProfile(Integer userId, Integer profileId) {
		//List<Profile> list = em.createQuery(queryString, Profile.class).setParameter("userId", userId).getResultList();
		User u = em.find(User.class, userId);
		Profile getProfile = u.getProfile();
		
		return getProfile;
	}

	@Override
	public Profile createProfile(Integer userId, String profileJson) {
		ObjectMapper mapper = new ObjectMapper();
		User myUser = em.find(User.class, userId);
		Profile managedProfile = null;
		try {
			managedProfile = mapper.readValue(profileJson, Profile.class);
			managedProfile.setUser(myUser);
			em.persist(managedProfile);
			em.flush();
			
		}catch (Exception e) {
			e.printStackTrace();
			//http response in controller handle error
		}
		return managedProfile;
	}

	@Override
	public Profile updateProfile(Integer userId, Integer profileId, String profileJson) {
		User u = em.find(User.class, userId);
		Profile p = em.find(Profile.class, profileId);
		ObjectMapper mapper = new ObjectMapper();
		Profile managedProfile = null;
		try {
			managedProfile = mapper.readValue(profileJson, Profile.class);
			p.setBirthYear(managedProfile.getBirthYear());
			p.setCity(managedProfile.getCity());
			p.setCountry(managedProfile.getCountry());
			p.setEdu(managedProfile.getEdu());
			p.setGender(managedProfile.getGender());
			p.setHouseholdIncome(managedProfile.getHouseholdIncome());
			p.setName(managedProfile.getName());
			p.setRegion(managedProfile.getRegion());
			
			em.flush();
			return p;
		} catch(Exception e) {
		     e.printStackTrace();
		}
		return null;
	}

	@Override
	public Boolean destroyProfile(Integer userId, Integer profileId) {
		User u = em.find(User.class, userId);
		Profile deletedProf = em.find(Profile.class, profileId);
		em.remove(deletedProf); 
		if(deletedProf == null) {
			return false;
		}
		return true;
	}
	


}
