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
	 * Creates a new instance of ExpandableSet
	 *
	 * @param options
	 * @param expandableSet
	 * @constructor
	 */
	function ExpandableSet(expandableSet, options) {
		var self = this;

		this.settings = $.extend({}, ExpandableSet.defaults, options);
		this.$expandableSet = $(expandableSet);
		this.$toggler = $fSetToggler.appendTo($('.fSetHead .fSetInner', this.$expandableSet));
		this.$nestedSet = $('> .fSetHead + .fSet', this.$expandableSet);

		$.each(['$expandableSet', '$toggler', '$nestedSet'], function (index, value) {
			if (self[value].length === 0) {
				throw 'missing ' + value;
			}
		});

		if (this.settings.expandOnLoad) {
			this.expand();
		} else {
			this.state = 'closed';
		}

		this.$toggler.click({expandableSet: this}, handleToggleClick);
	}


	/**
	 * Default settings
	 *
	 * @type {Object}
	 */
	ExpandableSet.defaults = {
		openClass: 'open'
		, expandedText: 'close'
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
			self.$toggler.text(self.settings.expandedText);
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


	// Expose on the kv namespace
	kv.extend({ExpandableSet: ExpandableSet});
}(jQuery, kv));