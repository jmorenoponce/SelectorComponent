'use strict'

import $ from "jquery";

export class SelectorComponent {


    constructor(managerId, instanceId) {

        this._STATES = {
            WAITING_FOR_BINDING: 100,
            BINDED: 200,
            RUNNING: 210,
            STOPPED: 220,
            WRONG_SOURCE_DATA: 400,
            UNKNOWN_SOURCE_DATA: 410,
            WRONG_CONFIG_OBJECT: 420,
            UNKNOWN_PROBLEM: 900
        }

        this._managerId = managerId;

        this._instanceId = instanceId;
        this._instanceName = undefined;

        this._configObj = {
            active: false,
            editable: false,
            dataSrc: ''
        };

        this._state = this._STATES.WAITING_FOR_BINDING;

        return this._state;
    }


    bind(component, configObj) {

        let $_component = $(component);

        let _tmpName = $_component.attr('data-selector-name').trim();
        _tmpName ? this._instanceName = _tmpName : false;

        if (!this._validateConfig(configObj)) {
            this._state = this._STATES.WRONG_CONFIG_OBJECT;
            return false;
        }

        this._configObj = Object.assign(configObj);
        this._state = this._STATES.BINDED;
        return true;
    }


    _init() {

        // Do Stuff...
    }


    init() {

        this._init();
    }


    get managerId() {

        return this._managerId;
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


    _validateConfig(config) {

        console.log('Objeto de configuración: ', config);

        return true;
    }


    _getDefaultConfig() {

        return {
            active: true,
            editable: true,
            dataSrc: this._STATES.UNKNOWN_SOURCE_DATA
        };
    }


    deactivate(subject) {

        this._showError(subject);
    }


    _showError(msg) {


    }
}
