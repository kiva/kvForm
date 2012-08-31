/**
 * kv.form.nestedSet
 *
 * Module for closing/expanding form sets
 *
 * @todo for now only works with "fInline" forms, eventually should create a new form type
 * @todo make showNestedSet & hideNestedSet work as public functions
 *
 * @depends kv
 */
(function ($, kv) {
	'use strict';

	// Set some globals
	var openClass = 'open'
	, $nSets;


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
	function toggleNestedSet(options) {
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
	 * Initialization routine
	 */
	function initializeNestedSet () {
		$nSets = $('form.fInline .nSet');

		// Loop through and set up each "nested set".
		$nSets.each(function () {
			var $nestedSet = $(this).closest('.nSet')
			, $displayToggler = $('<a href="#" class="displayToggler">advanced</a>')
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
		});

		return {
			toggle: toggleNestedSet
		}
	}

	// Expose the initialization call directly on kv.NestedSet
	kv.NestedSet = initializeNestedSet;

}(jQuery, kv));