G.F.loadMain = function () {
	this.AI = G.F.mainAI;
	G.makeGob('viewport', G)
		.setVar({x:50, y:50, w:220, h:468})
		.setStyle({backgroundColor:'#000000'}) 
		.turnOn();
	var i , j;
	initMap();
	for (i = 0 ; i < row ; i ++) 
	{
		for(j = 0; j < column ; j ++)
		{
			G.makeGob('square'+(i*6+j) , G.O.viewport )
				.setVar({x:27 + j * 28, y:25 + i * 28, h:25, w:25 })
				.addClass('square'+map[i][j])
				.turnOn();
		}
	}
	G.makeGob('help',G)
		.setVar({x:50 , y:518 ,w:220 , h:40})
		.setSrc('time left:' + timer + " score:" + score)
		.setStyle({backgroundColor:'#555555'})
		.turnOn();

	G.makeGob('explosion',G.O.viewport)
		.setState({frame:0})
		.setVar({x:-100, y:-100, w:4, h:12, AI:G.F.explosionAI})
		.setStyle({border:'3px solid red'})
		.turnOn();
}; 

G.F.mainAI = function () {
	timer -= 1;
	G.O.explosion.AI();
	if(timer == 0) {
		clearSquares(0 , 0 , row , column);
		G.O.viewport.setStyle({backgroundColor:'#000000'}).
		setSrc('<br><br><br><br>Game Over!<br>you got <strong>'+ score + "<strong>!").draw();
		G.O.help.setStyle({backgroundColor:'#000000'}).draw();

	}else if(timer > 0) {
		squareManage();		
		var help = G.O['help'];
		help.setSrc('time left:' + Math.floor(timer/25) + " score:" + score ).draw();
	}
};

G.makeBlock('main', G.F.loadMain).loadBlock('main');