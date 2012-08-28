(function ($, kv) {


	var $_masterCheckbox = $('<input type="checkbox" class="masterCheckbox" />');


	function handleMasterCheckboxChange(event) {
		this.$clickableElements.prop('checked', event.target.checked).change();
	}

	function handleClickableElementChange(event) {
		var checkedCounter = 0;

		this.$clickableElements.each(function () {
			if (this.checked) {
				checkedCounter++;
			}
		});

		// None are checked
		if (checkedCounter === 0) {
			this.$masterCheckbox.prop('checked', false).change().removeClass('someChecked');
		}

		// All are checked
		else if (this.$clickableElements.length == checkedCounter) {
			this.$masterCheckbox.prop('checked', true).change().removeClass('someChecked');
		}

		// Some are checked
		else {
			this.$masterCheckbox.prop('checked', true).change().addClass('someChecked');
		}
	}

	function NestedCheckbox($fSet) {
		var $clickableElements = $('input[type="checkbox"], input[type="radio"]', $clickableSet)
		, $masterCheckbox = $_masterCheckbox.prependTo($('.expandableSet .fSetHead', $clickableSet));

		if ($clickableElements.length) {
			$clickableElements.change($.proxy(handleClickableElementChange, this));

			if ($masterCheckbox.length) {
				$masterCheckbox.change(handleMasterCheckboxChange);
			}
		}

		this.$masterCheckbox = $masterCheckbox;
		this.$clickableElements = $clickableElements;
	}


	kv.extend({ClickableSet: ClickableSet});

}(jQuery, kv));