(function () {
	'use strict';


	var $fSetInner = $('<div class="fSetInner" />')
	, id = 0;


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

		this.$form = $targetForm;
		this.settings = options;
		this.attributes = {};
		this.formSetsCollection = [];
		this.formSetMap = {};
		this.submitStatus = 'notSubmitted'; // or 'submitted'

		this.initFormSets();

		/** @todo **/
		if (typeof kv.form.prototype.form == 'function') {
			this.form();
		}

		/** @todo **/
		if (typeof kv.form.prototype.validate == 'function') {
			this.validate();
		}

		this.id = id++;
	}

	KvForm.prototype = {


		/**
		 * Initialize / process all the formSets in the form
		 */
		initFormSets: function () {
			var $fSets = $('.fSet, .fSetHead', this.$form)
			, self = this
			, formSetMap = {};

			// jQuery does depth-first traversal, by reversing the order we can ensure the child/leaf nodes get processed before the parent nodes
			$.each($fSets.get().reverse(), function (index, fSet) {
				var $fSet = $(fSet)
				, $controlElement = $('> input, > textarea', $fSet).first()
				, formSet = new kv.FormSet($fSet, $controlElement, this.settings)
				, formSetName = formSet.$controlElement.attr('name');

				self.formSetsCollection[formSet.id] = formSet;

				// Add to the formSetMap, one name to many ids.
				if (formSetName) {
					if (formSetMap[formSetName]) {
						formSetMap[formSetName].push(formSet.id);
					} else {
						formSetMap[formSetName] = [formSet.id];
					}
				}
			});

			this.formSetMap = formSetMap;
		}


		/**
		 * Returns an array of formSets
		 *
		 * @param {Array|String} names
		 * @return {Array}
		 */
		, formSets: function (names) {
			var formSets = []
			, formSetIds = []
			, i = 0;

			if (typeof names == 'string') {
				names = [names];
			}

			if ($.isArray(names)) {
				// Get all the ids that correspond to the given names
				for (i; i < names.length; i++) {
					formSetIds = formSetIds.concat(this.formSetMap[names[i]]);
				}

				// Get all the formSets that match the ids
				for (i = 0; i < formSetIds.length; i++) {
					if (this.formSetsCollection[formSetIds[i]]) {
						formSets.push(this.formSetsCollection[formSetIds[i]])
					}
				}
			}

			return formSets;
		}

		, attr: function (props, val) {
			var k;

			if (props instanceof jQuery) {
				return props.attr(val);
			}

			if (typeof props == 'object') {
				for (k in props) {
					this.attributes[k] = props[k];
				}

				return this;
			}

			if (typeof val != 'object' && val !== undefined) {
				this.attributes[props] = val;

				return this;
			}

			return this.attributes[props];
		}
	};


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
	};


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







