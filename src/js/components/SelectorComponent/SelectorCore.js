'use strict';


import {SelectorConfig} from "./SelectorConfig";
import {SelectorInterface} from './SelectorInterface.js';
import $ from "jquery";


export class SelectorCore {


    constructor(managerId, instanceId) {

        this._managerId = managerId;

        this._instanceId = instanceId;
        this._instanceName = undefined;

        this._config = new SelectorConfig();
        this._interface = undefined;
        this._htmlObj = undefined;

        this._state = this._config.STATES.WAITING_FOR_BINDING;

        return this._state;
    }


    bind(component, configObj) {

        if (!this._config.validateConfig(configObj)) {
            this._state = this._config.STATES.INVALID_CONFIG_OBJECT;
            return this._state;
        }

        // Refactor: esto va a la función _declareObject()
        this._htmlObj = $(component);
        this._configObj = Object.assign(configObj);
        this._state = this._config.STATES.BINDED;

        let _tmpName = this._htmlObj.attr('data-selector-name').trim();
        _tmpName ? this._instanceName = _tmpName : false;

        return this._state;
    }


    _init() {

        this._interface = new SelectorInterface(this._htmlObj);
        this._state = this._config.STATES.RUNNING;

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


    _submitInterfaceError(code) {

        // this._interface.error(code);
    }
}
