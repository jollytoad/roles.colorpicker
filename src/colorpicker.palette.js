/*
 * jQuery Colour Picker - Colour info widgets @VERSION (@DATE)
 *
 * Copyright (c) 2009 Adaptavist.com
 * Dual licensed under the MIT and GPL licenses.
 */
/* Author: Mark Gibson (jollytoad at gmail dot com)
 *
 * Provides a colour sample, CSS/HEX input, and separate channel inputs.
 *
 * Depends:
 *   colorpicker.core.js
 *   roles.core.js
 *   roles.aria.js
 *   color.object.js
 *   color.palette.*.js - optional pre-defined palettes
 */
(function($) {

$('.colorpicker :role(listbox)[data-palette]')

	.roleStage('bind', function() {
		var palette = $(this);
		$(this)
		
			// ---- Custom attributes ----
			
			.bind('attr.@data-palette.colorpicker', function(event) {
				$(this).empty();
				
				$.roles.whenVisible( this, function() {
					var self = this;
					
					$.each($.color.palette[event.newValue] || {}, function(i, c) {
						var color = new $.Color(c);
			
						if (!color.name && typeof i === 'string') {
							color.name = i;
						}
			
						$('<div></div>')
							.attr({
								'role': 'option',
								'title': (color.name ? color.name + ': ' : '') + color.toString()
							})
							.data('color', color)
							.css('background-color', color.to('CSS'))
							.appendTo(self);
					});
					
					$(this).roleSetup();
				});
			})
		
			// ---- Actions ----

			// Focus swatch in previous row
			.roleAction('action-prev-row', function(event) {
				var left = event.target.offsetLeft;
				$(event.target).prevAll().filter(function() { return this.offsetLeft === left; }).eq(0).focus();
				return false;
			})
			
			// Focus swatch in next row
			.roleAction('action-next-row', function(event) {
				var left = event.target.offsetLeft;
				$(event.target).nextAll().filter(function() { return this.offsetLeft === left; }).eq(0).focus();
				return false;
			})
			
			// ---- Keys ----
			
			.roleKey('up', 'action-prev-row')
			.roleKey('down', 'action-next-row');
			
	})
	
	.roleStage('init', function() {
		$(this)
			.initMutation('attr', 'data-palette');
	});

})(jQuery);

