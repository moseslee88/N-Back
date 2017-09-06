package controllers;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.GameDAO;
import entities.Game;

@RestController
public class GameController {

	@Autowired
	private GameDAO dao;

	@RequestMapping(path = "games", method = RequestMethod.GET)
    public Collection<Game> index(HttpServletRequest req, HttpServletResponse res) {
		return dao.indexGame();
	}
	
	
	 @RequestMapping(path = "games/{gid}", method = RequestMethod.GET)
	 	public Game show(HttpServletRequest req, HttpServletResponse res, @PathVariable Integer gid) {
		   return dao.showGame(gid);
		}
}
