(function () {
	'use strict';


	var $fSetInner = $('<div class="fSetInner" />')
	, id = 0;


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
		$targetForm = $($targetForm).css('visibility', 'visible');
		options = options || {};

		var $elements = $('input, select, textarea', $targetForm)
		, $fSetHead = $('.fSetHead', $targetForm)
		, $clickableElements = $('input[type="checkbox"], input[type="radio"]', $targetForm)
		, $requiredElements = $('[required]', $targetForm)
		, $sets = $('.fSet:not(.fSetHead)', $targetForm)
		, $expandableSets = $('.fSet.expandableSet', $targetForm)
		, $nestedCheckboxSets = $('.fSet.nestedCheckboxSet', $targetForm)
		, $clickableSets
		, formValidationObj;

		// Wrap inner elements
		$sets.each(innerWrap);

		// Set required fSet
		$requiredElements.closest('.fSet').addClass('required');

		// Set clickable fSet
		// @todo this is a bit sloppy in that it re-adds the "clickableSet" class on the same fSets
		$clickableSets = $clickableElements
			.closest('.fSet')
			.addClass('clickableSet');


		/**
		 * <div class="fSetHead">
		 *     <div class="fSetInner">
		 *         <div class="label">label</div>
		 *      </div>
		 * </div>
		 */
		$fSetHead.each(function () {
			var $this = $(this);
			$this.html($fSetInner.clone().html($('<div class="label" />').html($this.text())));
		});

		if (typeof kv.NestedCheckboxSet == 'function') {
			$nestedCheckboxSets.each(function () {
				new kv.NestedCheckboxSet(this);
			});
		}

		// Set expandable fSets
		// @todo this currently depends on kv.NestedCheckbox running first because fSetHead could exist without a fSetInner in the case of nestedCheckboxSets
		if (typeof kv.ExpandableSet == 'function') {
			$expandableSets.each(function () {
				new kv.ExpandableSet(this, options);
			});
		}

		if (typeof $.fn.ajaxForm == 'function') {
			$targetForm.ajaxForm(options);
		}

		if (typeof kv.Validation  == 'function' && options.validation) {
			formValidationObj = kv.Validation($targetForm, options.validation);

			if (formValidationObj) {
				// merge the object into the kvFormObject
			}
		}

		var $formElements = $('[name]', $elements);
		var formElements = [];
		var formElement;

		$formElements.each(function (index, el) {;
			formElements.push(
				formElement = {
					el: el
					, $el: $(el)
					, isValid: undefined /* true false or undefined */
				}
			);
		});


		// undefined, error, valid,

		return {
			id: id++
			, settings: options
			, form: $targetForm
			, isValid: undefined
			, submitStatus: 'notSubmitted' // 'notSubmitted, submitted
			, elements: formElements
			, errorMessageMap: {/*elementName: errorMessage */}
		};
	}

	/**
	 * @todo Need to revisit how we handle the caching of objects on a form element's data attribute
	 * Currently kv.jqueryExtend does it for us, but we want it to also work when someone calls it via kv.form as well
	 *
	 * @param $targetForm
	 * @param options
	 * @return {KvForm}
	 */
	kv.form = function ($targetForm, options) {
		var kvForm = $.data($targetForm[0], 'kv-form');

		if (kvForm) {
			return kvForm;
		}

		kvForm = new KvForm($targetForm, options);
		$.data($targetForm[0], 'kv-form', kvForm);

		return kvForm;
	}


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
			,
			, elements: {
				el: HTMLElement
				, $el: $HTMLElement
				, valid: boolean
			}
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
			, isRequired: true or false
			, value: ''
			, onErrorMsg: ''
			, onSuccessMsg: ''
			, helpMsg: ''
			, set: formSetObj
		}
	]
	, formSets: [
		{}
		, {}
		, {}
		, {}
		, {}
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


/**

 var formMsgObj = kv.formMsg('formName', Options);

 formMsgObj.show('formName', 'message');
 formMsgObj.show('formName', 'elementId' , 'message');

 formMsgObj.add()

 formMsgObj.hide

 this.msg('')
 this.msg('elementName', 'message');


this.showError('element', 'message');

 */

/***
 *

 var kvFormSetObj = kvFormObj.get('id');
 kvFormSetObj.check();
 kvFormSetObj.unCheck();

 kvFormSetObj.close();
 kvFormSetObj.expand();

 kvFormSetObj.checkMaster();
 kvFormSetObj.unCheckMaster();

 kvFormSetObj.showError('errorName');
 kvFormSetObj.showErrors(); // loops through and shows all errors
 kvFormSetObj.hideError('errorName');
 kvFormSetObj.hideErrors(); // loops through and hides all errors

 kvFormSetObj.validate();
 kvFormSetObj.validate();

 *
 */







