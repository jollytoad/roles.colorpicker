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
 *   mutations.core.js
 *   mutations.data.js
 *   color.object.js
 *   color.rgb.js
 *   color.parse.js
 *   color.<space>.js - any other required colour spaces
 */
(function($) {

$('.colorpicker .color-sample')
	.roleStage('bind', function() {
		var sample = $(this);
		sample
			.closest('.colorpicker')
				.bind('data.@color.colorpicker', function(event) {
					sample
						.css('background-color', event.newValue.toCSS())
						.attr('title', event.newValue.name || event.newValue.toHEX());
				})
			.end();
	});

$('.colorpicker input.color-string')
	.roleStage('bind', function() {
		var string = $(this);
		string
			.bind('change.colorpicker', function() {
				$(this).trigger('color', [this.value]);
			})
			.closest('.colorpicker')
				.bind('data.@color.colorpicker', function(event) {
					string.val(event.newValue.toHEX());
				})
			.end();
	});

$('.colorpicker .channel-inputs input.channel')
	.roleStage('bind', function() {
		var input = $(this);
		input
			.bind('change.colorpicker', function() {
				var space = $(input).closest('[data-color-space]').attr('data-color-space'),
					index = input.attr('data-channel-index'),
					factor = input.attr('data-channel-factor') || 1,
					tuple = [null,null,null];
				tuple[index] = parseInt(input.val(), 10) / factor;
				input.trigger('color', [$.Color.fn.modify, new $.Color(tuple, space)]);
			})
			.closest('.colorpicker')
				.bind('data.@color.colorpicker', function(event) {
					var space = $(input).closest('[data-color-space]').attr('data-color-space'),
						index = input.attr('data-channel-index'),
						factor = input.attr('data-channel-factor') || 1;
					input.val(Math.round(event.newValue.to(space)[index] * factor));
				})
			.end();
	});

})(jQuery);

