(function ($, kv, global, undefined) {
	'use strict';


	var id = 0;


	/**
	 * @todo Need to revisit how we handle the caching of objects on a form element's data attribute
	 * Currently kv.jqueryExtend does it for us, but we want it to also work when someone calls it via kv.Form as well
	 *
	 * @param $targetForm
	 * @param options
	 * @return {*}
	 * @constructor
	 */
	kv.Form = function ($targetForm, options) {
		$targetForm = $($targetForm).css('visibility', 'visible');

		var kvForm = $.data($targetForm[0], 'kv-form');

		if (kvForm) {
			return kvForm;
		}

		if (!(this instanceof kv.Form)) {
            return new kv.Form($targetForm, options);
        }

		options = options || {};

		this.$form = $targetForm;
		this.settings = options;
		this.attributes = {};
		this.formSetsCollection = [];
		this.formSetMap = {};
		this.submitStatus = 'notSubmitted'; // or 'submitted'

		this.initFormSets();

		/** @todo **/
		if (typeof kv.Form.prototype.form == 'function') {
			this.form();
		}

		/** @todo **/
		if (typeof kv.Form.prototype.validate == 'function') {
			this.validate();
		}

		/** @todo **/
		// Bind to validation events and update kv.Form accordingly

		this.id = id++;
		$.data($targetForm[0], 'kv-form', this);
	};


	kv.Form.prototype = {


		/**
		 * Initialize / process all the formSets in the form
		 *
		 * @sid - need help, I feel like this is a bad structure, but not sure if its worth putting a lot of effort into fixing
		 * Any good alternatives?  Mainly, the problem is that this logic is too dependent on the kv.FormSet module and how it opperates
		 */
		initFormSets: function () {
			var $fSets = $('.fSet, .fSetHead', this.$form)
			, self = this
			, formSetMap = {};

			if ($fSets.length && typeof kv.FormSet != 'function') {
				throw 'missing kv.FormSets';
			}

			// jQuery does depth-first traversal, by reversing the order we can ensure the child/leaf nodes get processed before the parent nodes
			$.each($fSets.get().reverse(), function (index, fSet) {
				var $fSet = $(fSet)
				, formSet = new kv.FormSet($fSet, this.settings)
				, formSetName = formSet.name();

				self.formSetsCollection[formSet._id] = formSet;

				// Add to the formSetMap, one name to many ids.
				if (formSetName) {
					if (formSetMap[formSetName]) {
						formSetMap[formSetName].push(formSet._id);
					} else {
						formSetMap[formSetName] = [formSet._id];
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


		/**
		 * @params {Object|String} props
		 * @params {String} val
		 * @returns {*}
		 */
		, attr: function (props, val) {
			var k;

			// Set many
			if (typeof props == 'object') {
				for (k in props) {
					this.attributes[k] = props[k];
				}

				return this;
			}

			// Set one
			else if (val !== undefined) {
				this.attributes[props] = val;

				return this;
			}

			// Get
			return this.attributes[props];
		}
	};


	// @todo - make kv.jqueryExtend() work with nested functions
	//$.fn.kvForm = kv.jqueryExtend('kv.Form');
}(jQuery, kv, this));


		// kv.Form.settings() returns an object of settings
		// kv.Form.settings('expandable', false);
		// kv.Form.settings('validate', false);
		// kv.Form.settings('h5Shim', false);

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

		if ($myForm.data('kv-form').settings('validation') && kv.FormValidation) {
			$myForm.kvValidate($myForm.data('kv-form').settings('validation'));
		}

		if ($myForm.data('kv-form').settings('expandable') && kv.FormExpanableSets) {
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
		// Otherwise, it is possible to call kv.FormValidation() directly and get a kv.FormValidation object


		kv.Form.enabled.expandable
		kv.Form.enabled.validate

		kv.FormExpandable
		kv.FormValidate
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

kv.Form('.myForm', settings);

settings: {
	enableExpand: boolean [true by default]
	,

}


You can pass kv.Form a kv.validate instance or a plain js object

passed into kv.Form:

{
	name:
}

Instance of kv.Form:
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

 var formMsgObj = kv.FormMsg('formName', Options);

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







