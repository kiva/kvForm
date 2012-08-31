(function ($, kv) {

	var $fSetInner = $('<div class="fSetInner" />');


	function Set($set) {
		this.$set = $($set);
	}


	/**
	 * Wraps all non-first select, input, textarea, and label child elements of an fSet with an .fSetInner element
	 *
	 * @param index
	 * @param el
	 */
	function Set.prototype.innerWrap() {
		var $children = this.$set.children('select, input, textarea, label')
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

}(jQuery, kv));