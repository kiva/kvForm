describe('kv.ExpandableSet', function () {

	var $form
	, expandableSet;


	beforeEach(function () {
		$form = $('<form class="kvForm fStack" style="display: block; "><div class="fSet"><div class="fSetHead">Select one of the following checkboxes</div><div class="fSet clickableSet"><input type="checkbox" id="checkbox4"><div class="fSetInner"><label for="checkbox4">Label for checkbox 4</label></div></div></div><div class="fSet"><div class="fSet fSetHead clickableSet"><input type="checkbox" class="massToggler"><div class="fSetInner"><label>Select one of the following checkboxes</label></div></div><div class="fSet clickableSet"><input type="checkbox"><div class="fSetInner"><label>LLLLabel for checkbox 1</label></div></div><div class="fSet clickableSet"><input type="checkbox"><div class="fSetInner"><label>Label for checkbox 2</label></div></div><div class="fSet clickableSet"><input type="checkbox"><div class="fSetInner"><label>Label for checkbox 3</label></div></div><div class="fSet clickableSet"><input type="checkbox"><div class="fSetInner"><label>Label for checkbox 4</label></div></div></div><div class="fSet fNSet"><div class="fSetHead">Header for an fSetHead</div><div class="fSet"><label>Some label</label><div class="fSetInner"><input type="text"><input type="text"></div></div></div><div class="fSet fNSet"><div class="fSet fSetHead clickableSet"><input type="checkbox" class="massToggler"><div class="fSetInner"><label>Header for an fSetHead + fSet</label></div><div class="fSetMsg"><div>Testing message in the header</div></div></div><div class="fSet fSliced"><div class="fSet clickableSet"><input type="checkbox" id="checkbox6"><div class="fSetInner"><label for="checkbox6">Label for checkbox 6</label><select><option>Select box</option></select><input type="text"><input type="text"></div><div class="fSetMsg"><div>Message for a checkbox item 1</div><div>Message for a checkbox item 2</div><div>Message for a checkbox item 3</div></div></div><div class="fSet clickableSet"><input type="checkbox" id="checkbox7"><div class="fSetInner"><label for="checkbox7">Label for checkbox 7</label></div></div><div class="fSet clickableSet"><input type="checkbox" id="checkbox8"><div class="fSetInner"><label for="checkbox8">Label for checkbox 8</label></div></div><div class="fSet expandableSet"><div class="fSet fSetHead clickableSet"><input type="checkbox" id="checkbox9"><div class="fSetInner"><label for="checkbox9">Label for checkbox 9</label><a href="#" class="fSetToggler">advanced</a></div></div><div class="fSet"><div class="fSet clickableSet"><input type="checkbox" id="nestedCheckbox1"><div class="fSetInner"><label for="checkbox1">Label for nestedCheckbox 1</label></div></div><div class="fSet clickableSet"><input type="checkbox" id="nestedCheckbox2"><div class="fSetInner"><label for="checkbox2">Label for nestedCheckbox 2</label></div></div><div class="fSet clickableSet"><input type="checkbox" id="nestedCheckbox3"><div class="fSetInner"><label for="checkbox3">Label for nestedCheckbox 3</label></div></div><div class="fSet clickableSet"><input type="checkbox" id="nestedCheckbox4"><div class="fSetInner"><label for="checkbox4">Label for nestedCheckbox 4</label></div><div class="fSetMsg"><div>Message for a checkbox item 1</div><div>Message for a checkbox item 2</div></div></div></div></div></div></div><div class="fSet fSliced"><div class="fSet clickableSet"><input type="radio" name="a"><div class="fSetInner"><label>Label for radio 1</label></div><div class="fSetMsg"><div>testing testing</div></div></div><div class="fSet clickableSet"><input type="checkbox"><div class="fSetInner"><label>Label for nestedCheckbox 4</label></div><div class="fSetMsg"><div>Message for a checkbox item 1</div><div>Message for a checkbox item 2</div></div></div><div class="fSet clickableSet"><input type="radio" name="a"><div class="fSetInner"><label>Label for radio 2</label></div></div><div class="fSet clickableSet"><input type="radio" name="a"><div class="fSetInner"><label>Label for radio 3</label></div></div></div><div class="fSet fSetGroup"><div class="fSetHead">Grouped inputs</div><div class="fSet"><label>first name</label><div class="fSetInner"><input type="text"></div></div><div class="fSet"><label>last name</label><div class="fSetInner"><input type="text"></div></div></div><div class="fSet fSetGroup"><div class="fSetHead">Grouped inputs</div><div class="fSet"><label>first name</label><div class="fSetInner"><input type="text"></div></div><div class="fSet"><label>last name</label><div class="fSetInner"><input type="text"></div></div><div class="fSetMsg"><div>This is my group message</div><div>This is my group message</div><div>This is my group message</div></div></div><div class="fSet"><input type="submit" value="click me"></div></form>').appendTo('body');

		expandableSet = new kv.FormSet($('.expandableSet', $form).first());
	});


	afterEach(function () {
		$form.remove();
	});


	it('by default, remains closed on load', function () {
		expect(expandableSet.state).toBe('closed');
	});


	it('can expand on load', function () {
		expandableSet = new kv.FormSet($('.expandableSet', $form).first(), {expandOnLoad: true});
		expect(expandableSet.state).toBe('expanded');
	});


	it('can expand', function () {
		expandableSet.expand();
		expect(expandableSet.state).toBe('expanded');
	});


	it('can close', function () {
		expandableSet.close();
		expect(expandableSet.state).toBe('closed');
	});


	it('expands and closes on click', function () {
		expandableSet.$toggler.trigger('click');
		expect(expandableSet.$toggler.text()).toBe(expandableSet.settings.expandedText);
		expect(expandableSet.state).toBe('expanded');
		expect(expandableSet.$nestedSet.hasClass(expandableSet.settings.openClass)).toBe(true);

		expandableSet.$toggler.trigger('click');

		// Wait for the animation to complete
		waits(1000);

		runs(function () {
			expect(expandableSet.$toggler.text()).toBe(expandableSet.settings.closedText);
			expect(expandableSet.state).toBe('closed');
			expect(expandableSet.$nestedSet.hasClass(expandableSet.settings.openClass)).toBe(false);
		});
	});
});