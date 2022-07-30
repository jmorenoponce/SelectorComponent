'use strict';


import {SelectorConfig} from "./SelectorConfig";
import {SelectorInterface} from './SelectorInterface.js';
import $ from "jquery";


export class SelectorCore {


    constructor(managerId, instanceId) {

        this._managerId = managerId;

        this._instanceId = instanceId;
        this._instanceName = null;

        this._config = new SelectorConfig();
        this._interface = null;
        this._htmlObj = null;

        this._state = this._config.STATES.WAITING_FOR_BINDING;

        return this._state;
    }


    bind(component, configObj) {

        this._tmpResponse = this._config.validateConfig(configObj);

        if (typeof this._tmpResponse === 'object') {
            this._config.assignConfig(this._tmpResponse);
            this._htmlObj = $(component);

            let _tmpName = this._htmlObj.attr('data-selector-name').trim();
            _tmpName ? this._instanceName = _tmpName : false;

            this._state = this._config.STATES.BINDED;
        } else {
            this._state = this._tmpResponse;
        }

        return this._state;
    }


    _init() {

        if (this._state === this._config.STATES.BINDED) {
            this._interface = new SelectorInterface(this._htmlObj);
            this._state = this._config.STATES.RUNNING;

        } else {
            console.log('Problema de configuración:', this._state);
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


    setValues(target, newValue) {

    }


    emptyValues(target) {
    }


    selectItems(target) {
    }


    unselectItems(target) {
    }


    enable() {
    }


    disable() {

    }


    destroy() {
    }


    _submitInterfaceError(code) {

        // this._interface.error(code);
    }
}
