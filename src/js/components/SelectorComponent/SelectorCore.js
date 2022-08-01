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
        this._htmlObj = null;
        this._interface = null;

        return this._state = this._config.STATES.WAITING_FOR_BINDING;
    }


    bind(component, configObj) {

        this._state = this._config.assignConfig(configObj);

        if (typeof this._state === 'object') {
            this._htmlObj = $(component);
            let _tmpName = this._htmlObj.attr('data-selector-name').trim();
            _tmpName ? this._instanceName = _tmpName : false;

            this._state = this._config.STATES.BINDED;
        }
        return this._state;
    }


    _init() {

        if (this._state === this._config.STATES.BINDED) {
            this._interface = new SelectorInterface(this._htmlObj);
            this._state = this._config.STATES.RUNNING;
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
