G.F.loadMain = function () {
	this.AI = G.F.mainAI;
	var board = document.getElementById("gameboard");
	G.makeGob('viewport', G , 'div' , board)
		.setVar({w:viewportwidth, h:viewportheight , nextStyle:{position:'relative'}})
		.setStyle({backgroundColor:'#000000'}) 
		.turnOn();
	var i , j;
	initMap();
	for (i = 0 ; i < row ; i ++) 
	{
		for(j = 0; j < column ; j ++)
		{
			var bigside = squareside + squaremargin;
			G.makeGob('square'+(i*column+j) , G.O.viewport )
				.setVar({x:(squareleft + j * bigside), y:(squaretop + i * bigside), h:squareside, w:squareside })
				.addClass('square'+map[i][j])
				.turnOn();
			$("#square"+(i*column+j)).on('touchend',function(e){
				var id = $(this).attr("id");
				var square = G.O[id];
				squareHandler(square);
		    })
		}
	}
	G.makeGob('help',G , 'div' , board)
		.setVar({w:viewportwidth , h:helpheight , nextStyle:{position:'relative'}})
		.setSrc('time left:' + timer + " score:" + score)
		.setStyle({backgroundColor:'#666666'})
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
	if(timer <= 0) {
		clearSquares(0 , 0 , row , column);
		G.O.viewport.setStyle({backgroundColor:'#000000'}).
		setSrc('<br><br><br><br>Game Over!<br>you got <strong>'+ score + "<strong>").draw();
		G.O.help.setStyle({backgroundColor:'#000000'}).draw();

	}else if(timer > 0) {
		squareManage();		
		var help = G.O['help'];
		help.setSrc('<center>time left:' + Math.floor(timer/25) + " score:" + score +"<center>" ).draw();
	}
};

G.makeBlock('main', G.F.loadMain).loadBlock('main');
