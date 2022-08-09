'use strict';


export class SelectorConfig {


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


    constructor() {

        this.configObj = {};

        this._isValid = false;
    }


    /**
     *
     * @param newConfig
     */
    assign(newConfig) {

        let tmpConfig = {};

        $.extend(true, tmpConfig, SelectorConfig._CONFIG_DEFAULT, newConfig);

        if (this._validate(tmpConfig)) {
            this._isValid = true;
        }

        this.configObj = tmpConfig;
    }


    isValid() {

        return this._isValid;
    }


    /**
     *
     * @param newConfig
     * @returns {boolean}
     * @private
     */
    _validate(newConfig) {

        for (const key in SelectorConfig._CONFIG_MAP) {

            const keySpec = SelectorConfig._CONFIG_MAP[key];
            const entryVal = newConfig[key];

            if (typeof entryVal !== keySpec.type) {
                return false;
            }

            if (keySpec.isNullable && entryVal === null) {
                return false;
            }
        }

        return true;
    }
}
