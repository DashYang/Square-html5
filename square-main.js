var gamestate = "on";
var map;
var timer = gametimer;
var score = 0;

G.F.loadMain = function () {
	this.AI = G.F.mainAI;
	resetGame();
}; 

G.F.mainAI = function () {
	timer -= 1;
	G.O.explosion.AI();
	if(timer <= 0 && gamestate == "on") {
		clearSquares(0 , 0 , row , column);
		G.O.viewport.setStyle({backgroundColor:'#000000'}).
		setSrc('<br><br><h1>Game Over</h1><h3>you got</h3><h1>'+ score + "</h1><h2>Click</h2><h3>to</h3><h1>restart</h1>").draw();
	//	G.O.help.setStyle({backgroundColor:'#000000'}).draw();
		gamestate = "off";
		document.title = "I got " + score + "in Square Game,Can you beat me?";
	}else if(timer > 0) {
		squareManage();		
		var timebar = G.O['time'];
		timebar.setSrc("<p>T i m e<br>" + (Math.floor(timer/25) + 1) + "</p>" ).draw();
		var scorebar = G.O['score'];
		scorebar.setSrc("<p>S c o r e</br>" + score + "</p>" ).draw();
			
	}

	if(G.O.viewport.tagContainsMouseClick() && gamestate == "off"){
		resetGame();
	}
};

G.makeBlock('main', G.F.loadMain).loadBlock('main');
