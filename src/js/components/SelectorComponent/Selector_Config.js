'use strict';


export class Selector_Config {


    static _CONFIG_DEFAULT = {

        category_key: null,
        is_active: true,
        is_editable: true,
        label: 'Selección:',
        placeholder: 'Seleccionar...',
        search_placeholder: 'Buscar...',
        searching_text: 'Buscando...',
        search_results_none: 'No hay resultados para esta búsqueda',
        min_width: 'auto',
        max_rows: 10
    };


    static _CONFIG_MAP = {

        category_key: {
            is_nullable: true,
            type: 'string',
        },
        is_active: {
            is_nullable: false,
            type: 'boolean',
        },
        is_editable: {
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
        search_placeholder: {
            isNullable: true,
            type: 'string',
        },
        searching_text: {
            isNullable: true,
            type: 'string',
        },
        search_results_none: {
            isNullable: true,
            type: 'string',
        },
        min_width: {
            isNullable: true,
            type: 'string',
        },
        max_rows: {
            is_nullable: true,
            type: 'number',
        }
    };


    constructor() {

        this._config_obj = {};

        this.data_params = {};
        this.ui_params = {};
    }


    /**
     * Returns a new config object after validation process
     * @param new_config
     * @returns {boolean}
     */
    assign(new_config) {

        let tmpConfig = {};

        $.extend(true, tmpConfig, Selector_Config._CONFIG_DEFAULT, new_config);

        if (!this._validate_config(tmpConfig)) {
            return false;
        }

        this._config_obj = tmpConfig;

        return true;
    }


    /**
     * Returns config validation response comparing the new object with config map
     * @param new_config
     * @returns {boolean}
     * @private
     */
    _validate_config(new_config) {

        for (const key in Selector_Config._CONFIG_MAP) {

            const keySpec = Selector_Config._CONFIG_MAP[key];
            const entryVal = new_config[key];

            if (typeof entryVal !== keySpec.type) {
                return false;
            }
        }

        return true;
    }
}