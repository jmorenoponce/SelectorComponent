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

        this._searchTerm = ''; // Todo a SelectorData
        this._selectedIds = [];

        this._state = SelectorCore._STATES.WAITING_FOR_BINDING;

        return this._state;
    }


    /**
     * Link the created component getting native Html component, categorized source data, and
     * behaviour parameters configuration object.
     * @param sourceCmp
     * @param dataSrc
     * @param configObj
     * @returns {number} State
     */
    bind(sourceCmp, dataSrc, configObj) {

        if(!this._data.load(dataSrc)) {
            this._state = SelectorCore._STATES.INVALID_DATA_SOURCE;
        }

        this._ui.assignNativeObj(sourceCmp);

        if (!this._ui.isValidNativeComponent) {
            this._state = SelectorCore._STATES.INVALID_TARGET_COMPONENT;
            return this._state;
        }

        this._ui.assignConfig(configObj);

        this._state = this._ui.isValidConfig() ?
            SelectorCore._STATES.BINDED :
            SelectorCore._STATES.INVALID_CONFIG_OBJECT;

        return this._state;
    }


    /**
     * @returns {number} State
     * @private
     */
    _init() {

        if (this._state === SelectorCore._STATES.BINDED) {

            this._instanceName = this._ui.create() || SelectorCore._STATES.UNKNOWN_TARGET_NAME;

            this.render();
            this._state = SelectorCore._STATES.RUNNING;
        }

        console.log('Buscando "marketing"...', this._data.filterItems('marketing'));
        console.log('Lista de categorías...', this._data.getItemsGroups());

        return this._state;
    }


    init() {

        return this._init();
    }


    /**
     * @param text
     * @private
     */
    _setSearchTerm(text) {

        this._searchTerm = (String(text)).toLowerCase();
    }


    /**
     * @param text
     */
    setSearchTerm(text) {

        this._setSearchTerm(text);
        this.update();
    }


    /**
     *
     * @param targetId
     */
    setSelection(targetId) {

        this._selectedIds = [...(typeof (targetId) == 'object' ? targetId : [targetId])];
        this.update();
    }


    /**
     *
     * @param targetId
     */
    selectItem(targetId) {

        // Todo: Refactor, hay un anzuelo aquí
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


    unselectAll() {

        this._selectedIds = [];
        this._refreshSelection();
    }


    _refreshSelection() {

        this._updateNativeValue();
    }


    getNativeValue() {


    }


    /**
     * Updates native select value
     */
    _updateNativeValue() {

        let _opts = '';

        let _prev_value = this._$ui.html();

        for (id of this._selectedIds) {
            _opts += '<option value="' + id + '" selected="selected"></option>';
        }

        this.$select.html(_opts);

        // Fire native select on change event
        if (_opts != _prev_value) {
            this.$select.trigger('change');
        }
    }


    enable() {


    }


    disable() {


    }


    update() {


    }


    open() {


    }


    close() {


    }


    /**
     * Render main component
     */
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


    get name() {

        return this._instanceName;
    }


    get state() {

        return this._state;
    }


    get parentManagerId() {

        return this._managerId;
    }
}