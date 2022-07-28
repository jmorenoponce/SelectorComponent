'use strict';


import {SelectorInterface} from './SelectorInterface.js';
import $ from "jquery";


export class SelectorCore {


    constructor(managerId, instanceId) {

        this._STATES = {
            WAITING_FOR_BINDING: 100,
            BINDED: 200,
            RUNNING: 210,
            STOPPED: 220,
            FINISHED: 230,
            INVALID_CONFIG_OBJECT: 400,
            UNKNOWN_SOURCE_DATA: 410,
            INVALID_SOURCE_DATA: 420,
            UNKNOWN_PROBLEM: 900
        }

        this._managerId = managerId;

        this._instanceId = instanceId;
        this._instanceName = this._STATES.UNKNOWN_SOURCE_DATA;

        this._interface = undefined;
        this._htmlObjDom = undefined;

        this._configObj = {
            active: false,
            editable: false,
            dataSrc: ''
        };

        this._state = this._STATES.WAITING_FOR_BINDING;

        return this._state;
    }


    bind(component, configObj) {

        if (!this._validateConfig(configObj)) {
            this._state = this._STATES.INVALID_CONFIG_OBJECT;
            return this._state;
        }

        // Refactor: esto va a la función _declareObject()
        this._htmlObjDom = $(component);
        this._configObj = Object.assign(configObj);
        this._state = this._STATES.BINDED;

        let _tmpName = this._htmlObjDom.attr('data-selector-name').trim();
        _tmpName ? this._instanceName = _tmpName : false;

        return true;
    }


    _init() {

        this._interface = new SelectorInterface(this._htmlObjDom);
        this._state = this._STATES.RUNNING;

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


    _validateConfig(config) {

        console.log('Objeto de configuración: ', config);

        return true;
    }


    // _submitInterfaceError(code) {
    //
    //     this._interface.error(code);
    // }
    //
    //
    // _submitAction(subject) {
    //
    //     this._submitInterfaceError(subject);
    // }
}
