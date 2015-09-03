package cn.app.mybaits;

import java.util.LinkedList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

/**
 * @author dash
 * @version 1.0 date 2015-7-20
 * @since JDK1.6
 */
public class Score {
	private int id;
	private String owner;
	private int score;
	
	public Score() {
		this.id = 0;
		this.owner = "";
		this.score = 0;
	}
	
	public Score(int id, String owner, int score) {
		super();
		this.id = id;
		this.owner = owner;
		this.score = score;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int save() {
		int flag = 0;
		try {
			SqlSession session = DAOManager.getSession();
			ScoreDAO scoreDAO = session.getMapper(ScoreDAO.class);
			Score event = (Score) this;
			flag = scoreDAO.insert(event);

			session.commit();
			session.close();
		} catch (Exception e) {
			flag = 0;
			System.out.println(e.toString());
		}
		return flag;
	}
	
	public static List<Score> getGreaterThanScoreList(int score) {
		List<Score> list = new LinkedList<Score>();
		try {
			SqlSession session = DAOManager.getSession();
			ScoreDAO eventDAO = session.getMapper(ScoreDAO.class);
			list = eventDAO.getGreaterThanScoreList(score);

			session.commit();
			session.close();
		} catch (Exception e) {
			System.out.println(e.toString());
		}
		return list;
	}
}
