package entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Table(name="challenge")
@Entity
public class Challenge {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@JsonBackReference(value="usertochallenge")
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user; 

	@JsonBackReference (value="resulttochallenge")
	@ManyToOne
	@JoinColumn(name="result_id")
	private Result result;

	@JsonBackReference(value="targetusertochallenge")
	@ManyToOne
	@JoinColumn(name="target_user_id")
	private User targetUser;

	// gets and sets

	public Integer getId() {
		return id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Result getResult() {
		return result;
	}

	public void setResult(Result result) {
		this.result = result;
	}

	public User getTargetUser() {
		return targetUser;
	}

	public void setTargetUser(User targetUser) {
		this.targetUser = targetUser;
	}




//	Override
//	public String toString() {
//		return "Challenge [id=" + id + ", resultId=" + resultId + ", targetUserId=" + targetUserId + "]";
//	}

}
