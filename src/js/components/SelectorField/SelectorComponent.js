'use strict'


class SelectorComponent {


    constructor(managerId, instanceId) {

        this._STATES = {
            WHAITING_FOR_BINDING: 100,
            BINDED: 200,
            RUNNING: 210,
            WRONG_SOURCE_DATA: 400,
            UNKNOWN_SOURCE_DATA: 410,
            WRONG_CONFIG_OBJECT: 410,
            UNKNOWN_PROBLEM: 900
        }

        this._managerId = managerId;
        this._instanceId = instanceId;
        this._name = undefined;

        this._configObj = {
            active: undefined,
            editable: undefined,
            dataSrc: ''
        };

        this._state = this._STATES.WHAITING_FOR_BINDING;

        return this._state;
    }


    bind(component, configObject) {

        component ? this._name = component.attr('data-name') : false;

        this._validateConfig(configObject) ? this._configObj = configObject : this._state = this._STATES.WRONG_CONFIG_OBJECT;
    }


    _init() {

        // let _this = this; // ?????
    }


    init() {

        this._init();
    }


    _validateConfig(config) {

        console.log('Objeto de configuración: ', config);

        return true;
    }


    _loadDataFromFile() {

        let f_fileUrl = this._configObj.dataSrc;

        // Haz cosas...

        // !f_fileUrl ? this._state = this._STATES.WRONG_SOURCE_DATA : this._state = this._STATES.BINDED;
    };


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


    get id() {

        return this._instanceId;
    }


    get name() {

        return this._name;
    }


    set name(newName) {

        this._name = newName;
    }


    get state() {

        return this._state;
    }

}
