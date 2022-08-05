'use strict';


import $ from "jquery";


export class SelectorInterface {


	constructor(htmlObj, configObj) {

		this._sourceHtmlObj = htmlObj;
		this._configObj = configObj;
		this._error = undefined;

		this._SELECTORS = this._selectorDefinitions();
		this._KEY_CODES = this._keyCodes();
	}


	createElement() {

		$(this._sourceHtmlObj).addClass(this._SELECTORS.sourceHidden);
	}


	updateElement() {


	}


	_selectorDefinitions() {

		return {

			sourceHidden: '.ui-selector-source-hidden',
			enable: '.ui-selector-enable',
			disable: '.ui-selector-disable',
			dropdownExpanded: '.ui-selector-dropdown-expanded',
			viewGrouped: '.ui-selector-view-grouped',
			viewExtended: '.ui-selector-view-extended',
			hasError: '.ui-selector-has-error'
		};
	}


	render() {

	}


	getError(code) {

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