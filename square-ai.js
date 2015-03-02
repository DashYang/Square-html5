function squareManage() {
	for ( i = 0 ; i < row ; i ++)
	{
		for(j = 0; j < column; j ++)
		{
			var square = G.O['square'+(i * column + j)];
			if ( square.tagContainsMouseClick() )
			{
				if (isPicked()) 
				{
					var lastSquare = G.O['square'+(lasty * column + lastx)];
					lastSquare.removeClass('picked').draw();
					if(isAcceptable(lasty , lastx , i , j)) {
						var x1 = square.x , y1 = square.y , x2 = lastSquare.x , y2 = lastSquare.y;
						var sx = x1 ,sy = y1 , bx = x2 ,by = y2;
						if(x2 < x1)
							sx = x2 , bx = x1;
						if(y2 < y1)
							sy = y2 , by= y1;
						var rownumber = Math.abs(lastx - j) + 1;
						var columnumber = Math.abs(lasty - i) + 1;
						score += rownumber * columnumber;
						timer += score * 0.5
						G.O.explosion.setVar({x:sx, y:sy , w:bx-sx+25 , h:by-sy+25}).AI('reset').turnOn();
						clearSquares(lasty , lastx , i , j);
						createSquares(lasty , lastx , i , j);
						if(enable() == false)
						{
							initMap();
							refreshScreen();
						}
					}
				}
				lasty = i , lastx = j;
				square.addClass("picked").draw();
			}
		}
	}
}

G.F.explosionAI = function (cmd) {
	var t = this, F;
    if (cmd == 'reset') {
        t.setState({frame:0}).setVar({ tx:0, ty:0, tw:0, th:0 }).draw();
    }
    else {
        if (!t.on) {
            return t;
        }
        F=t.S.frame;
        if (F < 4) {
            t.setVar({ x:t.x - (F*F+1), y:t.y - (F*F+1), w:t.w + (F*F*2+2), h:t.h+(F*F*2+2) }).draw();
        }
        else {
            t.turnOff();
        }
        t.S.frame++;
    }
    return t;
};
