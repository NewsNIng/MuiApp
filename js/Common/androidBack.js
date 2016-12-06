(function($) {
	var backButtonPress = 0,main;
	//小细节，自动获取main先
	$.plusReady(getMain);
	function getMain(){
		main =  plus.android.runtimeMainActivity();
	}
	$.back = function() {
		backButtonPress++;
		if (backButtonPress > 1) {
			//退出
			//plus.runtime.quit();
			//后台
			if(!main){
				getMain();
			}
			main.moveTaskToBack(false);
		} else {
			plus.nativeUI.toast('再按一次返回桌面');
		}
		setTimeout(function() {
			backButtonPress = 0;
		}, 1000);
		return false;
	};
}(mui));