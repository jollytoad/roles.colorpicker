/*
 * jQuery Colour Picker - HSV widget @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT and GPL licenses.
 */
/* Author: Mark Gibson (jollytoad at gmail dot com)
 *
 * Provides a Saturation/Value area widget, and a Hue slider.
 *
 * Depends:
 *   colorpicker.core.js
 *   roles.core.js
 *   ui.surface.js
 *   ui.area.js
 *   ui.vertical.js
 *   mutations.core.js
 *   mutations.data.js
 *   color.object.js
 *   color.rgb.js
 *   color.hsv.js
 */
(function($) {

$('.colorpicker .satval-area')
	.roleStage('bind', function() {
		var square = $(this);
		square
			.area()
			.bind('pointdrag.colorpicker', function(event, ui) {
				$(event.target).trigger('color', [$.Color.fn.modify, $.Color([null, ui.x, 1 - ui.y], 'HSV')]);
			})
			
			.closest('.colorpicker')
				.bind('data.@color.colorpicker', function(event) {
					if ( square.is(':visible') ) {
						var hsv = event.newValue.to('HSV'),
							hue = $.Color([hsv[0],1,1], 'HSV').toCSS();
				
						square
							.css('background-color', hue)
							.area('option', {x: hsv[1], y: 1 - hsv[2] });
					}
				})
			.end();
	});

$('.colorpicker .hue-slider')
	.roleStage('bind', function() {
		var slider = $(this);
		slider
			.vertical()
			.bind('pointdrag.colorpicker', function(event, ui) {
				$(event.target).trigger('color', [$.Color.fn.modify, $.Color([ui.value, null, null], 'HSV')]);
			})
			
			.closest('.colorpicker')
				.bind('data.@color.colorpicker', function(event) {
					if ( slider.is(':visible') ) {
						var hsv = event.newValue.toHSV();
					
						slider
							.vertical('option', { value: hsv[0] });
					}
				})
			.end();
	});

})(jQuery);

