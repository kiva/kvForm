// use this to wrap the inner (not including the first element)
var $fSetInner = $('<div class="fSetInner" />');



$('.kvForm').css('display', 'block');

$('input[type="checkbox"], input[type="radio"]').parent('.fSet').addClass('fCSet')

// Set required class
$('input[required]').parent('.fSet').addClass('required');


/**

 get all non-first child elements of an fSet that are either:
 label
 input


**/

/**
 * Wraps all non-first child elements of an fSet with an .fSetInner so long as they are an:
 * select
 * input
 * textarea
 * label
 */
$('.fSet').each(function () {
	var $children = $(this).children('select, input, textarea, label')
	, $firstEl = $children.first()
	, $wrapMe = $children.not($firstEl)
	, $wrapper;

	if ($wrapMe.length > 0) {
		$wrapMe.remove();
		$wrapper = $wrapMe.wrapAll($fSetInner).parent();

		$firstEl.after($wrapper);
	}
});