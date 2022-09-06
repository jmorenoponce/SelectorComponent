'use strict';


// import {UserInterfaceTpl} from "./UserInterfaceTpl.html";


export class Selector_UI {


	static _CSS_UX_CLASSES = {

		NATIVE_FIELD: 'ux-selector-native-field',

		INPUT_CNT: 'ux-selector-input',
			INPUT_FIELD: 'ux-selector-input-field',
			INPUT_SELECTIONS: 'ux-selector-selections-list',

		DROPDOWN_CNT: 'ux-selector-dropdown',
			DROPDOWN_TRIGGER: 'ux-selector-dropdown-trigger',

			DROPDOWN_SEARCH_FIELD: 'ux-selector-search-field',

			DROPDOWN_VIEW_UNGROUPED: 'ux-selector-view-ungrouped',
			DROPDOWN_VIEW_GROUPED: 'ux-selector-view-grouped',
			DROPDOWN_VIEW_EXPANDED: 'ux-selector-view-expanded',

			DROPDOWN_RESULTS_SELECTED_CNT: 'ux-selector-results-selected',
			DROPDOWN_RESULTS_CNT: 'ux-selector-results',

			DROPDOWN_RESULT_ITEM: 'ux-selector-result-item',
			DROPDOWN_RESULT_GROUP: 'ux-selector-group-item'
	}


	static _CSS_UI_CLASSES = {

		// General
		SOURCE_OBJECT_HIDDEN: '.ui-selector-source-hidden',

		// Actions
		ENABLE: '.ui-selector-enable',
		DISABLE: '.ui-selector-disable',
		DROPDOWN_EXPANDED: '.ui-selector-dropdown-expanded',
		VIEW_GROUPED: '.ui-selector-view-grouped',
		VIEW_EXTENDED: '.ui-selector-view-extended',

		// States
		IS_LOADING: '.ui-selector-loading',
		HAS_ERROR: '.ui-selector-has-error'
	}


	static _KEY_CODES = {

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
	}


	constructor(config) {

		this._$native_cmp = {};
		this._config_obj = config;

		this._is_binded = false;
		this._is_grupable = false;
		this._is_extendable = false;
	}


	/**
	 * Establishes source native Html select that handle final results.
	 * @param source_cmp
	 * @returns {boolean}
	 */
	set_native_component(source_cmp) {

		let $source_cmp = $(source_cmp);
		if (!$source_cmp.length > 0) {
			return false;
		}

		this._$native_cmp = $source_cmp;
		this._is_binded = true;

		return true;
	}


	_render() {

		console.log('Component Painted');
	}


	_get_native_name() {

		return this._$native_cmp.attr('data-selector-name');
	}


	get_native_name() {

		return this._get_native_name();
	}


	_get_native_value() {

		return this._$native_cmp.html();
	}


	get_native_value() {

		return this._get_native_value();
	}


	/**
	 * Updates native select value
	 */
	_update_native_value() {

		let _opts = '';

		let _prev_value = this._$native_cmp.html();

		for (id of this._selectedIds) {
			_opts += '<option value="' + id + '" selected="selected"></option>';
		}

		this._$native_cmp.html(_opts);

		// Fire native select on change event
		if (_opts !== _prev_value) {
			this._$native_cmp.trigger('change');
		}
	}


	update() {


	}


	enable() {

		console.log('enable');
	}


	disable() {

		console.log('disable');
	}
}