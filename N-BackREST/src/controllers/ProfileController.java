package controllers;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.ProfileDAO;
import entities.Profile;
import entities.User;

@RestController
public class ProfileController {

	@Autowired
	ProfileDAO dao;

	@RequestMapping(path = "profile", method = RequestMethod.GET)
	public Collection<Profile> indexProfile(HttpServletRequest req, HttpServletResponse res) {
		return dao.indexProfile();
	}

	@RequestMapping(path = "user/{userId}/profile/{pid}", method = RequestMethod.GET) // check to validate pathing in
	public Profile showProfile(HttpServletRequest req, HttpServletResponse res, @PathVariable Integer userId,
			@PathVariable Integer pid) {
		Profile p = dao.showProfile(userId, pid);
		return p;
	}

	@RequestMapping(path = "user/{userId}/profile", method = RequestMethod.POST)
	public Profile createProfile(HttpServletRequest req, HttpServletResponse res, @PathVariable Integer userId, @RequestBody String profileJson) {
		Profile newProfile = dao.createProfile(userId, profileJson);
		return newProfile;
	}

	@RequestMapping(path = "user/{userId}/profile/{pid}", method = RequestMethod.PUT)
	public Profile updateProfile(HttpServletRequest req, HttpServletResponse res, @PathVariable Integer userId,
			@PathVariable Integer pid, @RequestBody String profileJson) {
		return dao.updateProfile(userId, pid, profileJson);
	}

	@RequestMapping(path = "user/{userId}/profile/{pid}", method = RequestMethod.DELETE)
	public Boolean destroyProfile(HttpServletRequest req, HttpServletResponse res, @PathVariable Integer userId,
			@PathVariable Integer pid) {
		return dao.destroyProfile(userId, pid);
	}
}
