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

import data.UserDAO;
import entities.Profile;
import entities.User;

public class UserController {

	@Autowired
	UserDAO dao;

	@RequestMapping(path = "users", method = RequestMethod.GET)
	public Set<User> index(HttpServletRequest req, HttpServletResponse res) {
		return dao.indexUser();
	}

	@RequestMapping(path = "users/{userId}", method = RequestMethod.GET)     	//check to validate pathing in database
	public User show(HttpServletRequest req, HttpServletResponse res, @PathVariable Integer userId) {
		User u = dao.showUser(userId);
		return u;
	}

	@RequestMapping(path = "users/{userId}", method = RequestMethod.POST)
	public User create(HttpServletRequest req, HttpServletResponse res, @PathVariable Integer userId, @RequestBody String userJson) {
        User newUser = dao.createUser(userJson);
		return newUser;
	}
	
	@RequestMapping(path="users/{userId}", method=RequestMethod.PUT)
	public User update(HttpServletRequest req, HttpServletResponse res, @PathVariable Integer userId, @RequestBody String userJson)  {
		return dao.updateUser(userId, userJson);
	}
	
	@RequestMapping(path="users/{userId}", method=RequestMethod.DELETE) 
	public Boolean destroy (HttpServletRequest req, HttpServletResponse res, @PathVariable Integer userId)  {
		return dao.destroyUser(userId);
	}
}
