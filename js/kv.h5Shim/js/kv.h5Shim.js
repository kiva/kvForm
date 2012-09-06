/**
 * Simulate the following HTML5 form attributes:
 * - autofocus
 * - placeholder
 *
 */
(function ($, kv, global, undefined) {
	'use strict';


	/**
	 * Feature detection.  Opted to de-couple from Modernzr.
	 */
	var browserSupport = (function () {
		var inputEl = global.document.createElement('input');

		return {
			placeholder: 'placeholder' in inputEl
			, autofocus: 'autofocus' in inputEl
		};
	}());


	/**
	 * Given a jquery object, return a subset of its css properties as an object
	 *
	 * @param $el
	 */
	function getPlaceholderCSS($el){
		var s
		, p
		, b
		, padding = {Top: 0, Right: 0, Bottom: 0, Left: 0 }
		, margin = {Top: 0, Right: 0, Bottom: 0, Left: 0 }
		, css = {
			background: 'url(/img/1px.png) no-repeat' // IE 7/8 hack, makes the entire input region clickable
			, offset: $el.offset()
			, paddingTop: 0
			, paddingRight: 0
			, paddingBottom: 0
			, paddingLeft: 0
			, position: 'absolute'
			, marginTop: 0
			, marginRight: 0
			, marginBottom: 0
			, marginLeft: 0
			, height: $el.height()
			, width: $el.width()
		};

		// get the padding ( padding + border )
		for ( s in padding ){
			p = parseInt( $el.css('padding-' + s), 10);
			b = parseInt( $el.css('border-' + s + '-width'), 10);

			p = $.isNumeric(p) ? p : 0;
			b = $.isNumeric(b) ? b : 0;
			css['padding' + s ] = p + b;
		}

		// get the margin
		for ( s in margin ){
			css['margin' + s] = $el.css('margin-' + s);
		}

		return css;
	}


	/**
	 * Add "autofocus" support to non-standard browsers
	 */
	function autofocusShim() {
		$('input[autofocus=""]:visible').first().focus();
	}


	/**
	 * Add "placeholder" support to non-standard browsers
	 */
	function placeholderShim(){
		var $inputs = $('input[placeholder]');

		// Add the placeholder text to all inputs that have the "placeholder" attribute
		$inputs.each( function(){
			var $this = $(this)
				, css = getPlaceholderCSS($this)
				, $placeholder = $('<div class="placeholder" />')
				, $wrap = $('<div class="inputWrap" />')
				, text = $this.attr("placeholder");

			// Create the placeholder that will cover over the input element and delegate the click to the input
			$placeholder
				.css( css )
				.text( text )
				.click( function(){
					$this.focus();
				});

			// Some browsers (IE & FF) need to be explicitly told to not display the placeholder if the input field is not empty
			if ($this.val()) {
				$placeholder.hide();
			}

			// Wrap the input element, and position the placeholder relative to it and directly over input element
			$this
				.focus( function() {
					$placeholder.hide();
				})
				.blur( function(){
					if( this.value === ''){
						$placeholder.show();
					}
				})
				.wrap($wrap)
				.before($placeholder); // As if all this other stuff wasn't bad enough...this last bit makes me wanna puke, toss it when we stop supporting ie7 ( http://jaspan.com/ie-inherited-margin-bug-form-elements-and-haslayout )
		});
	}


	kv.extend({
		h5Shim: function () {
			if (!browserSupport.autofocus){
				autofocusShim();
			}

			if(!browserSupport.placeholder) {
				placeholderShim();
			}
		}
	});

}(jQuery, kv, window));