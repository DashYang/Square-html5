package cn.app.game;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;

import cn.app.mybaits.Score;

/**
 * Servlet implementation class endPoint
 */
@WebServlet("/endPoint")
public class endPoint extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public endPoint() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String type = request.getParameter("type");
		int score = Integer.parseInt(request.getParameter("score").toString());
		String owner = request.getParameter("owner");
		JSONObject json = new JSONObject();
		if (type.equals("list")) {
			try {
				List<Score> list = Score.getGreaterThanScoreList(score);
				json.put("number", list.size() + 1);
				json.put("result", "success");
			} catch (Exception e) {
				json.put("result", "fail");
			}
		} else if (type.equals("saveScore")) {
			Score scoreItem = new Score();
			try {
				scoreItem.setOwner(owner);
				scoreItem.setScore(score);
				scoreItem.save();
				json.put("result", "success");
			} catch (Exception e) {
				json.put("result", "fail");
			}
		}
		System.out.println(json.get("result"));
		PrintWriter pw = response.getWriter();
		pw.print(json.toString());
		pw.close();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}

}
