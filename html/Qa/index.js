var app = {
	initialize: function() {
		this.bindEvents();
		this.setupVue();
	},
	bindEvents: function() {
		mui.ready(this.onReady);
		mui.plusReady(this.onPlusReady);
	},
	onReady: function() {
		mui.init({
			swipeBack: false,
			pullRefresh: {
				container: '#app',
				deceleration: (mui.os.ios ? 0.003 : 0.0006),
				down: {
					callback: down
				},
				up: {
					callback: up
				}
			}
		});
		//自动上拉
		setTimeout(function() {
			mui('#app').pullRefresh().pulldownLoading(); 
		}, 200);
		app.receivedEvent('mui.ready');
	},
	onPlusReady: function() {
		app.receivedEvent('mui.plusReady');
	},
	receivedEvent: function(id) {
		console.log('Received Event: ' + id);
	},
	setupVue: function() {
		this.vm = new Vue({
			el: "#app",
			data: {
				randomWord: '',
				list: [],
				carousel: [{
					id: 1,
					title: '只要你有梦想,这里就是舞台',
					src: '../../img/ad/ad1.png',
				}, {
					id: 2,
					title: '飞速编码的极客工具',
					src: '../../img/ad/ad2.png',
				}],
				page: { //页面数据
					No: 1, //当前下标
					Size: 4, //数量
					oNo: 1, //上一次啊的上拉下标
					isDown: false, //是否下拉
					fname: 'push'
				}
			},
			ready: function(){
				this._carouselInit();
			},
			methods: {
				//获取列表数据
				getNetData: function(fn) {
					var _vm = this;
					if(_vm.page.isDown) { //下拉
						//记住上拉的页数
						_vm.page.No = 1;
						_vm.page.fname = 'unshift';
					} else { //上拉
						//重新获取上拉的页数
						_vm.page.No = _vm.page.oNo++;
						_vm.page.fname = 'push';
					}
					
					//模拟列表数据 
					setTimeout(function() {
						//plus.nativeUI.closeWaiting();

						var _data = _list();

						_vm.list[_vm.page.fname].apply(_vm.list, _data);
						fn && fn(!_data || _data.length === 0);
					}, 500);
				},
				//条目点击
				onTap: function(o) {
					mui.toast(o.id);
				}
			}
		});
	}
};

var _list = (function() {
	var index = 0;
	return function() {
		var rs = [];
		for(var i = index; i < index + 10; i++) {
			rs.push({
				id: i,
				title: '我叮当猫无话可说' + i,
				img: '../../img/' + (i % 3 + 1) + '.jpg',
				sourse: ['新浪', '腾讯', '网易'][i % 3]
			});
		}
		index = i;
		return rs;
	}
}());

//下拉刷新
function down() {
	app.vm.page.isDown = true;
	app.vm.getNetData(function() {
		mui('#app').pullRefresh().endPulldownToRefresh();
	});
}
//上拉加载更多
function up() {
	app.vm.page.isDown = false;
	app.vm.getNetData(function(c) {
		mui('#app').pullRefresh().endPullupToRefresh(c);
	});
}

app.initialize();