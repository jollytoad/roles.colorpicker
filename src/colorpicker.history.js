/*
 * jQuery Colour Picker - Colour history palette @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT and GPL licenses.
 */
/* Author: Mark Gibson (jollytoad at gmail dot com)
 *
 * Record colour selection history in a palette
 *
 * Depends:
 *   roles.core.js
 *   mutations.core.js
 *   mutations.data.js
 *   color.core.js
 *   jquery.defer.js - optional but recommended if used with widgets that generate
 *                     a lot of color data mutation events, eg. hsv-square
 */
(function($) {

var opts = {
	palette: 'history',
	defer: 1000
};

function colorChange(event) {
	var key = event.newValue.toString(),
		palette = $.color.palette[opts.palette];
	
	if ( !palette ) {
		palette = $.color.palette[opts.palette] = {};
	}
	
	if ( !palette[key] ) {
		palette[key] = event.newValue;
		$(event.target).trigger(
			$.mutations.event('color-palette-'+opts.palette,
					{ attrName: key, newValue: event.newValue })
		);
	}
}

$('.colorpicker')
	.roleStage('bind', function() {
		$(this)
			// ---- Data mutations ----
			
			.bind('data.@color.colorpicker',
				$.defer && opts.defer ? $.defer(opts.defer, colorChange) : colorChange)
			
			// ---- Actions ----
			
			.roleAction('action-history-clear', function() {
				$.color.palette[opts.palette] = {};
				$(this).trigger('color-palette-'+opts.palette);
				return false;
			});
	});

})(jQuery);

