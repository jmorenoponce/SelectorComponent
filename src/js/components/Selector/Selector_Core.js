'use strict';


import {Selector_Config} from "./Selector_Config";
import {Data_Handler} from "./Data_Handler";
import {UI_Handler} from './UI_Handler';
import {UI_Template_Handler} from "./UI_Template_Handler";

/**
 *
 */
export class Selector_Core {


	static __idCounter = 0;

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
	 * @returns {number}
	 */
	constructor($elem, config) {


		window.UI_Template_Handler = UI_Template_Handler;

		this._instance_id = 'CmpSC_' + (++Selector_Core.__idCounter);

		this._config = {
			category_key: '',
			last_selected_ids: [],
			searchable_fields: [
				'first_name',
				'last_name'
			],

			/**
			 * Returns coincidence validation looking for <term> in all value keys of <item>.
			 * @returns {boolean}
			 */
			filter: function (term, item, config) { // ?? Searchable fields

				for (let key of config.searchable_fields) {

					if (item[key].toString().toLowerCase().includes(term)) {
						return true;
					}
				}
			}
		};

		this.data = [];

		this.set_config(config);

		this.$cnt = $elem.parent();

		this._ui_handler = new UI_Handler();
		this._data_handler = new Data_Handler();

		this._is_open = false;

		this._search_term = '';
		this._selected_ids = [];
		this._state = Selector_Core._states.WAITING_FOR_BINDING;
	}


	set_config(config) {

		$.extend(true, this._config, config);
	}


	set_data(data) {

		this.data = data;
	}


	init() {

		this._init();
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


	/**
	 * Establishes new search term and throw filter method.
	 * @param text
	 */
	set_search_term(text) {

		this._set_search_term(text);
	}


	/**
	 * @param targetId
	 */
	set_selection(targetId) {

		this._set_selected_ids(typeof (targetId) != 'object' ? [targetId] : targetId);
	}


	select_items(targetId) {

		targetId = typeof (targetId) != 'object' ? [targetId] : targetId;

		if (!this._selected_ids.length) {

			this._set_selected_ids(targetId);

		} else {

			this._selection_add(targetId);
		}
	}


	unselect_items(targetId) {

		if (typeof (targetId) == 'undefined') {

			this._selection_remove_all();

		} else {

			this._selection_remove(typeof (targetId) != 'object' ? [targetId] : targetId);
		}
	}


	/**
	 */
	unselect_all() {

		this._selection_remove_all();
	}


	_selection_add(targetId) {

		const ids = typeof (targetId) == 'object' ? targetId : [targetId];

		let new_selection = [...this._selected_ids];

		for (const id of ids) {

			if (!new_selection.includes(id)) {

				new_selection.push(id);
			}
		}

		this._set_selected_ids(new_selection);
	}


	_selection_remove(targetId) {

		const ids = typeof (targetId) == 'object' ? targetId : [targetId];
		let k;

		let new_selection = [];

		for (const id of ids) {

			if ((k = this._selected_ids.indexOf(id)) === -1) {

				new_selection.push(id);
			}
		}

		this._set_selected_ids(new_selection);
	}


	_selection_remove_all() {

		this._set_selected_ids([]);
	}


	_set_selected_ids(ids) {

		this._selected_ids = [...ids];

		this._refresh_selection();
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


	_render_init() {

		let $_ = UI_Template_Handler.$get('cmp-selector-base');

		this.elements = {};

		$_.find('.ux-native-select').html(this.$cnt.html());
		this.$cnt.html('').append($_);

		this._set_events();

		this._render_refresh();
	}


	_render_refresh () {

		this._render_results();
	}

	_render_results () {

		if (!this.isOpen()) {
			return;
		}

		let $results = $('<div/>');

		for (let i in this.data) {

			if (!this._search_term || this._config.filter.apply(this, [this._search_term, this.data[i], this._config])) {

				$results.append(UI_Template_Handler.$get('cmp-selector-result', this.data[i]));
			}
		}

		this.elements.results_cnt.html($results.html());
	}


	_set_events() {

		this.$cnt.on('click', (e) => {
			this._on_cnt_click(e);
		});

		this.$cnt.on('keyup', '.ux-selector-search-field', (e) => {
			this._on_search_field_keyup(e);
		});

		$('body').on('click', (e) => {
			this._on_body_click(e);
		});
	}


	_render() {

	}


	_on_cnt_click() {

		if (!this.isOpen()) {
			this._open();
		}
	}

	_on_body_click(e) {

		if (this.isOpen()) {

			//if (e.target !== this.$cnt[0]) {
			if (e.target !== this.$cnt[0] && !$.contains(this.$cnt[0], e.target)) {
				this._close();
			}
		}
	}

	_on_search_field_keyup (e) {

		this.set_search_term(this.$cnt.find('input.ux-selector-search-field').val());

		this._render_results();
	}

	isOpen() {

		return this._is_open;
	}

	_render_ensure_dropdown_init () {

		if (this._drop_down_initialized) {
			return;
		}

		this.elements.dropdown_cnt = this.$cnt.find('.ux-selector-dropdown-cnt');
		this.elements.dropdown_cnt.html(UI_Template_Handler.$get('cmp-selector-dropdown'));
		this.elements.results_cnt = this.elements.dropdown_cnt.find('.ux-results-cnt');
		this.elements.search_input = this.elements.dropdown_cnt.find('.ux-selector-search-field');

		this._drop_down_initialized = true;
	}

	_open() {

		this._render_ensure_dropdown_init();

		this.$cnt.find('.ux-selector-dropdown-cnt').addClass('ui-selector-dropdown-expanded');
		this._is_open = true;

		this._render_refresh();

		this.elements.search_input.focus();

	}

	_close() {

		this.$cnt.find('.ux-selector-dropdown-cnt').removeClass('ui-selector-dropdown-expanded');
		this._is_open = false;

		this.elements.results_cnt.empty();

	}


	_set_search_term(text) {

		this._search_term = (String(text)).toLowerCase();
	}


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