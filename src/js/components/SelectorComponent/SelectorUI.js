'use strict';


// import {UserInterfaceTpl} from "./UserInterfaceTpl.html";


export class SelectorUI {


    static _CONFIG_DEFAULT = {

        isActive: true,
        isEditable: true,
        label: 'Selección:',
        placeholder: 'Seleccionar...',
        searchPlaceholder: 'Buscar...',
        searchingText: 'Buscando...',
        searchResultsNone: 'No hay resultados para esta búsqueda',
        minWidth: 'auto',
        maxRows: 10
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
        }
    };


    static _CSS_CLASSES = {

        // General
        SOURCE_OBJECT_HIDDEN: '.ui-selector-source-hidden',

        // Actions
        ENABLE: '.ui-selector-enable',
        DISABLE: '.ui-selector-disable',
        DROPDOWN_EXPANDED: '.ui-selector-dropdown-expanded',
        VIEW_GROUPED: '.ui-selector-view-grouped',
        VIEW_EXTENDED: '.ui-selector-view-extended',

        // States
        IS_LOADING: '.ui-selector-loading',
        HAS_ERROR: '.ui-selector-has-error'
    };


    static _KEY_CODES = {

        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46
    };


    constructor() {

        this.configObj = {};
        this._$nativeComponent = {};
        this._err_c = undefined;
    }


    setNativeObj(sourceCmp) {

        let $sourceCmp = $(sourceCmp);

        if (!$sourceCmp.length > 0) {
            return false;
        }

        this._$nativeComponent = $sourceCmp
        return true;
    }


    /**
     * Returns a new config object after validation process
     * @param newConfig
     * @returns {boolean}
     */
    assignConfig(newConfig) {

        let tmpConfig = {};

        $.extend(true, tmpConfig, SelectorUI._CONFIG_DEFAULT, newConfig);

        if (!this._validateConfig(tmpConfig)) {
            return false;
        }

        this.configObj = tmpConfig;
        return true;
    }


    /**
     * Returns config validation response comparing the new object with config map
     * @param newConfig
     * @returns {boolean}
     * @private
     */
    _validateConfig(newConfig) {

        for (const key in SelectorUI._CONFIG_MAP) {

            const keySpec = SelectorUI._CONFIG_MAP[key];
            const entryVal = newConfig[key];

            if (typeof entryVal !== keySpec.type) {
                return false;
            }

            // Al hacer $.extend ya tendremos todas las keys necesarias, no faltará ninguna.
            // if (keySpec.isNullable && entryVal === null) {
            //     return false;
            // }
        }

        return true;
    }


    isValidNativeComponent() {

        return this._isValidNativeComponent;
    }


    isValidConfig() {

        return this._isValidConfig;
    }


    create() {

        this._$nativeComponent.addClass(SelectorUI._CSS_CLASSES.SOURCE_OBJECT_HIDDEN);
        return this.name()
    }


    _getNativeValue() {

        return this._$nativeComponent.html();
    }


    getNativeValue() {

        return this._getNativeValue();
    }


    /**
     * Updates native select value
     */
    _updateNativeValue() {

        let _opts = '';

        let _prev_value = this._$ui.html();

        for (id of this._selectedIds) {
            _opts += '<option value="' + id + '" selected="selected"></option>';
        }

        this.$select.html(_opts);

        // Fire native select on change event
        if (_opts != _prev_value) {
            this.$select.trigger('change');
        }
    }


    name() {

        return this._$nativeComponent.attr('data-selector-name');
    }


    update() {


    }


    render() {


    }


    /**
     *
     * @param code
     */
    getError(code) {

        return this._err_c;
    }
}