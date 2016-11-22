var WebService = function($) {
	$ = $ || mui;

	var url = "";
	var opName = "";
	var paras = {};
	var type = "post";
	var dataType = 'json';

	this.setUrl = function(_url) {
		url = _url;
	}

	this.setOpName = function(_opName) {
		opName = _opName;
	}

	this.setParas = function(_paras) {
		for(var i in _paras) {
			paras[i] = _paras[i];
		}
	}

	this.setType = function(_type) {
		type = _type;
	}

	this.setDataType = function(_type) {
		this.dataType = _type;
	}

	//成功返回数据时，执行的函数。
	var callBack = null;
	this.setCallBack = function(_callBack) {
		callBack = _callBack;
	}

	//错误时，执行的函数。
	var errorCallBack = null;
	this.setErrorCall = function(_errCallBack) {
		errorCallBack = _errCallBack;
	}

	//调用功能方法，从服务器取数据的方法。
	this.LoadData = function() {

		var webUrl = url + opName;
		var datas = "";

		if(type == 'get') {
			var isFirst = true;
			var str = '';
			for(key in paras) {
				if(isFirst) {
					str += "?" + key + "=" + paras[key];
					isFirst = false;
				} else
					str += "&" + key + "=" + paras[key];
			}
			webUrl += str;

		} else {
			datas = JSON.stringify(paras);
		}
		console.log(webUrl);
		$.ajax(webUrl, {
			type: type,
			dataType: dataType,
			contentType: 'application/json; charset=utf-8',
			data: datas,
			timeout: 10000,
			success: callBack,
			error: function() {
				return callBack.call(this, arguments);
			}
		});
	}

}