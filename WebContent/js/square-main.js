var gamestate = "on";
var map;
var timer = gametimer;
var score = 0;
var isTouched = false;
var startFlag = true;
var level = maxLevel;

G.F.loadMain = function() {
	this.AI = G.F.mainAI;
	resetGame();
	popTutorial();
};

function getTitle(score) {
	level1 = "1-初入剑途";
	level2 = "2-剑术达人";
	level3 = "3-流浪剑客";
	level4 = "4-无双剑姬";
	level5 = "5-无极剑圣";
	level6 = "6-疾风剑豪";
	level7 = "7-以剑证道";
	level8 = "8-腹肌剑神";

	if (score <= 500)
		return this.level1;
	else if (score <= 1000)
		return this.level2;
	else if (score <= 2000)
		return this.level3;
	else if (score <= 3000)
		return this.level4;
	else if (score <= 4000)
		return this.level5;
	else if (score <= 5000)
		return this.level6;
	else if (score <= 6000)
		return this.level7;
	else
		return this.level8;
};

G.F.mainAI = function() {
	if (gamestate == "on")
		timer -= 1;
	G.O.explosion.AI();
	var myTitleName = getTitle(score);
	if (timer <= 0 && gamestate == "on") {
		clearSquares(0, 0, row, column);
		G.O.tutorialboard.setSrc("").swapClass("tutorialboardOff" , "tutorialboardOn").draw();
		G.O.tutorialboard.setSrc(
				"<h1>修炼结束！</h1>" + 
				'<h3>孙小喵同学的功力值为</h3>' +
				'<h2>' + score + "</h2>" +
				"<h3>获得成就</h3>" +
				'<h2>' + myTitleName + "</h2>" +
				"<h3>排在第</h3>" +
				"<h2>正在紧急获取中</h2>" +
				"<h6>本游戏挂载在阿里云上，阿里会收取作者相应的费用，如果喜欢该游戏，希望能够自定义一款皮肤或者背景的话，" +
				"欢迎通过<a href='zhifubao.html'>支付宝(点我！)</a>向作者捐赠。" +
				"本游戏能够顺利挂在阿里云上多亏孙小喵以及多位热心玩家的资助</h6>")
				.draw();
		// G.O.help.setStyle({backgroundColor:'#000000'}).draw();
		getMyRanking()
		G.O.tutorial.setSrc("<p class='tutorial'>重来</p>").draw();
		G.O.dashboard.setSrc("").draw();
		gamestate = "off";
		document.title = "我在四角方块游戏中获得了" + score + "快来挑战我吧?";
	} else if (timer > 0) {
		squareManage();
//		var tutorial = G.O['tutorial'];
		var dashboard = G.O['dashboard'];
		dashboard.setSrc(
				"<p class='time'>Time:" + (Math.floor(timer / 25) + 1)
						+ "</p><p class='score'>Score:" + score + "</p>")
				.draw();
	}

	if (G.O.tutorial.tagContainsMouseClick() && gamestate == "off"
			&& isTouched == false) {
		resetGame();
	}

	if (G.O.tutorial.tagContainsMouseClick() && isTouched == false) {
		if (gamestate == "on")
			popTutorial();
		else if (gamestate == "pause")
			resumeGame();
	}
};

G.makeBlock('main', G.F.loadMain).loadBlock('main');
