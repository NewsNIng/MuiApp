var randomImg = (function($, cg) {
	var rg = {};

	function _getRandomNum(n) {
		return Math.floor(Math.random() * n);
	}

	function _getRandomUrl(fileName,index) {
		var url = plus.io.convertLocalFileSystemURL('_www/img/random/' + fileName + '/' + index + '.jpg');
		if(!/^file/.test(url)) {
			url = 'file://' + url;
		}
		return url;
	}

	for(var i in cg) {
		rg[i] = (function(key,val) {
			return function() {
				return _getRandomUrl(key,_getRandomNum(val.count));
			}
		}(i,cg[i]));
	}

	return rg;
}(mui, {
	zx: {
		count: 20
	}
}));
