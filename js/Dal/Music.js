var Music = function() {
	var that = this;
	this.callback = null;
	
	var ws = new WebService();
	ws.setUrl(_MUSIC_URL_);
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
	
	
	//获取歌曲列表
	this.getList = function(callback) {
		ws.setDataType('html');
		ws.setOpName("kc/data.js");
		ws.setParas();
		this.callback = callback;
		ws.LoadData();
	};



}