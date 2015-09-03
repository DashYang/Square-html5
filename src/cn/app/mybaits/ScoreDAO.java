package cn.app.mybaits;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * @author dash
 * @version 1.0 date 2015-7-20
 * @since JDK1.6
 */
public interface ScoreDAO {
	@Insert("insert into score (`owner`,`score`)"
			+ " values (#{owner},#{score})")
	public int insert(Score event);
	
	@Select("select * from score where `score` > #{score} ")
	public List<Score> getGreaterThanScoreList(@Param(value="score") int score);
}
