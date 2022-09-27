'use strict';


import {UI_Template_Handler} from "./UI_Template_Handler";


export class Selector_Core {


	static __id_counter = 0;


	static _tpl_pointers = {

		SELECTOR_BASE: 			'cmp-selector-base',
		SELECTOR_DROPDOWN: 		'cmp-selector-dropdown',
		SELECTOR_RESULT_ITEM: 	'cmp-selector-result-item'
	}


	static _ux_pointers = {

		ORIGINAL_FIELD_CNT: 	'.ux-selector-original-field-cnt',
		INPUT_FIELD: 			'.ux-selector-input-field',
		DROPDOWN_TRIGGER: 		'.ux-selector-dropdown-trigger',
		DROPDOWN_CNT: 			'.ux-selector-dropdown-cnt',
		SEARCH_FIELD: 			'.ux-selector-search-field'
	}


	static _ui_modifiers = {

		DROPDOWN_EXPANDED: 'ui-selector-dropdown-expanded'
	}


	/**
	 * @param $elem
	 * @param config
	 */
	constructor($elem, config) {

		this._config = {
			category_key: '',
			searchable_fields: [],
			last_selected_ids: [],
			is_active: true,
			is_editable: true,
			placeholder: 'Seleccionar...',
			searching_text: 'Buscar...',
			search_results_none: 'No se encontraron coincidencias para esta búsqueda',

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

		this._$original_field = $elem;
		this._$original_parent_cnt = $elem.parent();

		this._elements = {};
		this._data = [];

		this._dropdown_initialized = false;
		this._dropdown_is_open = false;

		this._search_term = '';
		this._selected_ids = [];

		this.set_config(config);
	}


	init() {

		this._init();
	}


	activate() {

		this._config.is_active = true;
		this._set_events();
	}


	deactivate() {

		this._config.is_active = false;
		this._set_events();
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

		let $_tmpTpl = UI_Template_Handler.$get(Selector_Core._tpl_pointers.SELECTOR_BASE, {
			input_placeholder: this._config.placeholder,
		});

		$_tmpTpl.find(Selector_Core._ux_pointers.ORIGINAL_FIELD_CNT).html(this._$original_parent_cnt.html());

		this._$original_parent_cnt.html('').append($_tmpTpl);

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
	_render_results() {

		if (!this._dropdown_is_open) {
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
	 * @private
	 */
	_render_ensure_dropdown_init() {

		if (this._dropdown_initialized) {
			return;
		}

		this._elements.dropdown_cnt = this._$original_parent_cnt.find(Selector_Core._ux_pointers.DROPDOWN_CNT);
		this._elements.dropdown_cnt.html(UI_Template_Handler.$get(Selector_Core._tpl_pointers.SELECTOR_DROPDOWN, {}));

		this._elements.search_input = this._elements.dropdown_cnt.find(Selector_Core._ux_pointers.SEARCH_FIELD);
		this._elements.results_cnt = this._elements.dropdown_cnt.find('.ux-results-cnt');

		this._dropdown_initialized = true;
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

		console.log(this._$original_field.val());

		this._$original_field.val(this._selected_ids);
	}


	/**
	 *
	 * @private
	 */
	_set_events() {

		$(Selector_Core._ux_pointers.INPUT_FIELD + ', ' + Selector_Core._ux_pointers.DROPDOWN_TRIGGER).on('click', (e) => {
			this._on_input_field_click(e);
		});

		this._$original_parent_cnt.on('keyup', Selector_Core._ux_pointers.SEARCH_FIELD, (e) => {
			this._on_search_field_keyup(e);
		});

		$('body').on('click', (e) => {
			this._on_body_click(e);
		});
	}


	/**
	 *
	 * @private
	 */
	_on_input_field_click() {

		if (!this._dropdown_is_open && this._config.is_active) {
			this._open();
		} else {
			this._close();
		}
	}


	/**
	 *
	 * @param e
	 * @private
	 */
	_on_body_click(e) {

		if (this._dropdown_is_open) {

			if (e.target !== this._$original_parent_cnt[0] && !$.contains(this._$original_parent_cnt[0], e.target)) {

				this._close();
			}
		}
	}


	/**
	 *
	 * @param e
	 * @private
	 */
	_on_search_field_keyup(e) {

		this.set_search_term(this._$original_parent_cnt.find(Selector_Core._ux_pointers.SEARCH_FIELD).val());

		this._render_results();
	}


	/**
	 *
	 * @private
	 */
	_open() {

		this._render_ensure_dropdown_init();

		this._$original_parent_cnt.find(Selector_Core._ux_pointers.DROPDOWN_CNT).addClass(Selector_Core._ui_modifiers.DROPDOWN_EXPANDED);
		this._dropdown_is_open = true;

		this._render_refresh();
		this._elements.search_input.focus();
	}


	/**
	 *
	 * @private
	 */
	_close() {

		this._$original_parent_cnt.find(Selector_Core._ux_pointers.DROPDOWN_CNT).removeClass(Selector_Core._ui_modifiers.DROPDOWN_EXPANDED);
		this._dropdown_is_open = false;

		this._elements.results_cnt.empty();
	}


	get id() {

		return this._instance_id;
	}
}