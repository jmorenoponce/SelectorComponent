'use strict';


import {SelectorData} from "./SelectorData";
import {SelectorUI} from './SelectorUI.js';


export class SelectorCore {


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
     * @param instanceId
     * @param managerId
     * @returns {number}
     */
    constructor(instanceId, managerId = null) {

        this._instanceId = instanceId;
        this._instanceName = '';

        this._managerId = managerId || SelectorCore._STATES.SINGLE_COMPONENT;

        this._data = new SelectorData();
        this._ui = new SelectorUI();

        this._selectedIds = [];
        this._searchTerm = '';

        this._state = SelectorCore._STATES.WAITING_FOR_BINDING;
        return this._state;
    }


    /**
     * Link the created component getting native Html component, categorized source data,
     * and configuration object with behaviour parameters.
     * @param sourceCmp
     * @param dataSrc
     * @param configObj
     * @returns {number}
     */
    bind(sourceCmp, dataSrc, configObj) {

        if(!this._data.load(dataSrc)) {
            this._state = SelectorCore._STATES.INVALID_DATA_SOURCE;
            return this._state;
        }

        if (!this._ui.setNativeObj(sourceCmp)) {
            this._state = SelectorCore._STATES.INVALID_TARGET_COMPONENT;
            return this._state;
        }

        this._state = this._ui.assignConfig(configObj) ?
            SelectorCore._STATES.BINDED :
            SelectorCore._STATES.INVALID_CONFIG_OBJECT;

        return this._state;
    }


    /**
     *
     * @returns {number} State
     * @private
     */
    _init() {

        if (this._state !== SelectorCore._STATES.BINDED) {
            return this._state;
        }

        this._instanceName = this._ui.create() || SelectorCore._STATES.UNKNOWN_TARGET_NAME;
        this._state = SelectorCore._STATES.RUNNING;

        return this._state;
    }


    init() {

        return this._init();
    }


    /**
     * Establishes new search term and throw filter method.
     * @param text
     * @returns {*[]}
     */
    setSearchTerm(text) {

        this._searchTerm = (String(text)).toLowerCase();

        // Todo: Paso previo para extraer sólo Id's
        return this._data.filterItems(this._searchTerm);
    }


    /**
     *
     * @param targetId
     */
    selectItem(targetId) {

        const ids = typeof (targetId) == 'object' ? targetId : [targetId];
        let k;

        for (id of ids) {

            if (!this._selectedIds.contains(id)) {

                this._selectedIds.push(id);
            }
        }

        this._refreshSelection();
    }


    /**
     *
     * @param targetId
     */
    unselectItem(targetId) {

        const ids = typeof (targetId) == 'object' ? targetId : [targetId];
        let k;

        for (id of ids) {

            if ((k = this._selectedIds.indexOf(id)) !== -1) {
                this._selectedIds.splice(k, 1);
            }
        }

        this._refreshSelection();
    }

    /**
     *
     * @param targetId
     * @private
     */
    _setSelection(targetId) {

        this._selectedIds = [...(typeof (targetId) == 'object' ? targetId : [targetId])];
        // refresh method
    }


    setSelection(targetId) {

        this._setSelection(targetId);
    }


    unselectAll() {

        this._selectedIds = [];
        this._refreshSelection();
    }


    /**
     *
     * @returns {string[]}
     */
    getItemGroups() {

        return this._data.getItemsGroups();
    }


    getNativeValue() {

        return this._ui.getNativeValue();
    }


    _refreshSelection() {

        this._updateNativeValue();
    }


    _updateNativeValue() {

        this._ui._updateNativeValue();
    }


    enable() {


    }


    disable() {


    }


    update() {


    }


    openDropdown() {

        this._ui.open();
    }


    closeDropdown() {

        this._ui.close();
    }


    render() {


    }


    renderList_ungrouped() {


    }


    renderList_grouped() {


    }


    destroy() {


    }


    get id() {

        return this._instanceId;
    }


    get parentManagerId() {

        return this._managerId;
    }


    get name() {

        return this._instanceName;
    }


    get state() {

        return this._state;
    }


    /**
     * Returns the state value from code value parameter, if default value returns the actual state.
     * @param codeValue
     * @returns {string}
     */
    getStateMessage(codeValue = this._state) {

        return Object.keys(SelectorCore._STATES).find((key) => SelectorCore._STATES[key] === codeValue);
    }
}