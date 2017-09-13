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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import data.ResultDAO;
import data.UserDAO;
import entities.Result;

@RestController
public class ResultController {

	@Autowired
	private UserDAO udao;
	@Autowired
	private ResultDAO dao;
	
	@RequestMapping(path = "/result", method = RequestMethod.GET)
	public Collection<?> indexAllResult(HttpServletRequest req, HttpServletResponse res, @RequestParam(name = "games", required=false) Boolean includeGames) {
		Set<Result> results = dao.indexAllResult();
		
		if (includeGames != null && includeGames == true) {
			return dao.addGames(results);
		}
		return dao.indexAllResult();
	}
	
	@RequestMapping(path = "/user/{uid}/result", method = RequestMethod.GET)
	public Collection<?> indexResult(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid, @RequestParam(name = "games", required=false) Boolean includeGames) {
		Set<Result> results = dao.indexResult(uid);
		
		if (includeGames != null && includeGames == true) {
			return dao.addGames(results);
		}
		
		return results;
	}
	@RequestMapping(path = "/user/{uid}/result/{rid}", method = RequestMethod.GET)
	public Result showResult(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid, @PathVariable int rid) {
		return dao.showResult(uid, rid);
	}
	@RequestMapping(path = "/user/{uid}/game/{gid}/result", method = RequestMethod.POST)
	public Result createResult(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid,@PathVariable int gid, @RequestBody String resultJson) {
		
		return dao.createResult(uid, gid, resultJson);
	}

}
