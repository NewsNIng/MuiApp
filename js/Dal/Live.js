var Live = function() {
	var that = this;
	this.callback = null;
	
	var ws = new WebService();
	ws.setUrl(_DOUYU_LIVE_);
	ws.setType('get');
	
	ws.setErrorCall(function(e){
		console.log(JSON.stringify(e));
		plus.nativeUI.closeWaiting();
		mui.toast('服务器正在开小差...');
	});
	ws.setCallBack(function(data){
		if(!data || data.length === 0){
			return that.callback({
				message:'',
				code:0
			},data);
		}
		return that.callback(null,data);
	});
	
	
	//获取全部直播列表
	this.getAllLive = function(offset,limit,callback) {
		ws.setOpName("live");
		ws.setParas({
			offset: offset * limit,
			limit: limit
		});
		this.callback = callback;
		ws.LoadData();
	};



}