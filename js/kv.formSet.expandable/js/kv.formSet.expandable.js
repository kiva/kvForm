(function ($, kv) {

	var $fSetToggler = $('<a href="#" class="fSetToggler">advanced</a>');


	/**
	 *
	 * @param event
	 * @context {ExpandableSet}
	 */
	function handleToggleClick(event) {
		event.preventDefault();
		event.data.expandableSet.expandableToggle();
	}



	kv.FormSet.Expandable = function (kvFormSet) {
		kvFormSet.settings.expandable = $.extend({}, kv.FormSet.expandable.defaults, kvFormSet.settings.expandable);

		var $expandableSet = $(kvFormSet.$element)
		, $toggler = $fSetToggler.clone().appendTo($('.fSetHead .fSetInner', $expandableSet))
		, $nestedSet = $('> .fSetHead + .fSet', $expandableSet);

		$.each([$expandableSet, $toggler, $nestedSet], function (index, value) {
			if (self[value].length === 0) {
				throw 'missing ' + value;
			}
		});

		kvFormSet.decorate('expandable', {
			$toggler: $toggler

			, $nestedSet: $nestedSet


			/**
			 * Toggles the display of the expandableSet
			 */
			, expandableToggle: function () {
				if (this.attr('expandableState') == 'expanded') {
					this.close();
				} else {
					this.expand();
				}
			}


			/**
			 * Expands the expandableSet
			 */
			, expand: function () {
				var self = this;

				self.$nestedSet.stop().slideDown(function (event) {
					self.$toggler.text(self.settings.expandedText);
					self.attr('expandableState', 'expanded');
					$(event.target).addClass(self.settings.expandable.openClass);
				});
			}


			/**
			 * Closes the expandableSet
			 */
			, close: function () {
				var self = this;

				self.$nestedSet.stop().slideUp(function (event) {
					self.$toggler.text(self.settings.closedText);
					self.attr('expandableState', 'closed');
					$(event.target).removeClass(self.settings.expandable.openClass);
				});
			}
		});

		if (this.settings.expandable.expandOnLoad) {
			this.expand();
		} else {
			this.attr('expandableState', 'closed');
		}

		this.$toggler.click({expandableSet: this}, handleToggleClick);

		return kvFormSet;
	};


	kv.FormSet.expandable = function (kvFormSet, options) {
		kvFormSet.settings.expandable = $.extend({}, kv.FormSet.expandable.defaults, options);

		var $expandableSet = $(kvFormSet.$element);
		var $toggler = $fSetToggler.clone().appendTo($('.fSetHead .fSetInner', $expandableSet));
		var $nestedSet = $('> .fSetHead + .fSet', $expandableSet);

		$.each([$expandableSet, $toggler, $nestedSet], function (index, value) {
			if (self[value].length === 0) {
				throw 'missing ' + value;
			}
		});

		if (this.settings.expandable.expandOnLoad) {
			this.expand();
		} else {
			this.state = 'closed';
		}

		kvFormSet.decorate('expandable', {
			$toggler: $toggler

			, $nestedSet: $nestedSet


			/**
			 * Toggles the display of the expandableSet
			 */
			, expandableToggle: function () {
				if (this.state == 'expanded') {
					this.close();
				} else {
					this.expand();
				}
			}


			/**
			 * Expands the expandableSet
			 */
			, expand: function () {
				var self = this;

				self.$nestedSet.stop().slideDown(function () {
					self.$toggler.text(self.settings.expandedText);
					self.state = 'expanded';
					$(this).addClass(self.settings.openClass);
				});
			}


			/**
			 * Closes the expandableSet
			 */
			, close: function () {
				var self = this;

				self.$nestedSet.stop().slideUp(function () {
					self.$toggler.text(self.settings.closedText);
					self.state = 'closed';
					$(this).removeClass(self.settings.openClass);
				});
			}
		});

		this.$toggler.click({expandableSet: this}, handleToggleClick);

		return kvFormSet;
	};


	kv.FormSet.expandable.defaults = {
		openClass: 'open'
		, expandedText: 'close'
		, closedText: 'advanced'
		, expandOnLoad: false
	};
}(jQuery, kv));