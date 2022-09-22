'use strict';


import {UI_Handler} from './UI_Handler';
import {UI_Template_Handler} from "./UI_Template_Handler";


export class Selector_Core {


	static __id_counter = 0;

	static _states = {

		// Informative
		WAITING_FOR_BINDING: 100,
		SINGLE_COMPONENT: 110,

		// Successful
		BINDED: 200,
		RUNNING: 210,
		STOPPED: 220,
		FINISHED: 230,

		// Error
		INVALID_TARGET_COMPONENT: 400,
		UNKNOWN_TARGET_NAME: 410,
		INVALID_CONFIG_OBJECT: 420,
		INVALID_DATA_SOURCE: 430,
		UNKNOWN_DATA_SOURCE: 440,

		// Other
		UNKNOWN_PROBLEM: 900
	};


	static _key_codes = {

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


	/**
	 *
	 * @param $elem
	 * @param config
	 */
	constructor($elem, config) {

		this._instance_id = 'CmpSC_' + (++Selector_Core.__id_counter);

		this._config = {
			category_key: '',
			last_selected_ids: [],
			searchable_fields: [
				'first_name',
				'last_name',
				'department'
			],

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

		this._$parent_cnt = $elem.parent();
		this._elements = {};

		this._data = [];

		// this._ui_handler = new UI_Handler();

		this._dropdown_initialized = false;
		this._dropdown_opened = false;
		this._search_term = '';
		this._selected_ids = [];

		this.set_config(config);

		this._state = Selector_Core._states.WAITING_FOR_BINDING;
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


	enable() {

		this._ui_handler.enable();
		// return Selector_Core._STATES.RUNNING;
	}


	disable() {

		this._ui_handler.disable();
		// return Selector_Core._STATES.STOPPED;
	}


	destroy() {

		// return Selector_Core._STATES.FINISHED;
	}


	is_open() {

		return this._dropdown_opened;
	}


	/**
	 * Establishes new search term and throw filter method.
	 * @param text
	 */
	set_search_term(text) {

		this._set_search_term(text);
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
	 * Returns the state key (description) from code value parameter, if empty value returns the actual state.
	 * @param code_value
	 * @returns {string}
	 */
	get_state_msg(code_value = this._state) {

		return Object.keys(Selector_Core._states).find((key) => Selector_Core._states[key] === code_value);
	}


	/**
	 * @returns {boolean}
	 */
	is_valid_state() {

		return !(this._state < 200 || this._state >= 400);
	}


	/**
	 * @returns {number}
	 * @private
	 */
	_init() {

		this._render_init();

		this._state = Selector_Core._states.RUNNING;
	}


	/**
	 *
	 * @private
	 */
	_render_init() {

		let $_ = UI_Template_Handler.$get('cmp-selector-base');

		$_.find('.ux-native-select').html(this._$parent_cnt.html());
		this._$parent_cnt.html('').append($_);

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

		for (let i in this._data) {

			if (!this._search_term || this._config.filter.apply(this, [this._search_term, this._data[i], this._config])) {

				$results.append(UI_Template_Handler.$get('cmp-selector-result', this._data[i]));
			}
		}

		this._elements.results_cnt.html($results.html());
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
	 * @private
	 */
	_set_events() {

		this._$parent_cnt.on('click', (e) => {
			this._on_cnt_click(e);
		});

		this._$parent_cnt.on('keyup', '.ux-selector-search-field', (e) => {
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
	_on_cnt_click() {

		if (!this.is_open()) {

			this._open();
		}
	}


	/**
	 *
	 * @param e
	 * @private
	 */
	_on_body_click(e) {

		if (this.is_open()) {

			//if (e.target !== this.$cnt[0]) {
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

		this.set_search_term(this._$parent_cnt.find('input.ux-selector-search-field').val());

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

		this._elements.dropdown_cnt = this._$parent_cnt.find('.ux-selector-dropdown-cnt');
		this._elements.dropdown_cnt.html(UI_Template_Handler.$get('cmp-selector-dropdown'));
		this._elements.results_cnt = this._elements.dropdown_cnt.find('.ux-results-cnt');
		this._elements.search_input = this._elements.dropdown_cnt.find('.ux-selector-search-field');

		this._dropdown_initialized = true;
	}


	/**
	 *
	 * @private
	 */
	_open() {

		this._render_ensure_dropdown_init();

		this._$parent_cnt.find('.ux-selector-dropdown-cnt').addClass('ui-selector-dropdown-expanded');
		this._dropdown_opened = true;

		this._render_refresh();

		this._elements.search_input.focus();
	}


	/**
	 *
	 * @private
	 */
	_close() {

		this._$parent_cnt.find('.ux-selector-dropdown-cnt').removeClass('ui-selector-dropdown-expanded');
		this._dropdown_opened = false;

		this._elements.results_cnt.empty();
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

		// this._update_native_value();
	}


	get id() {

		return this._instance_id;
	}


	get state() {

		return this._state;
	}
}