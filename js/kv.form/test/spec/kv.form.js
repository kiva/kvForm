describe('kv.Form', function() {
	'use strict';

	var $form
	, formOptions = {eenie: 'meenie'};


	beforeEach(function () {
		$form = $(' <form class="kvForm fStack"><div class="fSet"><label>I1</label><input type="text" required/></div><div class="fSet valid"><label>I2</label><input type="text" /></div><div class="fSet"><label>I3</label><input type="text" /></div><div class="fSet"><div class="fSet"><label>Input 1</label><input type="text" /></div><div class="fSet"><label>Input 1</label><input type="text" /></div><div class="fSet"><label>Input 2</label><input type="text" /><div class="fSetMsg"><div>This message is for testing</div></div></div><div class="fSet"><label>Input 2</label><input type="text" /><div class="fSetMsg"><div>This message only shows when either js fails/is disabled or wrapped via js with a .fControl element</div></div></div></div><div class="fSet"><div class="fSetHead">Select one of the following checkboxes</div><div class="fSet"><input type="checkbox" id="checkbox1" /><label for="checkbox1">Label for checkbox 1</label></div><div class="fSet"><input type="checkbox" id="checkbox2" /><label for="checkbox2">Label for checkbox 2</label></div><div class="fSet"><input type="checkbox" id="checkbox3" /><label for="checkbox3">Label for checkbox 3</label></div><div class="fSet"><input type="checkbox" id="checkbox4" /><label for="checkbox4">Label for checkbox 4</label></div></div><div class="fSet"><div class="fSet fSetHead"><input type="checkbox" class="massToggler" /><label>Select one of the following checkboxes</label></div><div class="fSet"><input type="checkbox"/><label>LLLLabel for checkbox 1</label></div><div class="fSet"><input type="checkbox"/><label>Label for checkbox 2</label></div><div class="fSet"><input type="checkbox"/><label>Label for checkbox 3</label></div><div class="fSet"><input type="checkbox"/><label>Label for checkbox 4</label></div></div><div class="fSet fNSet"><div class="fSetHead">Header for an fSetHead</div><div class="fSet"><label>Some label</label><input type="text" /><input type="text" /></div></div><div class="fSet fNSet"><div class="fSet fSetHead"><input type="checkbox" class="massToggler" /><label>Header for an fSetHead + fSet</label><div class="fSetMsg"><div>Testing message in the header</div></div></div><div class="fSet fSliced"><div class="fSet"><input type="checkbox" id="checkbox6" /><label for="checkbox6">Label for checkbox 6</label><select><option>Select box</option></select><input type="text" /><input type="text" /><div class="fSetMsg"><div>Message for a checkbox item 1</div><div>Message for a checkbox item 2</div><div>Message for a checkbox item 3</div></div></div><div class="fSet"><input type="checkbox" id="checkbox7" /><label for="checkbox7">Label for checkbox 7</label></div><div class="fSet"><input type="checkbox" id="checkbox8" /><label for="checkbox8">Label for checkbox 8</label></div><div class="fSet"><div class="fSet"><input type="checkbox" id="checkbox9" /><label for="checkbox9">Label for checkbox 9</label></div><div class="fSet"><div class="fSet"><input type="checkbox" id="nestedCheckbox1" /><label for="checkbox1">Label for nestedCheckbox 1</label></div><div class="fSet"><input type="checkbox" id="nestedCheckbox2" /><label for="checkbox2">Label for nestedCheckbox 2</label></div><div class="fSet"><input type="checkbox" id="nestedCheckbox3" /><label for="checkbox3">Label for nestedCheckbox 3</label></div><div class="fSet"><input type="checkbox" id="nestedCheckbox4" /><label for="checkbox4">Label for nestedCheckbox 4</label><div class="fSetMsg"><div>Message for a checkbox item 1</div><div>Message for a checkbox item 2</div></div></div></div></div></div></div><div class="fSet fSliced"><div class="fSet"><input type="radio" name="a" /><label>Label for radio 1</label><div class="fSetMsg"><div>testing testing</div></div></div><div class="fSet"><input type="checkbox" /><label>Label for nestedCheckbox 4</label><div class="fSetMsg"><div>Message for a checkbox item 1</div><div>Message for a checkbox item 2</div></div></div><div class="fSet"><input type="radio" name="a" /><label>Label for radio 2</label></div><div class="fSet"><input type="radio" name="a" /><label>Label for radio 3</label></div></div><div class="fSet fSetGroup"><div class="fSetHead">Grouped inputs</div><div class="fSet"><label>first name</label><input type="text"></div><div class="fSet"><label>last name</label><input type="text"></div></div><div class="fSet fSetGroup"><div class="fSetHead">Grouped inputs</div><div class="fSet"><label>first name</label><input type="text"></div><div class="fSet"><label>last name</label><input type="text"></div><div class="fSetMsg"><div>This is my group message</div><div>This is my group message</div><div>This is my group message</div></div></div></form>').appendTo('body');
		kv.Form($form, formOptions);
	});


	afterEach(function () {
		$form.remove();
	});


	it('extends the kv object with the "form" method', function () {
		expect(typeof kv.Form).toBe('function');
	});


	xit('extends the jquery prototype with the "kvForm" method', function () {
		expect(typeof $.fn.kvForm).toBe('function');
	});


	it('caches an kv.Form object', function () {
		var myOptions = {opt1: 'uno', opt2: 'dos'}
		, kvFormObj = kv.Form($form, myOptions);

		expect(kvFormObj.settings).toEqual(formOptions);
	});


	xit('internally calls jquery.form\'s .ajaxForm method if it exists', function () {
		var $myForm  = $(' <form class="kvForm fStack"></div>')
		, myOptions = {var1: 'uno', var2: 'dos'};

		// Make sure it doesn't barf when $.fn.ajaxForm does not exist
		expect(function () {
			kv.Form($myForm, myOptions);
		}).not.toThrow();

		// Reset to circumvent caching
		$.removeData($myForm[0], 'kv-form');

		// Make sure it gets called when it does exist
		$.fn.ajaxForm = jasmine.createSpy('ajaxForm');
		kv.Form($myForm, myOptions);
		expect($.fn.ajaxForm).toHaveBeenCalledWith(myOptions);
	});


	xit('internally calls kv.FormValidation if it exists', function () {
		var $myForm  = $(' <form class="kvForm fStack"></div>')
		, myValidationOptions = {someValidationSetting: true}
		, myOptions = {var1: 'uno', var2: 'dos', validation: myValidationOptions};

		// Make sure it doesn't barf when kv.FormValidation does not exist
		expect(function () {
			kv.Form($myForm, myOptions);
		}).not.toThrow();

		// Reset to circumvent caching
		$.removeData($myForm[0], 'kv-form');

		// Make sure it gets called when it does exist
		kv.FormValidation = jasmine.createSpy('formValidation');
		kv.Form($myForm, myOptions);
		expect(kv.FormValidation).toHaveBeenCalledWith(myValidationOptions);
	});

});