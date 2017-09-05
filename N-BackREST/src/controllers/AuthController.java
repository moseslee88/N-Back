package controllers;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.AuthDAO;
import entities.User;

@RestController
public class AuthController {
	
	 @Autowired
	  private AuthDAO authDAO;

	  @RequestMapping(path = "/register", method = RequestMethod.POST)
	  public User register(HttpSession session, HttpServletResponse response, @RequestBody User user) {
		  User registeredUser = authDAO.register(user);
		  if(registeredUser == null) {
			  response.setStatus(422);
			  return null;
		  }
		  response.setStatus(202);
		  session.setAttribute("user", registeredUser);
	      return registeredUser;
	  }
	  
	  @RequestMapping(path = "/login", method = RequestMethod.POST)
	  public User login(HttpSession session, HttpServletResponse response, @RequestBody User user) {
		  User loggedInUser = authDAO.login(user);
		  if (loggedInUser ==null)  {
			  response.setStatus(422);
			  return null;
		  }
		  session.setAttribute("user", loggedInUser);
	      return loggedInUser;
	  }
	  
	  @RequestMapping(path="/logout", method=RequestMethod.POST)
	  public Boolean logout(HttpSession session, HttpServletResponse response)  {
	  session.removeAttribute("user");
	  if (session.getAttribute("user") == null) {
		  return true; 
	  } 
	  return false;
	  }
	  
	  @RequestMapping(path = "/unauthorized")
	  public String unauth(HttpServletResponse response) {
	    response.setStatus(401);
	    return "unauthorized";
	  }

}
