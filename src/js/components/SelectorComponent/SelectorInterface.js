'use strict';


import $ from "jquery";


export class SelectorInterface {


	constructor(htmlObj) {

		this._$sourceHtmlObj = htmlObj;
		this._error = undefined;

		this._SELECTORS = this._selectorClasses();
		this._KEY_CODES = this._keyCodes();
	}


	createElement() {

		$(this._$sourceHtmlObj).addClass(this._SELECTORS.SOURCE_HIDDEN);
	}


	update() {


	}


	render() {


	}


	getError(code) {


	}


	_selectorClasses() {

		return {

			// General
			SOURCE_HIDDEN: '.ui-selector-source-hidden',

			// Config
			ENABLE: '.ui-selector-enable',
			DISABLE: '.ui-selector-disable',
			DROPDOWN_EXPANDED: '.ui-selector-dropdown-expanded',
			VIEW_GROUPED: '.ui-selector-view-grouped',
			VIEW_EXTENDED: '.ui-selector-view-extended',

			// State
			HAS_ERROR: '.ui-selector-has-error'
		};
	}


	_keyCodes() {

		return {
			BACKSPACE: 8,
			TAB: 9,
			ENTER: 13,
			SHIFT: 16,
			CTRL: 17,
			ALT: 18,
			ESC: 27,
			SPACE: 32,
			PAGE_UP: 33,
			PAGE_DOWN: 34,
			END: 35,
			HOME: 36,
			LEFT: 37,
			UP: 38,
			RIGHT: 39,
			DOWN: 40,
			DELETE: 46
		};
	}
}