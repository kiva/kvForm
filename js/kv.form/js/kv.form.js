(function () {
	'use strict';


	var $fSetInner = $('<div class="fSetInner" />')

	, $fSetToggler = $('<a href="#" class="fSetToggler">advanced</a>')

	, openClass = 'open'

	, openText = 'close'

	, closedText = 'advanced';


	/**
	 * Wraps all non-first select, input, textarea, and label child elements of an fSet with an .fSetInner element
	 *
	 * @param index
	 * @param el
	 */
	function innerWrap(index, el) {
		var $children = $(el).children('select, input, textarea, label')
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
	 * @param $targetForm
	 * @param options
	 * @return {Object}
	 * @constructor
	 */
	function KvForm($targetForm, options) {
		$targetForm = $($targetForm).css('display', 'block');
		options = options || {};

		var $elements = $('input, select, textarea', $targetForm)
		, $clickableElements = $('input[type="checkbox"], input[type="radio"]', $targetForm)
		, $requiredElements = $('[required]', $targetForm)
		, $sets = $('.fSet', $targetForm)
		, $expandableSets = $('.expandableSet', $targetForm)
		, formValidationObj;

		// Wrap inner elements
		$sets.each(innerWrap);

		// Set required fSet
		$requiredElements.closest('.fSet').addClass('required');

		// Set clickable fSet
		$clickableElements.closest('.fSet').addClass('clickableSet');

		// Set expandable fSets
		$expandableSets.each(function () {
			new ExpandableSet(options, this);
		});


		if (typeof $.fn.ajaxForm == 'function') {
			$targetForm.ajaxForm(options);
		}

		if (typeof kv.formValidation  == 'function' && options.validation) {
			formValidationObj = kv.formValidation(options.validation);

			if (formValidationObj) {
				// merge the object into the kvFormObject
			}
		}

		return {
			settings: options
		}
	}


	/**
	 *
	 * @param event
	 * @context {ExpandableSet}
	 */
	function handleToggleClick(event) {
		this.toggle($(event.target));
	}


	/**
	 *
	 * @param $expandableSet
	 * @constructor
	 */
	function ExpandableSet(options, expandableSet) {
		var $expandableSet = this.$expandableSet = $(expandableSet);
		this.$toggler = $fSetToggler.appendTo($('.fSetHead .fSetInner', $expandableSet));
		this.$nestedSet = $('> .fSetHead + .fSet', $expandableSet);
		this.$checkboxes = $('SELECTOR', $expandableSet);
		this.state = 'closed';
		this.settings = options;

		$expandableSet.click($.proxy(this, 'handleToggleClick'));
	}


	/**
	 * Triggers the click event on the expandableSet
	 */
	ExpandableSet.prototype.click = function () {
	};


	/**
	 * Toggles the display of the expandableSet
	 */
	ExpandableSet.prototype.toggle = function () {
		if (this.state == 'expanded') {
			this.expand();
		} else {
			this.close();
		}
	};


	/**
	 * Expands the expandableSet
	 */
	ExpandableSet.prototype.expand = function () {
		var self = this;

		self.$nestedSet.stop().slideDown(function () {
			self.$toggler.text(closedText);
			self.state = 'expanded';
			$(this).addClass(openClass);
		})


	};


	/**
	 * Closes the expandableSet
	 */
	ExpandableSet.prototype.close = function () {
		var self = this;

		self.$nestedSet.stop().slideUp(function () {
			self.$toggler.text(openText);
			self.state = 'closed';
			$(this).removeClass(openClass);
		})
	};


	kv.extend({
		/**
		 * @todo Need to revisit how we handle the caching of objects on a form element's data attribute
		 * Currently kv.jqueryExtend does it for us, but we want it to also work when someone calls it via kv.form as well
		 *
		 * @param $targetForm
		 * @param options
		 * @return {KvForm}
		 */
		form: function ($targetForm, options) {
			var kvForm = $.data($targetForm[0], 'kv-form');

			if (kvForm) {
				return kvForm;
			}

			kvForm = new KvForm($targetForm, options);
			$.data($targetForm[0], 'kv-form', kvForm);

			return kvForm;
		}
	});

	$.fn.kvForm = kv.jqueryExtend('form');
}());


		// kv.form.settings() returns an object of settings
		// kv.form.settings('expandable', false);
		// kv.form.settings('validate', false);
		// kv.form.settings('h5Shim', false);

		// options.validate = {}

		// options.expandable = {}
/*

		$myForm.kvForm({
			dataType: ''
			, data: {}
			, beforeSerialize: {}
			, beforeSubmit: {}
			, clearForm: ''
			, error: ''
			, forceSync: ''
			, iframe: ''
			, iframeSrc: ''
			, iframeTarget: ''
			, replaceTarget: ''
			, resetForm: ''
			, semantic: ''
			, success: ''
			, target: ''
			, type: ''
			, uploadProgress: ''
			, url: ''
			, validation: {

			}
			, expandableSets: true
		});

		if ($myForm.data('kv-form').settings('validation') && kv.formValidation) {
			$myForm.kvValidate($myForm.data('kv-form').settings('validation'));
		}

		if ($myForm.data('kv-form').settings('expandable') && kv.formExpanableSets) {
			$myForm.kvExpandableSets();
		}

		// These should all be readonly properties, except maybe settings
		return {
			id: 82892
			, settings: options
			, elements: {}
			, groups: {}
		};

		// The validation and form objects get merged into one kvForm object when returned
		// Otherwise, it is possible to call kv.formValidation() directly and get a kv.formValidation object


		kv.form.enabled.expandable
		kv.form.enabled.validate

		kv.formExpandable
		kv.formValidate
	}


	// listen for validation request event
	kv.subscribe('form-ready', function () {
		if ($myForm.data('kv-form').settings('validation')) {

		}

	});
*/


/*

Use:

$(myForm).kvForm(settings);

OR:

kv.form('.myForm', settings);

settings: {
	enableExpand: boolean [true by default]
	,

}


You can pass kv.form a kv.validate instance or a plain js object

passed into kv.form:

{
	name:
}

Instance of kv.form:
{
	id: 829
	, validation: kvValidationObject
	, formEl: FORMElement <- I say no need for the regular html element?
	, $formEl: $FORMElement
	, elements: [
		{el: HTMLElement
			, $el: $HTMLElement
			, state: 'undefined', 'hasError', 'valid'
			, type: corresponds to an HTML5 type, can be manually set via js, or gets it from the html element
			, isRequired: true or false
			, value: ''
			, onErrorMsg: ''
			, onSuccessMsg: ''
			, helpMsg: ''
		}
	]
	, groups: {
		groupName: {
			groupEl: HTMLElement
			, $groupEl: $HTMLElement
		}
	}

}

Instance of kv.validate
{
	id: 3738
	, state: 'undefined', 'hasError', 'valid' , or 'submitFailed'
	, elements: [
		{
			state: 'undefined', 'hasError', 'valid'
			, onErrorMsg: ''
			, onSuccessMsg: ''
		}
	]
	, groups: [
		{

		}
	]
}
*/






