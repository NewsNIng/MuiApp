(function(V, name, $) {

	var template = '<div class="mui-slider"><div class="mui-slider-group mui-slider-loop"><div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img :src="data[data.length-1].src"></a></div><div v-for="(o,index) of data" class="mui-slider-item"><a href="#"><img :src="o.src"></a></div><div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img :src="data[0].src"></a></div></div><div class="mui-slider-indicator"><div class="mui-indicator" v-for="(o,index) in data" :class=\'{"mui-active":index===0}\'></div></div></div>';

	V.component(name, {
		template: template,
		props: ['data'],
		data: function() {
			return {
				data: [], //数据源
			}
		},
		mounted: function(){
			$('.mui-slider').slider({
				interval: 2000
			});
		},
		methods: {
			tap: function(o) {
				alert(o.src);
			}
		}
	})
}(Vue, 'app-carousel', mui))