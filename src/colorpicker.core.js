/*!
 * jQuery Colour Picker @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT and GPL licenses.
 */
/* Author: Mark Gibson (jollytoad at gmail dot com)
 *
 * A colour picker widget framework using jQuery Roles & jQuery Colour library.
 *
 * Depends:
 *   roles.core.js
 *   color.object.js
 */
(function($) {

$('.colorpicker')
	.roleStage('bind', function() {
		$(this)
			.bind('color.colorpicker', function(event, fn) {
				var color;
				
				if ( $.isFunction(fn) ) {
					var args = Array.prototype.slice.call(arguments, 2);
					color = fn.apply($.data(this, 'color'), args);
				} else if ( $.Color.isInstance(fn) ) {
					color = fn;
				} else if ( fn ) {
					color = $.Color(fn);
				}
				
				if ( color ) {
					$.data(this, 'color', color);
				}
			});
	})
	.roleStage('activate', function() {
		$(this).trigger('color', [$.attr(this, 'data-color') || '#fff']);
	});

})(jQuery);

