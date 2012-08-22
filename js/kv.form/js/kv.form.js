(function () {
	'use strict';


	// use this to wrap the inner (not including the first element)
	var $fSetInner = $('<div class="fSetInner" />')
	, $fSetToggler = $('<a href="#" class="fSetToggler">advanced</a>');


	/**
	 * Checks/unchecks all checkboxes that correspond to a given "fSetToggler"
	 *
	 * @param {jQuery} $fSetToggler
	 * @param {jQuery} $checkboxes
	 */
	function checkfSetToggler ($fSetToggler, $checkboxes) {
		var checkedCounter = 0;

		$checkboxes.each(function () {
			if (this.checked) {
				checkedCounter++;
			}
		});

		if (checkedCounter === 0) {
			$fSetToggler.prop('checked', false).change().removeClass('someChecked');
		} else if ($checkboxes.length === checkedCounter) {
			$fSetToggler.prop('checked', true).change().removeClass('someChecked');
		} else {
			$fSetToggler.prop('checked', true).change().addClass('someChecked');
		}
	}


	/**
	 * @param {jQuery} $nestedSet
	 * @param {jQuery} $nestedFields
	 * @param {jQuery} $displayToggler
	 */
	function showNestedSet ($nestedSet, $nestedFields, $displayToggler) {
		$nestedFields.stop().slideDown(function () {
			$displayToggler.text($displayToggler.text().replace('advanced', 'close'));
		});
		$nestedSet.addClass(openClass);
	}


	/**
	 * @param {jQuery} $nestedSet
	 * @param {jQuery} $nestedFields
	 * @param {jQuery} $displayToggler
	 */
	function hideNestedSet ($nestedSet, $nestedFields, $displayToggler) {
		$nestedFields.stop().slideUp(function () {
			$displayToggler.text($displayToggler.text().replace('close', 'advanced'));
		});
		$nestedSet.removeClass(openClass);
	}


	/**
	 *
	 * @param {Object} options - You MUST either pass the nestedSet or the targetSet property
	 * nestedSet
	 * targetSet
	 * displayToggler [optional]
	 */
	function toggleExpandableSet(options) {
		var $nestedSet
		, $targetSet
		, $nestedFields
		, $displayToggler;

		if (options.nestedSet) {
			$nestedSet = $(options.nestedSet);
			$nestedFields = $('> .nSetHead + *', $nestedSet);
		} else if (options.targetSet) {
			$targetSet = $(options.targetSet);
			$nestedFields = $targetSet.parent();
			$nestedSet = $nestedFields.closest('.nSet');
		}

		// Save a reference to the display toggler
		$displayToggler = options.displayToggler
			? $(options.displayToggler)
			: $('.displayToggler', $nestedSet);

		if ($nestedSet.hasClass(openClass)) {
			hideNestedSet($nestedSet, $nestedFields, $displayToggler);
		} else {
			showNestedSet($nestedSet, $nestedFields, $displayToggler);
		}
	}


	/**
	 * Set up each "expandable set"
	 *
	 * @param index
	 * @param el
	 */
	function setUpExpandableSet(index, el) {
		var $expandableSet = $(el);

		$fSetToggler.click(function (event) {
			event.preventDefault();

			toggleExpandableSet({$fSetToggler: $fSetToggler, $expandableSet: $expandableSet});
		});

		$('.fSetHead .fSetInner', $expandableSet).append($fSetToggler);
	}


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
		$expandableSets.each(setUpExpandableSet);

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
	 * @todo Need to revisit how we handle the caching of objects on a form element's data attribute
	 * Currently kv.jqueryExtend does it for us, but we want it to also work when someone calls it via kv.form as well
	 *
	 * @param $targetForm
	 * @param options
	 * @return {KvForm}
	 */
	function kvForm($targetForm, options) {
		var kvForm = $.data($targetForm[0], 'kv-form');

		if (kvForm) {
			return kvForm;
		}

		kvForm = new KvForm($targetForm, options);
		$.data($targetForm[0], 'kv-form', kvForm);

		return kvForm;
	}

	kv.extend({form: kvForm});
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






