/*
 * jQuery Colour Picker - Colour info widgets @VERSION
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

function createSwatch(color, key) {
	return $('<div></div>')
		.attr({
			'role': 'option',
			'title': (color.name ? color.name + ': ' : '') + color.toString()
		})
		.data('color', color)
		.data('key', key)
		.css('background-color', color.toCSS());
}

$('.colorpicker :role(listbox)[data-palette]')

	.roleStage('bind', function() {
		$(this)
		
			// ---- Custom attributes ----
			
			.bind('attr.@data-palette.colorpicker', function(event) {
				var self = this,
					palette = event.newValue;
				
				function refresh() {
					$.roles.whenVisible(self, 'color-palette-'+palette, function() {
						$(self).empty();
				
						$.each($.color.palette[palette] || {}, function(i, c) {
							var color = new $.Color(c);
		
							if (!color.name && typeof i === 'string') {
								color.name = i;
							}
							
							createSwatch(color, i).appendTo(self);
						});
						
						$(self).roleSetup();
					});
				}
				
				if ( event.prevValue ) {
					$.roles.whenVisible(self, 'color-palette-'+event.prevValue);
					$(document).unbind('color-palette-'+event.prevValue);
				}
				
				if ( palette ) {
					$(document).bind('color-palette-'+palette, refresh);
					refresh();
				}
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
			
			// Choose the colour swatch
			.roleAction('action-select', function(event) {
				var color = $(event.target).closest(':role(option)').data('color');
				if ( color ) {
					$(event.target).trigger('color', [color]);
				}
				return false;
			})
			
			// ---- Mouse ----
			
			.roleBind('click', 'action-select')
			
			// ---- Keys ----
			
			.roleKey('up', 'action-prev-row')
			.roleKey('down', 'action-next-row')
			.roleKey('enter', 'action-select')

			.end();
	})
	
	.roleStage('init', function() {
		$(this)
			.initMutation('attr', 'data-palette');
	});

})(jQuery);

