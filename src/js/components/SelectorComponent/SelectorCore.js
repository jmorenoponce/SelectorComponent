'use strict';


import {SelectorConfig} from "./SelectorConfig";
import {SelectorInterface} from './SelectorInterface.js';

import $ from "jquery";


export class SelectorCore {


    constructor(managerId, instanceId) {

        this._managerId = managerId;

        this._instanceId = instanceId;

        this._instanceName = null;
        this._$sourceHtmlObj = null; // Todo: Esto huele

        this._config = new SelectorConfig();
        this._interface = null;

        this._STATES = this._stateCodes();

        return this._state = this._STATES.WAITING_FOR_BINDING;
    }


    bind(targetCmp, configObj) {

        if (!$(targetCmp).length > 0)
            return this._state = this._STATES.INVALID_TARGET_COMPONENT;

        this._$sourceHtmlObj = $(targetCmp);

        const _tmpName = this._$sourceHtmlObj.attr('data-selector-name').trim();
        _tmpName ? this._instanceName = _tmpName : this._instanceName = this._STATES.UNKNOWN_TARGET_NAME;

        const _tmpResponse = this._config.assignConfig(configObj);
        _tmpResponse ? this._state = this._STATES.BINDED : this._state = this._STATES.INVALID_CONFIG_OBJECT;

        return this._state;
    }


    _init() {

        if (this._state === this._STATES.BINDED) {

            this._interface = new SelectorInterface(this._$sourceHtmlObj);
            this._interface.render();

            this._state = this._STATES.RUNNING;
        }

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


    enable() {


    }


    disable() {


    }


    update() {


    }


    selectItems(target) {


    }


    unselectItems(target) {


    }


    clear() {


    }


    destroy() {


    }


    getErrorMsg(code) {

        // Do stuff
    }


    _submitInterfaceError(code) {

        // this._interface.error(code);
    }


    _stateCodes() {

        return {

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
    }
}