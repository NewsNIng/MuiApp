(function(V,name) {
	
	
	
	
	
	var template = '<ul class="mui-table-view">' +
		'<li class="mui-table-view-cell mui-media" v-for="o in data" @tap="tap(o)">' +
		'<a href="javascript:;">' +
		'<img class="mui-media-object mui-pull-left" :src="o.img">' +
		'<div class="mui-media-body">' +
		'<span>{{o.title}}</span>' +
		'<p class="mui-ellipsis">{{o.content}}</p>' +
		'</div>' +
		'</a>' +
		'</li>' +
		'</ul>';

	V.component(name, {
		template: template,
		props: ['data'],
		data: function() {
			return {
				data: []
			}
		},
		methods: {
			tap: function(o){
				alert(o.title);
			}
		}
	})
}(Vue,'app-list'))

