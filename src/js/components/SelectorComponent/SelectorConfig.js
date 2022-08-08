'use strict';


export class SelectorConfig {


    static _CONFIG_MAP = {

        isActive: {
            isNullable: false,
            type: 'boolean',
        },
        isEditable: {
            isNullable: false,
            type: 'boolean',
        },
        label: {
            isNullable: true,
            type: 'string',
        },
        placeholder: {
            isNullable: true,
            type: 'string',
        },
        searchPlaceholder: {
            isNullable: true,
            type: 'string',
        },
        searchingText: {
            isNullable: true,
            type: 'string',
        },
        searchResultsNone: {
            isNullable: true,
            type: 'string',
        },
        minWidth: {
            isNullable: true,
            type: 'string',
        },
        maxRows: {
            isNullable: true,
            type: 'number',
        },
        dataSource: {
            isNullable: false,
            type: 'object',
        }
    };


    static _CONFIG_DEFAULT = {
        isActive: true,
        isEditable: true,
        label: 'Selección:',
        placeholder: 'Seleccionar...',
        searchPlaceholder: 'Buscar...',
        searchingText: 'Buscando...',
        searchResultsNone: 'No hay resultados para esta búsqueda',
        minWidth: 'auto',
        maxRows: 10,
        dataSource: false,
    };


    constructor() {

        this.configObj = {};

        this._isValid = false;
    }


    assign(newConfig) {

        let _newConfig = {};

        $.extend(true, _newConfig, SelectorConfig._CONFIG_DEFAULT, newConfig);

        if (this._validateConfig(_newConfig)) {
            this._isValid = true;
        }

        this.configObj = _newConfig;
    }


    isValid () {
        return this._isValid;
    }


    _validateConfig(_newConfig) {

        for (const _key in SelectorConfig._CONFIG_MAP) {

            const _key_spec = SelectorConfig._CONFIG_MAP[_key];
            const _entry_val = _newConfig[_key];

            // Validate same type
            if (typeof _entry_val !== _key_spec.type) {
                return false;
            }

            // Validate nullable key
            if (_key_spec.isNullable && _entry_val === null) {
                return false;
            }
        }

        return true;
    }
}
