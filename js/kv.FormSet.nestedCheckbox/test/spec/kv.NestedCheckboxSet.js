describe('kv.NestedCheckboxSet', function () {

	var $form
	, nestedCheckboxSet;


	beforeEach(function () {
		$form = $(' <form class="kvForm fStack"><div class="demoGroup"><header><h1>Demo group 1</h1></header><div class="demoItem"><div class="fSet"><label>Label #1</label><input type="text" /></div></div></div><div class="demoGroup"><header><h1>Demo group 2</h1></header><div class="demoItem"><div class="fSet"><label>Label #1</label><input type="text"></div><div class="fSet"><label>Label #2</label><input type="text"></div><div class="fSet"><label>Label #3</label><input type="text"></div></div></div><div class="demoGroup"><header><h1>Demo group 3</h1></header><div class="demoItem"><div class="fSet"><input type="checkbox"><label>Label #1</label></div><div class="fSet"><input type="checkbox"><label>Label #2</label></div><div class="fSet"><input type="checkbox"><label>Label #3</label></div></div></div><div class="demoGroup"><header><h2>Demo group 4</h2><h3>expandable sets</h3></header><div class="demoItem"><div class="fSet expandableSet"><div class="fSet fSetHead">Label #1</div><div class="fSet"><div class="fSet"><input type="checkbox"><label>Label #1</label></div><div class="fSet"><input type="checkbox"><label>Label #2</label></div><div class="fSet"><input type="checkbox"><label>Label #3</label></div></div></div></div></div><div class="demoGroup"><header><h2>Demo group 5</h2><h3>Nested Checkbox Set</h3></header><div class="demoItem"><div class="fSet nestedCheckboxSet"><div class="fSet fSetHead">Label #1</div><div class="fSet"><div class="fSet"><input type="checkbox"><label>Label #1</label></div><div class="fSet"><input type="checkbox"><label>Label #2</label></div><div class="fSet"><input type="checkbox"><label>Label #3</label></div></div></div></div></div><div class="demoGroup"><header><h2>Demo group 6</h2><h3>Nested Checkbox Set & Expandable Set</h3></header><div class="demoItem"><div class="fSet nestedCheckboxSet expandableSet"><div class="fSet fSetHead">Label #1</div><div class="fSet"><div class="fSet"><input type="checkbox"><label>Label #1</label></div><div class="fSet"><input type="checkbox"><label>Label #2</label></div><div class="fSet"><input type="checkbox"><label>Label #3</label></div></div></div></div></div></form>').appendTo('body');

		nestedCheckboxSet = new kv.NestedCheckboxSet($('.NestedCheckboxSet', $form).first());
	});


	afterEach(function () {
		$form.remove();
	});


	it('Updates the master checkbox when a child checkbox is clicked', function () {

	});
});