(function ($, kv) {


	var $_masterCheckbox = $('<input type="checkbox" class="masterCheckbox" />')
	, id = 0;


	function handleMasterCheckboxChange(event) {
		this.$checkboxes.prop('checked', event.target.checked).change();
	}

	function handleCheckboxChange(event) {
		var checkedCounter = 0;

		this.$checkboxes.each(function () {
			if (this.checked) {
				checkedCounter++;
			}
		});

		// None are checked
		if (checkedCounter === 0) {
			this.$masterCheckbox.prop('checked', false).change().removeClass('someChecked');
		}

		// All are checked
		else if (this.$checkboxes.length == checkedCounter) {
			this.$masterCheckbox.prop('checked', true).change().removeClass('someChecked');
		}

		// Some are checked
		else {
			this.$masterCheckbox.prop('checked', true).change().addClass('someChecked');
		}

		return false;
	}


	/**
	 *
	 * @param {jQuery} $nestedCheckboxSet
	 * @constructor
	 */
	function kv.formSet.nestedCheckbox(formSet) {
		var elementId = 'masterCheckbox_' + id++
		, $fSetHead = $('.fSetHead', $nestedCheckboxSet)
		, $checkboxes = $('> .fSet >  .clickableSet > input[type="checkbox"]', $nestedCheckboxSet)
		, $masterLabel = $('<label />').attr('for', elementId).text($fSetHead.text())
		, $masterCheckbox = $_masterCheckbox.clone().attr('id', elementId)

		formSet.$masterCheckbox = $masterCheckbox;
		formSet.$checkboxes = $checkboxes;

		if ($checkboxes.length) {
			$checkboxes.change($.proxy(handleCheckboxChange, formSet));

			if ($masterCheckbox.length) {
				$masterCheckbox.click($.proxy(handleMasterCheckboxChange, formSet));
			}
		}

		$fSetHead
			.html($masterCheckbox)
			.append($('<div class="fSetInner" />').wrapInner($masterLabel));

		id++;
	}


	kv.form.extend('nestedCheckboxSet');
}(jQuery, kv));