'use strict';


import {UI_Template_Handler} from "./UI_Template_Handler";


export class UI_Handler {


	static _ux = {

		SELECTOR_CNT: 'ux-selector-cnt',

		INPUT_CNT: 'ux-selector-input',
		INPUT_FIELD: 'ux-selector-input-field',

		POPOVER_TRIGGER: 'ux-popover-trigger',
		SELECTIONS_WIDGET: 'ux-selector-selections-list',

		DROPDOWN_CNT: 'ux-selector-dropdown',
		DROPDOWN_TRIGGER: 'ux-selector-dropdown-trigger',

		DROPDOWN_TOOLS: 'ux-selector-tools-cnt',
		SEARCH_FILTER: 'ux-selector-search-filter',
		SEARCH_FIELD: 'ux-selector-search-field',

		VIEW_UNGROUPED: 'ux-selector-view-ungrouped',
		VIEW_GROUPED: 'ux-selector-view-grouped',
		VIEW_EXPANDED: 'ux-selector-view-expanded',

		RESULTS_SELECTED_CNT: 'ux-selector-results-selected',
		RESULTS_CNT: 'ux-selector-results',

		RESULT_ITEM: 'ux-selector-result-item',
		RESULT_GROUP: 'ux-selector-group-item'
	}


	static _ui = {

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


	/**
	 *
	 * @param settings
	 * @private
	 */
	_render(settings) {

		// Vendrán de settings:
		// <placeholder>, <selections-amount>

		const cmp_selector__main = this._tpl_handler.get_tpl_partial('cmp-selector__main');

		const cmp_selector__input_cnt = this._tpl_handler.get_tpl_partial('cmp-selector__input-cnt');
		const generics__input_field = this._tpl_handler.get_tpl_partial('generics__input-field');
		const generics__badge = this._tpl_handler.get_tpl_partial('generics__badge');
		const generics__popover = this._tpl_handler.get_tpl_partial('generics__popover');
		const cmp_selector__input_dropdown_icon = this._tpl_handler.get_tpl_partial('cmp-selector__input-dropdown-icon');

		const cmp_selector__dropdown_cnt = this._tpl_handler.get_tpl_partial('cmp-selector__dropdown-cnt');
		const cmp_selector__tools_cnt = this._tpl_handler.get_tpl_partial('cmp-selector__tools-cnt');
		const cmp_selector__tools__search_filter = this._tpl_handler.get_tpl_partial('cmp-selector__tools__search-filter');
		const cmp_selector__tools_view_mode = this._tpl_handler.get_tpl_partial('cmp-selector__tools__view-mode')
		const cmp_selector__result_cnt = this._tpl_handler.get_tpl_partial('cmp-selector__results-cnt');
		const cmp_selector__result_item = this._tpl_handler.get_tpl_partial('cmp-selector__result-item');
		const cmp_selector__result_group = this._tpl_handler.get_tpl_partial('cmp-selector__result-group');

		const generics__btn = this._tpl_handler.get_tpl_partial('generics__btn');
		const generics__btn_group = this._tpl_handler.get_tpl_partial('generics__btn-group');
		const generics__btn_toolbar = this._tpl_handler.get_tpl_partial('generics__btn-toolbar');


		let $tmp = {};
		let $composite = $(cmp_selector__main());


		$('> .inner', $composite)
			.append(cmp_selector__input_cnt())
			.append(cmp_selector__dropdown_cnt());


		$tmp = $(generics__input_field({placeholder: 'Seleccionar usuario/s...'}))
			.addClass(UI_Handler._ux.INPUT_FIELD)
			.attr('disabled', 'disabled');
		$('.' + UI_Handler._ux.INPUT_CNT + '> .inner', $composite).append($tmp);


		$tmp = $(generics__badge({text: 24}))
			.addClass(UI_Handler._ux.POPOVER_TRIGGER)
			.append(generics__popover());
		$('.' + UI_Handler._ux.INPUT_CNT + '> .inner', $composite).append($tmp);


		$tmp = $(cmp_selector__input_dropdown_icon())
			.addClass(UI_Handler._ux.DROPDOWN_TRIGGER);
		$('.' + UI_Handler._ux.INPUT_CNT + '> .inner', $composite).append($tmp);


		$('.' + UI_Handler._ux.DROPDOWN_CNT + '> .inner', $composite).append(cmp_selector__tools_cnt());


		$tmp = $('.' + UI_Handler._ux.SEARCH_FILTER + '> .inner', $(cmp_selector__tools__search_filter()))
			.append(generics__input_field({placeholder: 'Buscar...'}))


		console.log($tmp.html());


		$(UI_Handler._ux.DROPDOWN_TOOLS, $composite)
			.append($tmp);

		$(UI_Handler._ux.DROPDOWN_TOOLS, $composite).append(cmp_selector__tools__search_filter());


		console.log($composite.html());
		$(this._$native_cmp).after($composite);
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