'use strict';


import {SelectorConfig} from "./SelectorConfig";
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


    /**
     *
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
			categoryKey: '',
			filter: function (term, item) {
				return item.name.toLowerCase().includes(term);
			}
		};

		this._searchTerm = '';
		this._selectedIds = [];

		this._ui = null;
		this._uiConfig = new SelectorConfig();

        this._state = SelectorCore._STATES.WAITING_FOR_BINDING;
        return this._state;
    }


	/**
	 *
	 * @param targetCmp
	 * @param sourceData
	 * @param configObj
	 * @returns {number}
	 */
	bind(targetCmp, sourceData, configObj) {

        let $targetCmp = $(targetCmp);
        if (!$targetCmp.length > 0) {
            this._state = SelectorCore._STATES.INVALID_TARGET_COMPONENT;
            return this._state;
        }

		// this._data = sourceData;
		// this._dataConfig.categoryKey

		this._ui = new SelectorUi($targetCmp);
		this._instanceName = this._ui.name() || SelectorCore._STATES.UNKNOWN_TARGET_NAME;

		this._uiConfig.assign(configObj);
		this._state = this._uiConfig.isValid() ?
			SelectorCore._STATES.BINDED :
			SelectorCore._STATES.INVALID_CONFIG_OBJECT;

        return this._state;
    }


    /**
     *
     * @returns {number}
     * @private
     */
    _init() {

        if (this._state === SelectorCore._STATES.BINDED) {

			this._ui.render();
			this._state = SelectorCore._STATES.RUNNING;
		}

		// this._searchTerm = 'Brannon';
		// this._filterItems();

		return this._state;
	}


    init() {

        return this._init();
    }


	/**
	 * Returns the filtered item list (taking search term as filter seed)
	 * @return {}
	 */
	_filterItems () {

		let filtered = [];

		for (let item of this._uiConfig.configObj.dataSource) {

			if (this._uiConfig.filter.apply(null, [this._searchTerm, item])) {
				filtered.push(item);
			}
		}

		return filtered;
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


    enable() {


    }


    disable() {


    }


    update() {


    }


    /**
     *
     * @param target
     */
    selectItems(target) {


    }


    /**
     *
     * @param target
     */
    unselectItems(target) {


    }


    clear() {


    }


    destroy() {


    }


    /**
     *
     * @param code
     */
    getErrorMsg(code) {

        // Do stuff
    }


    /**
     *
     * @param code
     * @private
     */
    _submitInterfaceError(code) {

        // this._interface.error(code);
    }
}