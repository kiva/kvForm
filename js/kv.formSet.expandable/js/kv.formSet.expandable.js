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


	/**
	 *
	 */
	kv.FormSet.prototype.expandable = function () {
		this.settings.expandable = $.extend({}, kv.FormSet.expandable.defaults, this.settings.expandable);


		var $expandableSet = this.$formSet
		, $toggler = $fSetToggler.clone().appendTo($('.fSetHead .fSetInner', $expandableSet))
		, $nestedSet = $('> .fSetHead + .fSet', $expandableSet);


		// Make sure everything is structured the way we need it
		$.each({expandableSet: $expandableSet, toggler: $toggler, nestedSet: $nestedSet}, function (key, val) {
			if (val.length === 0) {
				throw 'missing ' + key;
			}
		});


		this.decorate('expandable', {
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

				self.$nestedSet.stop().slideDown(function () {
					self.$toggler.text(self.settings.expandedText);
					self.attr('expandableState', 'expanded');
					$(this).addClass(self.settings.expandable.openClass);
				});
			}


			/**
			 * Closes the expandableSet
			 */
			, close: function () {
				var self = this;

				self.$nestedSet.stop().slideUp(function () {
					self.$toggler.text(self.settings.closedText);
					self.attr('expandableState', 'closed');
					$(this).removeClass(self.settings.expandable.openClass);
				});
			}
		});


		if (this.settings.expandable.expandOnLoad) {
			this.expand();
		} else {
			this.attr('expandableState', 'closed');
		}


		this.$toggler.click({expandableSet: this}, handleToggleClick);
	};


	kv.FormSet.expandable = {
		defaults: {
			openClass: 'open'
			, expandedText: 'close'
			, closedText: 'advanced'
			, expandOnLoad: false
		}
	};

}(jQuery, kv));