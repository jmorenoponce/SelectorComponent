'use strict';


import {Selector_Config} from "./Selector_Config";
import {Data_Handler} from "./Data_Handler";
import {UI_Handler} from './UI_Handler';


export class Selector_Core {


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
	 * @param instance_id
	 * @param manager_id
	 * @returns {number}
	 */
	constructor(instance_id, manager_id) {

		this._instance_name = '';
		this._instance_id = instance_id || Selector_Core._states.SINGLE_COMPONENT;
		this._manager_id = manager_id || Selector_Core._states.SINGLE_COMPONENT;

		this._ui_handler = new UI_Handler();
		this._data_handler = new Data_Handler();
		this._config = new Selector_Config();

		this._search_term = '';
		this._selected_ids = [];

		this._state = Selector_Core._states.WAITING_FOR_BINDING;
		return this._state;
	}


	/**
	 * Link the created component taking native Html component, categorized source data, and
	 * configuration object with behaviour parameters. Then establishes the component <instanceName>.
	 * @param source_cmp
	 * @param data_src
	 * @param config_obj
	 * @returns {number}
	 */
	bind(source_cmp, data_src, config_obj) {

		if (!this._ui_handler.set_native_component(source_cmp)) {
			this._state = Selector_Core._states.INVALID_TARGET_COMPONENT;
			return this._state;
		}
		this._ui_handler.set_config(this._config.ui_params);
		this._instance_name = this._ui_handler.get_native_name() || 'nameless';

		if (!this._config.assign(config_obj)) {
			this._state = Selector_Core._states.INVALID_CONFIG_OBJECT;
			return this._state;
		}

		if(!this._data_handler.data_seed(data_src)) {
			this._state = Selector_Core._states.INVALID_DATA_SOURCE;
			return this._state;
		}
		this._data_handler.set_config(this._config.data_params);

		this._state = Selector_Core._states.BINDED;

		return this._state;
	}


	init() {

		return this._init();
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
	 * @returns {*[]}
	 */
	set_search_term(text) {

		return this._set_search_term(text);
	}


	/**
	 * @param targetId
	 */
	set_selection(targetId) {

		this._set_selection(targetId);
	}


	/**
	 * @param targetId
	 */
	select_item(targetId) {

		this._select_item((targetId));
	}


	/**
	 * @param targetId
	 */
	unselect_item(targetId) {

		this._unselect_item(targetId);
	}


	/**
	 */
	unselect_all() {

		this._unselect_all();
	}


	/**
	 * @returns {string[]}
	 */
	get_item_groups() {

		return this._data_handler.get_groups();
	}


	/**
	 * @returns {*}
	 */
	get_native_value() {

		return this._ui_handler.get_native_value();
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

		if (this._state !== Selector_Core._states.BINDED) {
			return this._state;
		}

		this._render();

		this._state = Selector_Core._states.RUNNING;

		return this._state;
	}


	_render() {

		this._ui_handler._render();
	}


	_refresh() {


	}


	_dropdown_open() {

		this._ui_handler.open();
	}


	_dropdown_close() {

		this._ui_handler.close();
	}


	_set_search_term(text) {

		this._search_term = (String(text)).toLowerCase();

		// Paso previo para extraer sólo Id's
		return this._data_handler.search(this._search_term);
	}


	/**
	 * @param target_id
	 * @private
	 */
	_set_selection(target_id) {

		this._selected_ids = [...(typeof (target_id) == 'object' ? target_id : [target_id])];
		this._refresh_selection();
	}


	/**
	 * @param targetId
	 */
	_select_item(targetId) {

		const ids = typeof (targetId) == 'object' ? targetId : [targetId];

		for (const id of ids) {

			if (!this._selected_ids.includes(id)) {

				this._selected_ids.push(id);
			}
		}

		this._refresh_selection();
	}


	/**
	 * @param targetId
	 */
	_unselect_item(targetId) {

		const ids = typeof (targetId) == 'object' ? targetId : [targetId];
		let k;

		for (const id of ids) {

			if ((k = this._selected_ids.indexOf(id)) !== -1) {

				this._selected_ids.splice(k, 1);
			}
		}

		this._refresh_selection();
	}


	/**
	 *
	 */
	_unselect_all() {

		this._selected_ids = [];
		this._refresh_selection();
	}


	_refresh_selection() {

		// this._update_native_value();
	}


	_update_native_value() {

		// this._ui_handler._update_native_value();
	}


	get id() {

		return this._instance_id;
	}


	get name() {

		return this._instance_name;
	}


	get state() {

		return this._state;
	}


	get parent_id() {

		return this._manager_id;
	}
}