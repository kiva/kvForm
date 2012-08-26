(function ($, kv) {

	var $fSetToggler = $('<a href="#" class="fSetToggler">advanced</a>');


	/**
	 *
	 * @param event
	 * @context {ExpandableSet}
	 */
	function handleToggleClick(event) {
		event.preventDefault();
		event.data.expandableSet.toggle();
	}


	/**
	 *
	 * @param $expandableSet
	 * @constructor
	 */
	function ExpandableSet(options, expandableSet) {
		this.settings = $.extend({}, ExpandableSet.defaults, options);
		this.$expandableSet = $(expandableSet);
		this.$toggler = $fSetToggler.appendTo($('.fSetHead .fSetInner', this.$expandableSet));
		this.$nestedSet = $('> .fSetHead + .fSet', this.$expandableSet);
		this.settings = options;

		if (this.settings.expandOnLoad) {
			this.expand();
		} else {
			this.state = 'closed';
		}

		this.$toggler.click({expandableSet: this}, handleToggleClick);
	}


	ExpandableSet.defaults = {
		openClass: 'open'
		, openText: 'close'
		, closedText: 'advanced'
		, expandOnLoad: false
	};


	/**
	 * Toggles the display of the expandableSet
	 */
	ExpandableSet.prototype.toggle = function () {
		if (this.state == 'expanded') {
			this.close();
		} else {
			this.expand();
		}
	};


	/**
	 * Expands the expandableSet
	 */
	ExpandableSet.prototype.expand = function () {
		var self = this;

		self.$nestedSet.stop().slideDown(function () {
			self.$toggler.text(self.settings.openText);
			self.state = 'expanded';
			$(this).addClass(self.settings.openClass);
		});
	};


	/**
	 * Closes the expandableSet
	 */
	ExpandableSet.prototype.close = function () {
		var self = this;

		self.$nestedSet.stop().slideUp(function () {
			self.$toggler.text(self.settings.closedText);
			self.state = 'closed';
			$(this).removeClass(self.settings.openClass);
		})
	};


	kv.extend({ExpandableSet: ExpandableSet});
}(jQuery, kv));