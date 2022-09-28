'use strict';


import {UI_Template_Handler} from "./UI_Template_Handler";


export class Selector_Core {

	static __id_counter = 0;

	static _tpl_pointers = {

		SELECTOR_BASE: 			'cmp-selector-base',
		SELECTOR_DROPDOWN: 		'cmp-selector-dropdown',
		SELECTOR_RESULT_ITEM: 	'cmp-selector-result-item',
		SELECTOR_RESULT_GROUP:	'cmp-selector-result-group',
	}

	static _ux_pointers = {

		NATIVE_FIELD_CNT: 		'.ux-selector-original-field-cnt',
		INPUT_FIELD: 			'.ux-selector-input-field',
		DROPDOWN_TRIGGER: 		'.ux-selector-dropdown-trigger',
		DROPDOWN_CNT: 			'.ux-selector-dropdown-cnt',
		SEARCH_FIELD: 			'.ux-selector-search-field',
		SELECTED_CNT:			'.ux-selector-selected-cnt',
		RESULTS_CNT:			'.ux-selector-results-cnt',
		RESULT_ITEM:			'.ux-selector-result-item'
	}

	static _ui_modifiers = {

		DROPDOWN_OPENED: 		'ui-selector-dropdown-opened'
	}


	/**
	 * @param $elem
	 * @param config
	 */
	constructor($elem, config) {

		this._config = {
			category_key: 		'',
			searchable_fields: 	[],
			last_selected_ids: 	[],
			active: 			true,
			editable: 			true,
			placeholder: 		'Seleccionar...',
			searching_text: 	'Buscar...',
			search_no_results: 	'No se encontraron coincidencias para esta búsqueda',

			/**
			 * Returns coincidence validation looking for <term> in all value keys of <searchable_fields>
			 * @returns {boolean}
			 */
			filter: function (term, item, config) {

				for (let key of config.searchable_fields) {

					if (item[key].toString().toLowerCase().includes(term)) {
						return true;
					}
				}
			}
		};

		this._instance_id = 'CmpSC_' + (++Selector_Core.__id_counter);

		this._$native_field = $elem;
		this._$native_parent_cnt = $elem.parent();

		this._elements = {
			dropdown_cnt: {},
			search_field: {},
			selected_cnt: {},
			results_cnt: {}
		};

		this._data = [];

		this._dropdown_initialized = false;
		this._dropdown_opened = false;

		this._search_term = '';
		this._selected_ids = [];

		this.set_config(config);
	}


	init() {

		this._init();
	}


	activate() {

		this._config.active = true;
	}


	deactivate() {

		this._config.active = false;
	}


	/**
	 * @param config
	 */
	set_config(config) {

		$.extend(true, this._config, config);
		// Do Stuff...
	}


	/**
	 * @param data
	 */
	set_data(data) {

		this._data = data;
		// Do Stuff...
	}


	/**
	 * Establishes new search term and throw filter method.
	 * @param text
	 */
	set_search_term(text) {

		this._set_search_term(text);
		this._render_refresh();
	}


	/**
	 * @param target_id
	 */
	set_selection(target_id) {

		this._set_selected_ids(typeof (target_id) != 'object' ? [target_id] : target_id);
	}


	/**
	 *
	 * @param target_id
	 */
	select_items(target_id) {

		target_id = typeof (target_id) != 'object' ? [target_id] : target_id;

		if (!this._selected_ids.length) {

			this._set_selected_ids(target_id);

		} else {

			this._selection_add(target_id);
		}
	}


	/**
	 *
	 * @param target_id
	 */
	unselect_items(target_id) {

		if (typeof (target_id) == 'undefined') {

			this._selection_remove_all();

		} else {

			this._selection_remove(typeof (target_id) != 'object' ? [target_id] : target_id);
		}
	}


	/**
	 *
	 */
	unselect_all() {

		this._selection_remove_all();
	}


	/**
	 * @returns {string}
	 */
	get id() {

		return this._instance_id;
	}


	/**
	 * @returns {number}
	 * @private
	 */
	_init() {

		this._render_init();
	}


	/**
	 *
	 * @private
	 */
	_render_init() {

		let _$tmpTpl = UI_Template_Handler.$get(Selector_Core._tpl_pointers.SELECTOR_BASE, {
			input_placeholder: this._config.placeholder,
		});

		_$tmpTpl.find(Selector_Core._ux_pointers.NATIVE_FIELD_CNT).html(this._$native_parent_cnt.html());

		this._$native_parent_cnt.html('').append(_$tmpTpl);

		// this._elements.dropdown_cnt


		this._set_events();
		this._render_refresh();
	}


	/**
	 *
	 * @private
	 */
	_render_refresh() {

		this._render_results();
	}


