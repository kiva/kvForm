(function ($, kv, global, undefined) {
	'use strict';


	var $fSetInner = $('<div class="fSetInner" />')
	, id = 0;


	/**
	 * Wraps all non-first select, input, textarea, and label child elements of an fSet with an .fSetInner element
	 *
	 * @param index
	 * @param el
	 */
	function innerWrap($formSet) {
		var $children = $formSet.children('select, input, textarea, label')
		, $firstEl = $children.first()
		, $wrapMe = $children.not($firstEl)
		, $wrapper;

		// Bundle all $wrapMe elements into one and add them back into the dom
		if ($wrapMe.length > 0) {
			$wrapMe.remove();
			$wrapper = $wrapMe.wrapAll($fSetInner).parent();

			$firstEl.after($wrapper);
		}
	}


	/**
	 *
	 * @param $formSet
	 * @param options
	 * @constructor
	 */
	kv.FormSet = function ($formSet, options) {
		var $fSetHead = $('.fSetHead', $formSet)
		, $controlElement = $('> input, > textarea', $formSet).first()
		, controlType = $controlElement.attr('type');

		if ($formSet.hasClass('fSetHead')) {
			$formSet.html($fSetInner.clone().html($('<div class="label" />').html($formSet.text()))).addClass('fSet');
		}

		this.decorators = [];
		this.attributes = {};
		this.settings = {};
		this.$formSet = $($formSet);
		this.$fSetHead = $fSetHead;
		this.$controlElement = $controlElement;

		// Set clickable fSet
		if (controlType == 'radio' || controlType == 'checkbox') {
			this.attr('clickableSet', true);
			$formSet.addClass('clickableSet');
		} else {
			this.attr('clickableSet', false);
		}

		innerWrap($formSet);

		$fSetHead.html($fSetInner.clone().html($('<div class="label" />').html($fSetHead.text())));

		// Decorate as a nestedCheckbox
		if (typeof kv.FormSet.prototype.nestedCheckbox == 'function' && $formSet.hasClass('nestedCheckboxSet')) {
			this.nestedCheckbox();
		}

		// Decorate as an expandableSet
		if (typeof kv.FormSet.prototype.expandable == 'function' && $formSet.hasClass('expandableSet')) {
			this.expandable();
		}

		// Bind to the jquery.h5Validate events here
		/** @todo **/

		this.id = id++;
	};


	kv.FormSet.prototype = {

		/**
		 *
		 * @param decoratorName
		 * @param decorator
		 * @return {*}
		 */
		decorate: function (decoratorName, decorator) {
				this.decorators.push(decoratorName);
				return $.extend(this, decorator);
		}

		/**
		 * Check if the formSet object is decorated by the given decorator
		 *
		 * @params {String} decoratorName
		 */
		, implements: function (decoratorName) {
			return $.inArray(decoratorName, this.decorators) != -1;
		}


		/**
		 * Getter/setter for attributes on the formSet object
		 *
		 * @params props
		 * @params val
		 */
		, attr: function (props, val) {
			var k;

			if (props instanceof jQuery) {
				return props.attr(val);
			}

			if (typeof props == 'object') {
				for (k in props) {
					this.attributes[k] = props[k];
				}

				return this;
			}

			if (typeof val != 'object' && val !== undefined) {
				this.attributes[props] = val;
				return this;
			}

			return this.attributes[props];
		}
	};


}(jQuery, kv, this));


/**
 *
 * Will I need these??
 *
 * kvFormSet.get('name').isRequired(true)
 * kvFormSet.get('name').isCheckbox(true);
 * kvFormSet.get('name').isRadio(true);
 * kvFormSet.get('name').isEmail(true);
 * kvFormSet.get('name').isPhone(true);
 * kvFormSet.get('name').isUrl(true);
 * kvFormSet.get('name').isTextarea(true);
 *
 */