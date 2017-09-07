package controllers;

import java.util.Collection;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.UserDAO;
import entities.Profile;
import entities.User;

@RestController
public class UserController {

	@Autowired
	UserDAO dao;

	@RequestMapping(path = "user", method = RequestMethod.GET)
	public Set<User> indexUser(HttpServletRequest req, HttpServletResponse res) {
		return dao.indexUser();
	}

	@RequestMapping(path = "user/{userId}", method = RequestMethod.GET)     	//check to validate pathing in database
	public User showUser(HttpServletRequest req, HttpServletResponse res, @PathVariable Integer userId) {
		User u = dao.showUser(userId);
		return u;
	}

	@RequestMapping(path = "user", method = RequestMethod.POST)
	public User createUser(HttpServletRequest req, HttpServletResponse res, @RequestBody String userJson) {
        User newUser = dao.createUser(userJson);
		return newUser;
	}
	
	@RequestMapping(path="user/{userId}", method=RequestMethod.PUT)
	public User updateUser(HttpServletRequest req, HttpServletResponse res, @PathVariable Integer userId, @RequestBody String userJson)  {
		return dao.updateUser(userId, userJson);
	}
	
	@RequestMapping(path="user/{userId}", method=RequestMethod.DELETE) 
	public Boolean destroyUser(HttpServletRequest req, HttpServletResponse res, @PathVariable Integer userId)  {
		return dao.destroyUser(userId);
	}
}
