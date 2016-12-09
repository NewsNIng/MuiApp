(function($) {
	
	var main,
		backButtonPress = 0;
		
	$.plusReady(function(){
		main =  plus.android.runtimeMainActivity();
	});
	
	$.back = function() {
		backButtonPress++;
		if (backButtonPress > 1) {
			//退出
			//plus.runtime.quit();
			//后台
			main && main.moveTaskToBack(false);
		} else {
			plus.nativeUI.toast('再按一次返回桌面');
		}
		setTimeout(function() {
			backButtonPress = 0;
		}, 1000);
		return false;
	};
	
}(mui));