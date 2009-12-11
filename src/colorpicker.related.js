/*
 * jQuery Colour Picker - Related colours palette @VERSION
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT and GPL licenses.
 */
/* Author: Mark Gibson (jollytoad at gmail dot com)
 *
 * Generate a palette of colours related to the current colour.
 *
 * Depends:
 *   roles.core.js
 *   mutations.core.js
 *   mutations.data.js
 *   color.core.js
 *   color.related.js
 *   jquery.defer.js - optional but recommended if used with widgets that generate
 *                     a lot of color data mutation events, eg. hsv-square
 */
(function($) {

var opts = {
	palette: 'related',
	defer: 1000
};

function colorChange(event) {
	$.color.palette[opts.palette] = $.Color(event.newValue).related();	
	$(event.target).trigger('color-palette-'+opts.palette);
}

$('.colorpicker')
	.roleStage('bind', function() {
		$(this)
			// ---- Data mutations ----
			
			.bind('data.@color.colorpicker',
				$.defer && opts.defer ? $.defer(opts.defer, colorChange) : colorChange);
	});

})(jQuery);

