'use strict';


import {SelectorConfig} from "./SelectorConfig";
import {SelectorInterface} from './SelectorInterface.js';

import $ from "jquery";


export class SelectorCore {


    constructor(managerId, instanceId) {

        this._managerId = managerId;

        this._instanceId = instanceId;
        this._instanceName = null;

        // Todo: Refactor, la config la lleva la interface
        this._config = new SelectorConfig();
        this._sourceHtmlObj = null;
        this._interface = null; // Todo: Retorna State

        // Todo: Refactor, los states vienen de la interface ¿pero necesito estados aquí en Core?
        this._state = this._config.STATES.WAITING_FOR_BINDING;

        return this._state;
    }


    bind(component, configObj) {

        let _tmpResponse = this._config.assignConfig(configObj);

        if (!$(component).length > 0) {

        }


        if (typeof _tmpResponse === 'object') {

            this._sourceHtmlObj = $(component); // Todo: Validar componente

            let _tmpName = this._sourceHtmlObj.attr('data-selector-name').trim();
            _tmpName ? this._instanceName = _tmpName : false;

            this._state = this._config.STATES.BINDED;

        } else {

            this._state = _tmpResponse;
        }

        return this._state;
    }


    _init() {

        if (this._state === this._config.STATES.BINDED) {

            // Todo: Refactor, instancia la interface en el bind para darle config, y que la guarde ella
            this._interface = new SelectorInterface(this._sourceHtmlObj, this._config.configObj);
            this._state = this._config.STATES.RUNNING; // Todo: again
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


    _submitInterfaceError(code) {

        // this._interface.error(code);
    }
}
