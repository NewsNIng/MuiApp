var DC = (function($, undefined) {
	var dc = {};

	dc.$$ = $;

	//通过参数个数的不同实现重载
	dc.addMethod = function(name, fn) {
		var ofn = app[name];
		app[name] = function() {
			if(fn.length === arguments.length) {
				return fn.apply(this, arguments);
			} else if(typeof ofn === 'function') {
				return ofn.apply(this, arguments);
			}
		};
	};

	return dc;
}(mui));

(function(dc) {
	dc.ready = function(rfn, prfn) {
		var $ = this.$$;
		rfn && $.ready(rfn);
		prfn && $.ready((function(f) {
			return f && window.plus && f || function() {
				document.addEventListener("plusready", f, false);
			};
		}(prfn)));
		return this;
	};
	dc.$ = function(s) {
		if(typeof s === 'string') s = document.querySelectorAll(s);
		return(function(doms, a$) {
			return {
				each: function(fn) {
					doms.length || (doms = [doms]);
					[].forEach.call(doms, fn);
					return this;
				},
				on: function(n, fn, b) {
					this.each(function(item) {
						item.addEventListener(n, fn, !!b);
					});
					return this;
				},
				onTap: function(fn, b) {
					this.on('tap', fn, b);
					return this;
				},
				get: function(index) {
					doms.length || (doms = [doms]);
					if(index === undefined) {
						return doms;
					}
					return doms[index];
				},
				length: function() {
					return doms.length;
				},
				css: function(a, b) {
					if(!b && typeof a === 'object') {
						for(var k in a) {
							arguments.callee.call(this, k, a[k]);
						}
						return this;
					}
					this.each(function(item) {
						item.style[a] = b;
					});
					return this;
				},
				html: function(a) {
					if(!a) {
						return this.get(0).innerHTML;
					}
					this.each(function(i) {
						i.innerHTML = a;
					});
					return this;
				},
				attr: function(a, b) {
					if(!b) {
						return this.get(0).getAttribute(a);
					}
					this.each(function(i) {
						i.setAttribute(a, b);
					});
					return this;
				},
				removeSelf: function() {
					this.each(function(i) {
						i.parentNode.removeChild(i);
					});
					return this;
				},
				parentN: function(n) {
					if(typeof n !== 'number') {
						n = 1;
					}
					var el = this.get(0);
					for(var i = 0; i < n; i++) {
						el = el.parentNode;
					}
					return a$(el);
				},
				cdClass: function() {
						return(function(_$) {
							return {
								cdBack: function() {
									return _$;
								},
								add: function(c) {
									if(Array.isArray(c)) {
										for(var i = 0, l = c.length; i < l; i++) {
											arguments.callee(c[i]);
										}
										return this;
									}
									_$.each(function(i) {
										i.classList.add(c);
									});
									return this;
								},
								remove: function(c) {
									if(Array.isArray(c)) {
										for(var i = 0, l = c.length; i < l; i++) {
											arguments.callee(c[i]);
										}
										return this;
									}
									_$.each(function(i) {
										i.classList.remove(c);
									});
									return this;
								},
								has: function(c) {
									return _$.get(0).classList.contains(c);
								},
								toggle: function(c) {
									_$.each(function(i) {
										i.classList.toggle(c);
									});
									return this;
								}
							}
						}(this))
					}
					//...
			}
		}(s, this.$));
	};
}(DC));

(function(dc) {
	dc.downFile = function(url, callback, downCallBack) {
		if(!url) {
			return;
		}
		var op = {
			method: "GET"
		};

		var dtask = plus.downloader.createDownload(url, op, function(d, status) {
			if(status == 200) {

				var path = plus.io.convertLocalFileSystemURL(d.filename);
				if(path.indexOf('file') < 0) {
					path = 'file://' + path;
				}
				callback && callback(null, path);
			} else {
				d.abort(); //自动会删除 临时文件
				callback && callback(status);
			}
		});
		var size = 0;
		dtask.addEventListener('statechanged', function(d, status) {
			size = +(d.downloadedSize / d.totalSize * 100);
			size = size.toFixed(0)
			downCallBack && downCallBack(size);
			// console.log("statechanged: " + d.state);
		});

		dtask.start();
		return dtask;
		// 暂停下载任务 dtask.pause();
		// 取消下载任务 dtask.abort();
	}
}(DC));

(function(dc) {
	//创建原生obj
	dc.createRect = function(url, callback, _op) {

		var that = this;
		url = url || '_www/img/2.jpg';
		var op = {
			top: '0%',
			left: '0%',
			width: '100%',
			height: '100%',
			opacity: 0.7
		};

		dc.$$.extend(op, _op || {});

		var view = plus.nativeObj.View.getViewById('absView');
		
		view = view || new plus.nativeObj.View('absView', op);

		var img = plus.nativeObj.Bitmap.getBitmapById('absImg');
		img = img || new plus.nativeObj.Bitmap('absImg');

		view.addEventListener('touchmove', function(e) {
			op.top = e.screenY + 'px';
			op.left = e.screenX + 'px';

			//that.createRect(url,callback,op);
		});

		view.setTouchEventRect({
			top: '77%',
			left: '77%',
			width: '77px',
			height: '77px',
		});
		
		
		view.addEventListener('click', function(e) {
			callback && callback();
		});

		img.load(url, function() {
			view.drawBitmap(img, {}, {
				top: '77%',
				left: '77%',
				width: '77px',
				height: '77px',
				opacity: 0.7
			});
			view.show();
		});
		
		return {
			hide:function(){
				view.hide();
			}
		}

	}
}(DC));