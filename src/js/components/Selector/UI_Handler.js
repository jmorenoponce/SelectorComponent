'use strict';


import {UI_Template_Handler} from "./UI_Template_Handler";


export class UI_Handler {


	static ux_classes = {

		NATIVE_FIELD: '.ux-selector-native-field',

		SELECTOR_CNT: '.ux-selector-cnt',

		INPUT_CNT: '.ux-selector-input',
			INPUT_FIELD: '.ux-selector-input-field',
			SELECTIONS_WIDGET: '.ux-selector-selections-list',

		DROPDOWN_CNT: '.ux-selector-dropdown',
		DROPDOWN_TRIGGER: '.ux-selector-dropdown-trigger',

		DROPDOWN_TOOLS: '.ux-selector-tools-cnt',
			SEARCH_FIELD: '.ux-selector-search-field',

			VIEW_UNGROUPED: '.ux-selector-view-ungrouped',
			VIEW_GROUPED: '.ux-selector-view-grouped',
			VIEW_EXPANDED: '.ux-selector-view-expanded',

		RESULTS_SELECTED_CNT: '.ux-selector-results-selected',
		RESULTS_CNT: '.ux-selector-results',

		RESULT_ITEM: '.ux-selector-result-item',
		RESULT_GROUP: '.ux-selector-group-item'
	}


	static ui_classes = {

		ENABLE: '.ui-selector-enable',
		DISABLE: '.ui-selector-disable',
		DROPDOWN_EXPANDED: '.ui-selector-dropdown-expanded',
		VIEW_GROUPED: '.ui-selector-view-grouped',
		VIEW_EXTENDED: '.ui-selector-view-extended',

		IS_LOADING: '.ui-selector-loading',
		HAS_ERROR: '.ui-selector-has-error'
	}


	static attributes = {}


	constructor() {

		this._tpl_handler = new UI_Template_Handler(this.init);

		this._config_obj = {};
		this._$native_cmp = {};

		this._is_binded = false;

		this._is_grupable = false;
		this._is_extendable = false;

		this._selected_ids = [];
	}


	init() {

		console.log('Render temporal con un estado de Loading...');
		// this._render('loading');
	}


	/**
	 * Establishes source native Html select that handle final results
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


	/**
	 *
	 * @param params
	 */
	set_config(params) {

		this._config_obj = Object.assign(params);
	}


	render() {

		this._render();
	}


	render_ungrouped() {

		this._render();
	}


	render_grouped() {

		this._render();
	}


	enable() {

		console.log('enable');
	}


	disable() {

		console.log('disable');
	}


	get_native_name() {

		return this._get_native_name();
	}


	get_native_value() {

		return this._get_native_value();
	}


	_render(state, data) {

		console.log(this._tpl_handler.get_tpl_instructor())

		const tmpMain = this._tpl_handler.get_tpl_partial('cmp-selector__main');

		const tmpInputCnt = this._tpl_handler.get_tpl_partial('cmp-selector__input-cnt');
		const tmpInputField = this._tpl_handler.get_tpl_partial('generics__input-field');
		const tmpBadge = this._tpl_handler.get_tpl_partial('generics__badge');

		const tmpDropdownCnt = this._tpl_handler.get_tpl_partial('cmp-selector__dropdown-cnt');
		const tmpTools = this._tpl_handler.get_tpl_partial('cmp-selector__tools-cnt');
		const tmpSearch = this._tpl_handler.get_tpl_partial('cmp-selector__tools__search-filter');
		const tmpModes = this._tpl_handler.get_tpl_partial('cmp-selector__tools__view-mode')

		const tmpResults = this._tpl_handler.get_tpl_partial('cmp-selector__results-cnt');

		$(this._$native_cmp).after(tmpMain);

		$(UI_Handler.ux_classes.SELECTOR_CNT + '> .inner').append(tmpInputCnt);
		$(UI_Handler.ux_classes.SELECTOR_CNT + '> .inner').append(tmpDropdownCnt);

		$(UI_Handler.ux_classes.INPUT_CNT + '> .inner').append(tmpInputField);
		$(UI_Handler.ux_classes.INPUT_CNT + '> .inner').append(tmpBadge);

		$(UI_Handler.ux_classes.DROPDOWN_CNT + '> .inner').append(tmpTools);
		$(UI_Handler.ux_classes.DROPDOWN_CNT + '> .inner').append(tmpSearch);
		$(UI_Handler.ux_classes.DROPDOWN_CNT + '> .inner').append(tmpModes);
	}


	_render_composite(instructor) {




	}


	_get_native_name() {

		return this._$native_cmp.attr('data-selector-name');
	}


	_get_native_value() {

		return this._$native_cmp.html();
	}


	/**
	 * Updates native select value
	 */
	_update_native_value() {

		let _opts = '';

		let _prev_value = this._$native_cmp.html();

		for (id of this._selected_ids) {
			_opts += '<option value="' + id + '" selected="selected"></option>';
		}

		this._$native_cmp.html(_opts);

		// Fire native select on change event
		if (_opts !== _prev_value) {
			this._$native_cmp.trigger('change');
		}
	}
}