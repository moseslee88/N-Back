package entities;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Table(name="user")
@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String email;

	private String password;
    
	@JsonIgnore
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(name = "friend", joinColumns = @JoinColumn(name = "user_id1"), inverseJoinColumns = @JoinColumn(name = "user_id2"))
	private Collection<User> friends;

	@JsonIgnore
	@OneToMany(mappedBy = "user", fetch=FetchType.LAZY)
	//@JsonManagedReference(value = "usertoresult")
	private Collection<Result> results;

	@JsonIgnore
	@OneToMany(mappedBy = "user", fetch=FetchType.LAZY)
	//@JsonManagedReference(value = "usertochallenge")
	private Collection<Challenge> challenges;

	@JsonIgnore
	@OneToMany(mappedBy = "targetUser", fetch=FetchType.LAZY)
	//@JsonManagedReference(value = "targetusertochallenge")
	private Collection<Challenge> targetChallenges;


	@OneToOne(mappedBy = "user")
	private Profile profile;
	
	//gets and sets

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Collection<User> getFriends() {
		return friends;
	}

	public void setFriends(Collection<User> friends) {
		this.friends = friends;
	}

	public Collection<Result> getResults() {
		return results;
	}

	public void setResults(Collection<Result> results) {
		this.results = results;
	}

	public Collection<Challenge> getChallenges() {
		return challenges;
	}

	public void setChallenges(Collection<Challenge> challenges) {
		this.challenges = challenges;
	}

	public Collection<Challenge> getTargetChallenges() {
		return targetChallenges;
	}

	public void setTargetChallenges(Collection<Challenge> targetChallenges) {
		this.targetChallenges = targetChallenges;
	}

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}
}