	/**
	 *
	 * @private
	 */
	_render_ensure_dropdown_init() {

		if (this._dropdown_initialized) {
			return;
		}

		this._elements.dropdown_cnt = this._$native_parent_cnt.find(Selector_Core._ux_pointers.DROPDOWN_CNT);
		this._elements.dropdown_cnt.html(UI_Template_Handler.$get(Selector_Core._tpl_pointers.SELECTOR_DROPDOWN, {}));

		this._elements.search_field = this._elements.dropdown_cnt.find(Selector_Core._ux_pointers.SEARCH_FIELD);

		this._elements.selected_cnt = this._elements.dropdown_cnt.find(Selector_Core._ux_pointers.SELECTED_CNT)
		this._elements.results_cnt = this._elements.dropdown_cnt.find(Selector_Core._ux_pointers.RESULTS_CNT);

		this._dropdown_initialized = true;
	}


	/**
	 *
	 * @private
	 */
	_render_results() {

		if (!this._dropdown_opened) {
			return;
		}

		let $results = $('<div/>');

		for (let item in this._data) {

			if (!this._search_term || this._config.filter.apply(this, [this._search_term, this._data[item], this._config])) {

				$results.append(UI_Template_Handler.$get(Selector_Core._tpl_pointers.SELECTOR_RESULT_ITEM, this._data[item]));
			}
		}

		this._elements.results_cnt.html($results.html());
	}


	/**
	 *
	 * @param text
	 * @private
	 */
	_set_search_term(text) {

		this._search_term = (String(text)).toLowerCase();
	}


	/**
	 *
	 * @param ids
	 * @private
	 */
	_set_selected_ids(ids) {

		this._selected_ids = [...ids];

		this._refresh_selection();
	}


	/**
	 *
	 * @param target_id
	 * @private
	 */
	_selection_add(target_id) {

		const ids = typeof (target_id) == 'object' ? target_id : [target_id];

		let new_selection = [...this._selected_ids];

		for (const id of ids) {

			if (!new_selection.includes(id)) {

				new_selection.push(id);
			}
		}

		this._set_selected_ids(new_selection);
	}


	/**
	 *
	 * @param target_id
	 * @private
	 */
	_selection_remove(target_id) {

		const ids = typeof (target_id) == 'object' ? target_id : [target_id];
		let k;

		let new_selection = [];

		for (const id of ids) {

			if ((k = this._selected_ids.indexOf(id)) === -1) {

				new_selection.push(id);
			}
		}

		this._set_selected_ids(new_selection);
	}


	/**
	 *
	 * @private
	 */
	_selection_remove_all() {

		this._set_selected_ids([]);
	}


	/**
	 *
	 * @private
	 */
	_refresh_selection() {

		console.log(this._$native_field.val());

		this._$native_field.val(this._selected_ids);
	}


	/**
	 *
	 * @private
	 */
	_set_events() {

		$(Selector_Core._ux_pointers.INPUT_FIELD + ', ' + Selector_Core._ux_pointers.DROPDOWN_TRIGGER).on('click', (e) => {
			this._on_input_field_click(e);
		});

		this._$native_parent_cnt.on('keyup', Selector_Core._ux_pointers.SEARCH_FIELD, (e) => {
			this._on_search_field_keyup(e);
		});

		this._$native_parent_cnt.on('click', Selector_Core._ux_pointers.DROPDOWN_CNT, (e) => {

			if (e.target.closest(Selector_Core._ux_pointers.RESULTS_CNT)) {
				this._on_results_cnt_click(e.target);
			}

			if (e.target.closest(Selector_Core._ux_pointers.SELECTED_CNT)) {
				this._on_selected_cnt_click(e.target);
			}
		});

		$('body').on('click', (e) => {
			this._on_body_click(e);
		});
	}


	/**
	 * @param e
	 * @private
	 */
	_on_input_field_click(e) {

		if (!this._dropdown_opened && this._config.active) {
			this._open();
		} else {
			this._close();
		}
	}


	/**
	 * @param e
	 * @private
	 */
	_on_search_field_keyup(e) {

		this.set_search_term(this._$native_parent_cnt.find(Selector_Core._ux_pointers.SEARCH_FIELD).val());
		this._render_results();
	}


	/**
	 * @param e
	 * @private
	 */
	_on_results_cnt_click(item) {

		let _tmpItem = item.closest(Selector_Core._ux_pointers.RESULT_ITEM);

		let _tmpId =

		console.log(_tmpItem)
	}


	/**
	 * @param e
	 * @private
	 */
	_on_selected_cnt_click(item) {

		console.log('Hiciste click en selected')
	}


	/**
	 * @param e
	 * @private
	 */
	_on_body_click(e) {

		if (this._dropdown_opened) {

			if (e.target !== this._$native_parent_cnt[0] && !$.contains(this._$native_parent_cnt[0], e.target)) {

				this._close();
			}
		}
	}


	/**
	 * @private
	 */
	_open() {

		this._render_ensure_dropdown_init();

		this._$native_parent_cnt.find(Selector_Core._ux_pointers.DROPDOWN_CNT).addClass(Selector_Core._ui_modifiers.DROPDOWN_OPENED);
		this._dropdown_opened = true;

		this._render_refresh();
		this._elements.search_field.focus();
	}


	/**
	 * @private
	 */
	_close() {

		this._$native_parent_cnt.find(Selector_Core._ux_pointers.DROPDOWN_CNT).removeClass(Selector_Core._ui_modifiers.DROPDOWN_OPENED);
		this._dropdown_opened = false;

		this._elements.results_cnt.empty();
	}
}