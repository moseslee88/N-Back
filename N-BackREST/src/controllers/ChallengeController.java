package controllers;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.ChallengeDAO;
import data.UserDAO;
import entities.*;

@RestController
public class ChallengeController {
	
	@Autowired
	private ChallengeDAO dao;
	
	@Autowired
	private UserDAO udao;

	@RequestMapping(path = "challenge/ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}
	
	@RequestMapping(path = "/user/{uid}/challenge", method = RequestMethod.GET)
	public Set<Challenge> indexChallenge(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid) {
		return dao.indexChallenge(uid);
	}
	@RequestMapping(path = "/user/{uid}/challenge/{cid}", method = RequestMethod.GET)
	public Challenge showChallenge(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid, @PathVariable int cid) {
		return dao.showChallenge(uid, cid);
	}
	@RequestMapping(path = "/user/{uid}/challenge", method = RequestMethod.POST)
	public Challenge createChallenge(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid, @RequestBody String challengeJson) {
		return dao.createChallenge(uid, challengeJson);
	}
	@RequestMapping(path = "/user/{uid}/challenge/{cid}", method = RequestMethod.PUT)
	public Challenge updateChallenge(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid, @PathVariable int cid, @RequestBody String challengeJson) {
		return dao.updateChallenge(uid, cid, challengeJson);
	}
	@RequestMapping(path = "/user/{uid}/challenge/{cid}", method = RequestMethod.DELETE)
	public Boolean destroyChallenge(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid, @PathVariable int cid) {
		return dao.destroyChallenge(uid, cid);
	}
}
