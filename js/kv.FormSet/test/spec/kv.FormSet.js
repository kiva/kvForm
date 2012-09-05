describe(function () {

	it('sets the class, "required", on all .fSet parents of a required form element', function () {
		var $parentFSet = $('[required]', $form).closest('.fSet');

		$parentFSet.each(function () {
			expect($(this).hasClass('required')).toBe(true);
		});
	});


	it('sets the class, "fCSet" on all .fSet parents of a checkbox or radio form element', function () {
		var $parentFSet = $('[type="radio"], [type="checkbox"]', $form).closest('.fSet');

		expect($parentFSet.hasClass('clickableSet')).toBe(true);
	});

});