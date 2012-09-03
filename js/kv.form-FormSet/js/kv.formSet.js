(function ($, kv, global) {


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


	kv.FormSet = function (formSet, options) {
		var $element = $()
		, $formSet = $(formSet)
		, $fSetHead = $('.fSetHead', $formSet)
		, inputType = $element.attr('type');

		this.$element = $element;
		this.isRequired = !!$element.attr('required');
		this.isExpandableSet = $formSet.hasClass('expandableSet');
		this.isNestedCheckboxSet = $formSet.hasClass('nestedCheckboxSet');
		this.isClickableSet = inputType == 'radio' || inputType == 'checkbox';

		innerWrap($formSet);

		if (this.isRequired) {
			$formSet.addClass('required');
		}

		$fSetHead.html($fSetInner.clone().html($('<div class="label" />').html($fSetHead.text())));

		if (typeof kv.NestedCheckboxSet == 'function' && this.isNestedCheckboxSet) {
			this.nestedCheckboxSet()
		}

		if (typeof kv.ExpandableSet == 'function' && this.isExpandableSet) {
			this.expandableSet();
		}

		// Bind to the jquery.h5Validate events here
		/** @todo **/
	};

}(jQuery, kv, this));