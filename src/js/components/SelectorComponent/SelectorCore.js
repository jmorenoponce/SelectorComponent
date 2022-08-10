'use strict';


import {SelectorUiConfig} from "./SelectorUiConfig";
import {SelectorUi} from './SelectorUi.js';


export class SelectorCore {


    static _STATES = {

        // Informative
        WAITING_FOR_BINDING: 100,

        // Successful
        BINDED: 200,
        RUNNING: 210,
        STOPPED: 220,
        FINISHED: 230,

        // Error
        INVALID_TARGET_COMPONENT: 400,
        UNKNOWN_TARGET_NAME: 410,
        INVALID_CONFIG_OBJECT: 420,
        INVALID_SOURCE_DATA: 430,
        UNKNOWN_SOURCE_DATA: 440,

        // Other
        UNKNOWN_PROBLEM: 900
    };


    // Todo: llevar a SelectorDataConfig
    static _JSON_KEYS = {

        DATA_SOURCE: 'dataSource',
        NOTES: 'notes',
        LAST_SELECTED_IDS: 'lastItemsSelected',
        CATEGORY_KEY: 'categoryKey',
        DATA: 'data'
    }


    /**
     * @param managerId
     * @param instanceId
     * @returns {number}
     */
    constructor(managerId, instanceId) {

        this._managerId = managerId;

        this._instanceId = instanceId;
        this._instanceName = null;

        this._data = {};
        this._dataConfig = {
            lastSelectedIds: [],
            categoryKey: '',
            filter: function (term, item) {
                return Object.values(item).includes(term);
            }
        };

        this._$ui = null;
        this._uiConfig = new SelectorUiConfig();

        this._searchTerm = '';
        this._selectedIds = [];

        this._state = SelectorCore._STATES.WAITING_FOR_BINDING;
        return this._state;
    }


    /**
     * Link the new selector getting an html object, data categorize source and config behaviour parameters
     * @param sourceCmp
     * @param dataSrc
     * @param configObj
     * @returns {number} State code
     */
    bind(sourceCmp, dataSrc, configObj) {

        // Todo Refactor in functions

        // Function: Read source data
        this._data = dataSrc[0][SelectorCore._JSON_KEYS.DATA];
        this._dataConfig.categoryKey = dataSrc[0][SelectorCore._JSON_KEYS.CATEGORY_KEY];
        this._dataConfig.lastSelectedIds = dataSrc[0][SelectorCore._JSON_KEYS.LAST_SELECTED_IDS];

        // Function: If Exist Html component then assign and get info (name)
        let $targetCmp = $(sourceCmp);
        if (!$targetCmp.length > 0) {
            this._state = SelectorCore._STATES.INVALID_TARGET_COMPONENT;
            return this._state;
        }

        // Function: Create interface
        this._$ui = new SelectorUi($targetCmp);
        this._instanceName = this._$ui.name() || SelectorCore._STATES.UNKNOWN_TARGET_NAME;

        this._uiConfig.assign(configObj);
        this._state = this._uiConfig.isValid() ?
            SelectorCore._STATES.BINDED :
            SelectorCore._STATES.INVALID_CONFIG_OBJECT;

        return this._state;
    }


    _init() {

        if (this._state === SelectorCore._STATES.BINDED) {

            this.render();
            this._state = SelectorCore._STATES.RUNNING;
        }

        // this.setSearchTerm('marketing');
        // console.log(this._filterItems())

        return this._state;
    }


    init() {

        return this._init();
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


    /**
     *
     * @param text
     * @private
     */
    _setSearchTerm(text) {

        this._searchTerm = (String(text)).toLowerCase();
        // TODO Replace accents
    }


    /**
     *
     * @param text
     */
    setSearchTerm(text) {

        this._setSearchTerm(text);
        this.update();
    }


    /**
     * Returns the filtered item list (taking search term as filter seed)
     * @returns {[]}
     * @private
     */
    _filterItems() {

        let filtered = [];

        for (let item of this._data) {

            if (this._dataConfig.filter.apply(null, [this._searchTerm, item])) {
                filtered.push(item);
            }
        }

        return filtered;
    }


    /**
     *
     * @param targetId
     */
    setSelection(targetId) {

        this._selectedIds = [...(typeof (targetId) == 'object' ? targetId : [targetId])];
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


    unselectAll() {

        this._selectedIds = [];
        this._refreshSelection();
    }


    _refreshSelection() {

        this._updateNativeValue();
    }


    /**
     * Returns an enumerated array containing the categories of data items
     * @param data
     * @returns {string[]}
     * @private
     */
    _getItemsGroups(data) {

        let groups = {};

        for (let item of data) {

            let group = item[this._dataConfig.categoryKey];
            groups[group] = 1;
        }

        return Object.keys(groups);
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


    refresh() {


    }


    open() {


    }


    close() {


    }


    loadData() {


    }


    reloadData() {


    }


    setData() {


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
}