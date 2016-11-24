(function($) {
	var vhp = function(o) {
			this.ops = (function(_o, _v) {
				for(var i in o) {
					_v[i] = _o[i];
				}
				return _v;
			}(o, {
				el: '#app',
				watch:{}
			}));
			this.init();
		},
		pro = vhp.prototype;

	pro._init_listens = function() {
		var arr = this.ops.listens,temp,that = this;
		for(var i in arr) {
			temp = arr[i];
			if(!this.ops.watch[temp]) {
				this.ops.watch[temp] = function(val){
					that._sendAllMessage(temp,val);
				}
			}
		}
	}
	
	pro._init_reg = function(){
		var that = this;
		window.addEventListener('_VHP_WATCH_CHANGE_',function(data){
			data = data.detail.data;
			for(var i in data){
				that.vm[i] = data[i]; 
			}
		});
	}
	
	pro._sendAllMessage = function(k,v){
		var that = this,data={};
		data[k] = v;
		$.plusReady(function(){
			for(var i in that.webviews){
				$.fire(that.webviews[i],'_VHP_WATCH_CHANGE_',{
					data:data
				});
				
			}
		});
	}

	pro.init = function() {
		var that = this;
		
		this._init_listens();
		
		this._init_reg();
		
		this.vm = new Vue(this.ops);
		
		$.plusReady(function(){
			that.webviews = plus.webview.all();
		});
	}
	
	window.VHP = vhp;

}(mui));