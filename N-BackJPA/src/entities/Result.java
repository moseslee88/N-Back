package entities;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Table(name="result")
@Entity
public class Result {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected int id;

	@JsonIgnore
	@OneToMany(mappedBy="result", fetch=FetchType.EAGER)
	@JsonManagedReference(value="resulttochallenge")
	private Set<Challenge> challenges;
	
	@Column(name="game_string")
	private String gameString;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	@JsonBackReference(value="usertoresult")
	private User user;

	@ManyToOne
	@JoinColumn(name="game_id")
	@JsonBackReference(value="gametoresult")
	private Game game;
	
	
	protected Integer points;
	protected Integer difficulty;
	protected Date datetime;
	
	
	public Game getGame() {
		return game;
	}
	
	public void setGame(Game game) {
		this.game = game;
	}
	
	public int getId() {
		return id;
	}

	public Set<Challenge> getChallenges() {
		return challenges;
	}
	public void setChallenges(Set<Challenge> challenges) {
		this.challenges = challenges;
	}
	public String getGameString() {
		return gameString;
	}
	public void setGameString(String gameString) {
		this.gameString = gameString;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Integer getPoints() {
		return points;
	}
	public void setPoints(Integer points) {
		this.points = points;
	}
	public Integer getDifficulty() {
		return difficulty;
	}
	public void setDifficulty(Integer difficulty) {
		this.difficulty = difficulty;
	}
	public Date getDatetime() {
		return datetime;
	}
	public void setDatetime(Date datetime) {
		this.datetime = datetime;
	}
	
	
}
