





(function () {
	'use strict';

	// use this to wrap the inner (not including the first element)
	var $fSetInner = $('<div class="fSetInner" />')
	, _ajaxForm = $.fn.ajaxForm;

	delete $.fn.ajaxForm;


	/**
	 * Checks/unchecks all checkboxes that correspond to a given "massToggler"
	 *
	 * @param {jQuery} $massToggler
	 * @param {jQuery} $checkboxes
	 */
	function checkMassToggler ($massToggler, $checkboxes) {
		var checkedCounter = 0;

		$checkboxes.each(function () {
			if (this.checked) {
				checkedCounter++;
			}
		});

		if (checkedCounter === 0) {
			$massToggler.prop('checked', false).change().removeClass('someChecked');
		} else if ($checkboxes.length === checkedCounter) {
			$massToggler.prop('checked', true).change().removeClass('someChecked');
		} else {
			$massToggler.prop('checked', true).change().addClass('someChecked');
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

	// Loop through and set up each "expandable set".
	function setUpExpandableSet(index, el) {
		var $displayToggler = $('<a href="#" class="displayToggler">advanced</a>')
		, $massToggler = $('.massToggler', this).first()
		, $checkboxes = $('> ul li input[type="checkbox"]', this);

		// Set up the display toggler
		$displayToggler.click(function (e) {
			e.preventDefault();

			toggleNestedSet({displayToggler: $displayToggler, nestedSet: $nestedSet});
		});

		// Set up the mass toggler, check or uncheck all related checkboxes
		if ($checkboxes.length) {
			$massToggler.click(function () {
				$checkboxes.prop('checked', this.checked).change();
			});
		}

		// Add the "displayToggler" to the DOM
		$('> .nSetHead label', this).after($displayToggler);

		$checkboxes.change(function () {
			checkMassToggler($massToggler, $checkboxes);
		});

		checkMassToggler($massToggler, $checkboxes);
	}


	// Wraps all non-first select, input, textarea, and label child elements of an fSet with an .fSetInner
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
			_ajaxForm.call($targetForm, options);
		}

		if (typeof kv.formValidation  == 'function' && options.validate) {
			formValidationObj = kv.formValidation(options.validation);

			if (formValidationObj) {
				// merge the object into the kvFormObject
			}
		}

		return {
			settings: options
		}
	}


	function kvForm($targetForm, options) {
		var kvForm = $.data($targetForm[0], 'kv-form');

		if (kvForm) {
			return kvForm;
		}

		return new KvForm($targetForm, options)
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






