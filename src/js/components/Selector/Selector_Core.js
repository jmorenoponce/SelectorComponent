'use strict';


import {UI_Template_Handler} from "./UI_Template_Handler";


export class Selector_Core {


	static __id_counter = 0;

	static _tpl_pointers = {

		selector_base: 'cmp-selector-base',
		selector_dropdown: 'cmp-selector-dropdown',
		selector_result_item: 'cmp-selector-result-item'
	}

	static _ux_pointers = {

		native_field_cnt: '.ux-selector-native-field-cnt',
		input_field: '.ux-selector-input-field',
		dropdown_trigger: '.ux-selector-dropdown-trigger',
		dropdown_cnt: '.ux-selector-dropdown-cnt',
		search_field: '.ux-selector-search-field'
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
			searching_text: 'Buscando...',
			search_results_none: 'No se encontraron coincidencias para esta búsqueda',

			/**
			 * Returns coincidence validation looking for <term> in all value keys of <item>.
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
		this._$parent_cnt = $elem.parent();

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


	/**
	 * @param config
	 */
	set_config(config) {

		$.extend(true, this._config, config);
	}


	/**
	 * @param data
	 */
	set_data(data) {

		this._data = data;
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
	 * Establishes new search term and throw filter method.
	 * @param text
	 */
	set_search_term(text) {

		this._set_search_term(text);
	}


	enable() {

		this._config.is_active = true;
		this._set_events();
	}


	disable() {

		this._config.is_active = false;
		this._set_events();
	}


	is_open() {

		return this._dropdown_is_open;
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

		let $_tpl = UI_Template_Handler.$get(Selector_Core._tpl_pointers.selector_base, {
			input_placeholder: this._config.placeholder,
		});

		$_tpl.find(Selector_Core._ux_pointers.native_field_cnt).html(this._$parent_cnt.html());

		this._$parent_cnt.html('').append($_tpl);

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

		if (!this.is_open()) {
			return;
		}

		let $results = $('<div/>');

		for (let item in this._data) {

			if (!this._search_term || this._config.filter.apply(this, [this._search_term, this._data[item], this._config])) {

				$results.append(UI_Template_Handler.$get(Selector_Core._tpl_pointers.selector_result_item, this._data[item]));
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

		this._elements.dropdown_cnt = this._$parent_cnt.find(Selector_Core._ux_pointers.dropdown_cnt);
		this._elements.dropdown_cnt.html(UI_Template_Handler.$get(Selector_Core._tpl_pointers.selector_dropdown, {

		}));

		this._elements.search_input = this._elements.dropdown_cnt.find('.ux-selector-search-field');
		this._elements.results_cnt = this._elements.dropdown_cnt.find('.ux-results-cnt');

		this._dropdown_initialized = true;
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
	 * @param ids
	 * @private
	 */
	_set_selected_ids(ids) {

		this._selected_ids = [...ids];

		this._refresh_selection();
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

		$(Selector_Core._ux_pointers.input_field + ', ' + Selector_Core._ux_pointers.dropdown_trigger).on('click', (e) => {
			this._on_input_field_click(e);
		});

		this._$parent_cnt.on('keyup', Selector_Core._ux_pointers.search_field, (e) => {
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

		if (!this.is_open() && this._config.is_active) {
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

		if (this.is_open()) {

			if (e.target !== this._$parent_cnt[0] && !$.contains(this._$parent_cnt[0], e.target)) {

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

		this.set_search_term(this._$parent_cnt.find(Selector_Core._ux_pointers.search_field).val());

		this._render_results();
	}


	/**
	 *
	 * @private
	 */
	_open() {

		this._render_ensure_dropdown_init();

		this._$parent_cnt.find('.ux-selector-dropdown-cnt').addClass('ui-selector-dropdown-expanded');
		this._dropdown_is_open = true;

		this._render_refresh();

		this._elements.search_input.focus();
	}


	/**
	 *
	 * @private
	 */
	_close() {

		this._$parent_cnt.find('.ux-selector-dropdown-cnt').removeClass('ui-selector-dropdown-expanded');
		this._dropdown_is_open = false;

		this._elements.results_cnt.empty();
	}


	get id() {

		return this._instance_id;
	}
}