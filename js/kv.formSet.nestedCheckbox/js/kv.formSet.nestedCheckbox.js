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
	kv.FormSet.prototype.nestedCheckbox = function () {
		var elementId = 'masterCheckbox_' + id++
		, $fSetHead = $('.fSetHead', this.$formSet)
		, $checkboxes = $('> .fSet >  .clickableSet > input[type="checkbox"]', this.$formSet)
		, $masterLabel = $('<label />').attr('for', elementId).text($fSetHead.text())
		, $masterCheckbox = $_masterCheckbox.clone().attr('id', elementId)

		// Make sure everything is structured the way we need it
		$.each({fSetHead: $fSetHead, checkboxes: $checkboxes, masterLabel: $masterLabel}, function (key, val) {
			if (val.length === 0) {
				throw 'missing ' + key;
			}
		});

		this.decorate('nestedCheckbox', {
			$masterCheckbox: $masterCheckbox
			, $checkboxes: $checkboxes
		});

		if ($checkboxes.length) {
			$checkboxes.change($.proxy(handleCheckboxChange, this));

			if ($masterCheckbox.length) {
				$masterCheckbox.click($.proxy(handleMasterCheckboxChange, this));
			}
		}

		$fSetHead
			.html($masterCheckbox)
			.append($('<div class="fSetInner" />').wrapInner($masterLabel));
	}

}(jQuery, kv));