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

import data.ResultDAO;
import data.UserDAO;
import entities.Challenge;
import entities.Result;

@RestController
public class ResultController {

	@Autowired
	private UserDAO udao;
	@Autowired
	private ResultDAO dao;
	
	@RequestMapping(path = "results/ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}
	
	@RequestMapping(path = "/user/{uid}/result", method = RequestMethod.GET)
	public Set<Result> indexResult(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid) {
		return dao.indexResult(uid);
	}
	@RequestMapping(path = "/user/{uid}/result/{rid}", method = RequestMethod.GET)
	public Result showResult(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid, @PathVariable int rid) {
		return dao.showResult(uid, rid);
	}
	@RequestMapping(path = "/user/{uid}/result", method = RequestMethod.POST)
	public Result createResult(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid, @RequestBody String resultJson) {
		return dao.createResult(uid, resultJson);
	}

}
