var kv = kv || {};

/**
 * kv gets set in view.tpl
 *
 *
 * @namespace kv
 */
(function ($, kv, global, undefined) {
	'use strict';


	/**
	 * Implements 'fn', however, falls back to 'fallback' if it does not exist.
	 * This is here to allow unit tests to force the fallback even when 'fn' exists.
	 *
	 * @param fn
	 * @param fallback
	 * @return function
	 */
	function provideFallback(fn, fallback) {
		if (typeof fn == 'function' && !kv.testing) {
			return fn;
		}

		return fallback;
	}


	/**
	 * Extend the kv object with properties and/or methods
	 *
	 * @param {Object} obj
	 * @return {Object}
	 */
	function extend(obj) {
		return $.extend(kv, obj);
	}


	/**
	 * Generic jQuery method for extending the jQuery prototype with a kv method.
	 *
	 * @todo allow for > 1 parameter to be passed into the kv method
	 *
	 * @param {String} methodName
	 * @param {Object} [settings]
	 * @param {Object} [settings.defaults] Are the default options
	 * @param {String} [settings.defaultOption] Allows a user to pass a single string option by providing the name of that option
	 * @returns {undefined}
	 */
	function jqueryExtend(methodName, settings) {
		var method
		, methodNameArr = methodName.split('.');

		method = kv[methodName];

		if (!method) {
			throw 'You must provide a valid method name';
		}

		// Ruturn the function that will be the method on the jQuery object.
		return function (options) {
			var opts = {};

			// Configure our options
			// As a convenience, allow a string or jQuery or HTML element to be passed as an option.
			if ((settings && settings.defaultOption) && (typeof options == 'string' || (options instanceof jQuery) || (options.nodeType))) {
				opts[settings.defaultOption] = options;
			} else if (settings && settings.defaults) {
				$.extend(opts, settings.defaults, options)
			} else {
				opts = options;
			}

			// Operate on each element in the set and return a jQuery object, thus allowing chaining
			return this.each(function() {
				var $this = $(this)
				, methodObj;

				// Calls the method
				methodObj = method.call(kv, $this, opts);

				// Store a reference to the method's object on the element itself.
				$this.data('kv-' + methodNameArr.join('-') , methodObj);
			});
		}
	}


	extend({
		provideFallback: provideFallback
		, extend: extend
		, jqueryExtend: jqueryExtend
	});

}(jQuery, kv, this));