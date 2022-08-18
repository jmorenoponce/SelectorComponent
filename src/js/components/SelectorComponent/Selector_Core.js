'use strict';


import {Selector_Data} from "./Selector_Data";
import {Selector_Ui} from './Selector_Ui';
import {Selector_Config} from "./Selector_Config";


export class Selector_Core {


    static _STATES = {

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


    /**
     * @param instance_id
     * @param manager_id
     * @returns {number}
     */
    constructor(instance_id, manager_id) {

        this._instance_id = instance_id;
        this._instance_name = '';

        this._manager_id = manager_id || Selector_Core._STATES.SINGLE_COMPONENT;

        this._config = new Selector_Config();
        this._data = new Selector_Data(this._config.data_params);
        this._ui = new Selector_Ui(this._config.ui_params);

        this._selected_ids = [];
        this._search_term = '';

        this._state = Selector_Core._STATES.WAITING_FOR_BINDING;
        return this._state;
    }


    /**
     * Link the created component taking native Html component, categorized source data,
     * and configuration object with behaviour parameters. Then establishes the component <instanceName>.
     * @param source_cmp
     * @param data_src
     * @param config_obj
     * @returns {number}
     */
    bind(source_cmp, data_src, config_obj) {

        if (!this._config.assign(config_obj)) {
            this._state = Selector_Core._STATES.INVALID_CONFIG_OBJECT;
            return this._state;
        }

        if (!this._ui.set_native_component(source_cmp)) {
            this._state = Selector_Core._STATES.INVALID_TARGET_COMPONENT;
            return this._state;
        }

        if(!this._data.set_data(data_src)) {
            this._state = Selector_Core._STATES.INVALID_DATA_SOURCE;
            return this._state;
        }

        this._instance_name = this._ui.get_native_name() || '';

        this._state = Selector_Core._STATES.BINDED;

        return this._state;
    }


    /**
     * @returns {number}
     * @private
     */
    _init() {

        if (this._state !== Selector_Core._STATES.BINDED) {
            return this._state;
        }

        this._render();

        this._state = Selector_Core._STATES.RUNNING;

        return this._state;
    }


    init() {

        return this._init();
    }


    _render() {

        this._ui._render();
    }


    renderList_ungrouped() {

        this._render();
    }


    renderList_grouped() {

        this._render();
    }


    refresh() {


    }


    /**
     * Establishes new search term and throw filter method.
     * @param text
     * @returns {*[]}
     */
    setSearchTerm(text) {

        this._search_term = (String(text)).toLowerCase();

        // Todo: Paso previo para extraer sólo Id's
        return this._data.filterItems(this._search_term);
    }


    /**
     * @param targetId
     * @private
     */
    _setSelection(targetId) {

        this._selected_ids = [...(typeof (targetId) == 'object' ? targetId : [targetId])];
        this._refreshSelection();
    }


    setSelection(targetId) {

        this._setSelection(targetId);
    }


    /**
     * @param targetId
     */
    _selectItem(targetId) {

        const ids = typeof (targetId) == 'object' ? targetId : [targetId];

        for (const id of ids) {

            if (!this._selected_ids.includes(id)) {

                this._selected_ids.push(id);
            }
        }

        this._refreshSelection();
    }


    selectItem(targetId) {

        this._selectItem((targetId));
    }



    /**
     * @param targetId
     */
    _unselectItem(targetId) {

        const ids = typeof (targetId) == 'object' ? targetId : [targetId];
        let k;

        for (const id of ids) {

            if ((k = this._selected_ids.indexOf(id)) !== -1) {

                this._selected_ids.splice(k, 1);
            }
        }

        this._refreshSelection();
    }


    unselectItem(targetId) {

        this._unselectItem(targetId);
    }


    /**
     *
     */
    _unselectAll() {

        this._selected_ids = [];
        this._refreshSelection();
    }


    unselectAll() {

        this._unselectAll();
    }


    _refreshSelection() {

        this._updateNativeValue();
    }


    _updateNativeValue() {

        this._ui._update_native_value();
    }


    getNativeValue() {

        return this._ui.get_native_value();
    }


    /**
     *
     * @returns {string[]}
     */
    getItemGroups() {

        return this._data.getItemsGroups();
    }


    enable() { // Todo : Bridge

        this._ui.enable();
    }


    disable() {

        this._ui.disable();
    }


    update() {


    }


    openDropdown() {

        this._ui.open();
    }


    closeDropdown() {

        this._ui.close();
    }


    destroy() {


    }


    get id() {

        return this._instance_id;
    }


    get name() {

        return this._instance_name;
    }


    get parentManagerId() {

        return this._manager_id;
    }


    get state() {

        return this._state;
    }


    is_valid_state() {

        return !(this._state < 200 || this._state >= 400);
    }


    /**
     * Returns the state key (description) from code value parameter, if empty value returns the actual state.
     * @param code_value
     * @returns {string}
     */
    get_state_msg(code_value = this._state) {

        return Object.keys(Selector_Core._STATES).find((key) => Selector_Core._STATES[key] === code_value);
    }
}