/*!
 * jQuery Colour Picker @VERSION
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
			// ---- Dialog button actions ----
			
			.roleAction('action-apply', function(event) {
//				console.log('apply');
				var color = $.data(this, 'color').toString();
				$(this).closest('[data-color]').attr('data-color', color);
				return false;
			})
			
			.roleAction('action-ok', function(event) {
//				console.log('ok');
				$(this)
					.trigger('action-apply')
					.trigger('action-cancel');
				return false;
			})
			
			.roleAction('action-cancel', function(event) {
//				console.log('cancel');
				$(this)
					.closest(':role(dialog)')
					.attr('aria-hidden', true);
				return false;
			})

			// ---- Color modification events ----

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
		var color = $(this).closest('[data-color]').attr('data-color') || 'transparent';
		$(this).trigger('color', [color]);
	});

})(jQuery);

