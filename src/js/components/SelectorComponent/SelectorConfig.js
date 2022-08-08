'use strict';


export class SelectorConfig {


    constructor() {

        this._PATTERN_CONFIG = this._patternConfig();

        this.configObj = {};
    }


    assignConfig(newConfig) {

        let _tmpResponse = this._validateConfig(newConfig);

        return _tmpResponse ? this.configObj = Object.assign(_tmpResponse) : false;
    }


    _defaultConfig() {

        let _tmpConfig = {};

        const _entries = Object.entries(this._PATTERN_CONFIG);

        for (const _parts of _entries) {

            const [_key, _values] = _parts;
            Object.assign(_tmpConfig, {[_key]: _values.defaultValue});
        }

        return _tmpConfig;
    }


    _validateConfig(configObj) {

        let _newConfig = {};
        let _isValid = true;

        const _entries = Object.entries(this._PATTERN_CONFIG);

        for (const _parts of _entries) {

            const [_key, _values] = _parts;
            let _newValue = null;

            if (!Object.keys(configObj).includes(_key)) {

                if (!_values.isNullable)
                    return _isValid = false;

                _newValue = _values.defaultValue;
            } else {

                if (typeof configObj[_key] !== _values.type.name.toLowerCase())
                    return _isValid = false;

                _newValue = configObj[_key];
            }

            Object.assign(_newConfig, {[_key]: _newValue});
        }

        return _isValid ? _newConfig : _isValid;
    }


    _patternConfig() {

        return {
            isActive: {
                isNullable: false,
                type: Boolean,
                defaultValue: true
            },
            isEditable: {
                isNullable: false,
                type: Boolean,
                defaultValue: true
            },
            label: {
                isNullable: true,
                type: String,
                defaultValue: 'Selección:'
            },
            placeholder: {
                isNullable: true,
                type: String,
                defaultValue: 'Seleccionar...',
            },
            searchPlaceholder: {
                isNullable: true,
                type: String,
                defaultValue: 'Buscar...',
            },
            searchingText: {
                isNullable: true,
                type: String,
                defaultValue: 'Buscando...',
            },
            searchResultsNone: {
                isNullable: true,
                type: String,
                defaultValue: 'No hay resultados para esta búsqueda',
            },
            minWidth: {
                isNullable: true,
                type: String,
                defaultValue: 'auto'
            },
            maxRows: {
                isNullable: true,
                type: Number,
                defaultValue: 10
            },
            dataSource: {
                isNullable: false,
                type: Object,
                defaultValue: false
            }
        };
    }
}
