(function($) {
	var vhp = function(o) {
			//object 深度合并
			this.ops = (function _extend(_v, _o) {
				var has;
				for(var i in _o) {

					has = false;
					for(var j in _v[i]) {
						has = true;
					}
					if(has && typeof _o[i] === 'object') {
						_o[i] = _extend(_v[i], _o[i]);
					}
					_v[i] = _o[i];
				}
				return _v;
			}({
				el: '#app',
				data: {
					vhpstate$: 'self$'
				},
				watch: {},
				listens: ['isother$']
			}, o));
			this.init();
		},
		pro = vhp.prototype;
		
	//初始化自定义监听列表
	pro._init_listens = function() {
		var arr = this.ops.listens,
			temp, that = this;
		for(var i in arr) {
			temp = arr[i];
			if(!this.ops.watch[temp]) {
				this.ops.watch[temp] = function(val) {
					//判断是否是自身引起的数据变化
					if(that.vm.vhpstate$ === 'self$') {
						//通知
						that._sendAllMessage(temp, val);
					}
				}
			}
		}

	}
	
	//注册数据变化事件
	pro._init_reg = function() {
		var that = this;
		window.addEventListener('_VHP_WATCH_CHANGE_', function(data) {
			data = data.detail.data;
			
			//状态改为 是其
			that.vm['vhpstate$'] = 'other$';

			//数据赋值   待优化
			for(var i in data) {
				that.vm[i] = data[i];
			}
			
			//状态改为 自身
			setTimeout(function() {
				that.vm['vhpstate$'] = 'self$';
			}, 25);

		});
	}
	
	//发送数据变化通知
	pro._sendAllMessage = function(k, v) {
		var that = this,
			data = {},
			temp;
		data[k] = v;
		$.plusReady(function() {
			for(var i in that.webviews) {
				temp = that.webviews[i];
				$.fire(temp, '_VHP_WATCH_CHANGE_', {
					data: data
				});

			}
		});
	}

	pro.init = function() {
		var that = this;

		this._init_listens();

		this._init_reg();

		this.vm = new Vue(this.ops);

		$.plusReady(function() {
			//隐性bug?
			that.webviews = plus.webview.all();
		});
	}

	window.VHP = vhp;

}(mui));