

class SelectorComponent {


    // ESTADOS: (Por definir)
    //

    constructor(managerId, instanceId) {

        this._STATES = {
            WHAITING_FOR_BINDING: 100,
            BINDED: 200,
            RUNNING: 210,
            WRONG_SOURCE_DATA: 400,
            UNKNOWN_PROBLEM: 900
        }

        this._managerId = managerId;
        this._instanceId = instanceId;
        this._status = this._STATES.WHAITING_FOR_BINDING;
        this._name = undefined;
        this._configObj = {
            active: undefined,
            searchable: undefined,
            dataSrc: undefined
        };
    }


    bind(component, configObject) {

        component ? this._name = component.attr('data-name') : false;

        return this._validateConfig();
    }


    init() {

        this._init();
    }


    _init() {

        let _this = this; // ?????
    }


    _validateConfig() {

        console.log('Objeto de configuración: ', this._configObj);

        return true;
    }


    _loadDataFromFile() {

        let f_fileUrl = this._configObj.dataSrc;

        !f_fileUrl ? this._status = 200 : this._status = this._getDefaultConfig();
    };


    _getDefaultConfig() {

        return {

            //Do Stuff
        };
    }


    deactivate(subject) {

        this._showError(subject);
    }


    _showError(msg) {

    }


    get id() {

        return this._id;
    }


    get name() {

        return this._name;
    }
}
