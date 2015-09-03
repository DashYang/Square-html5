function addMyScore() {
	$.ajax({
        type: "post",//请求方式
        url: "./endPoint",//发送请求地址
        dataType: "json",//返回json格式的数据
        data: {
            type : "saveScore",
            score : score,
            owner : "SquareGame",
        },
        success: function (jsonData) {
        	if (jsonData.result == "success") {
        		console.log("save success");
            } else {
                console.log("save fail");
            }
        } 
    });
}

function getMyRanking() {
	$.ajax({
        type: "post",//请求方式
        url: "./endPoint",//发送请求地址
        dataType: "json",//返回json格式的数据
        data: {
            type : "list",
            score : score,
            owner : "SquareGame",
        },
        success: function (jsonData) {
        	var myTitleName = getTitle(score);
        	if (jsonData.result == "success") {
        		G.O.tutorialboard.setSrc(
        				"<h1>修炼结束！</h1>" + 
        				'<h3>孙小喵同学的功力值为</h3>' +
        				'<h2>' + score + "</h2>" +
        				"<h3>获得成就</h3>" +
        				'<h2>' + myTitleName + "</h2>" +
        				"<h3>排在第</h3>" +
        				'<h2>' + jsonData.number + " 位</h2>" +
        				"<h6>本游戏挂载在阿里云上，阿里会收取作者相应的费用，如果喜欢该游戏，希望能够自定义一款皮肤或者背景的话，" +
        				"欢迎通过<a href='zhifubao.html'>支付宝(点我！)</a>向作者捐赠" +
        				"本游戏能够顺利挂在阿里云上多亏孙小喵以及多位热心玩家的资助</h6>")
        				.draw();
        		addMyScore();
            } else {
            	G.O.tutorialboard.setSrc(
        				"<h1>修炼结束！</h1>" + 
        				'<h3>孙小喵同学的功力值为</h3>' +
        				'<h2>' + score + "</h2>" +
        				"<h3>获得成就</h3>" +
        				'<h2>' + myTitleName + "</h2>" +
        				"<h3>排在第</h3>" +
        				"<h2>获取失败，请检查网络</h2>" +
        				"<h6>本游戏挂载在阿里云上，阿里会收取作者相应的费用，如果喜欢该游戏，希望能够自定义一款皮肤或者背景的话，" +
        				"欢迎通过<a href='zhifubao.html'>支付宝(点我！)</a>向作者捐赠" +
        				"本游戏能够顺利挂在阿里云上多亏孙小喵以及多位热心玩家的资助</h6>")
            }
        } 
    });
}