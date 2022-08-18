'use strict';


// import {UserInterfaceTpl} from "./UserInterfaceTpl.html";


export class Selector_Ui {


    static _CSS_UI_CLASSES = {

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
    }


    static _CSS_UX_CLASSES = {

        /// Do stuff...
    }


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
    }


    constructor() {

        this._$native_cmp = {};
        this._config_obj = {};

        this._is_binded = false;
        this._is_grupable = false;
        this._is_extendable = false;
    }


    /**
     * Establishes source native Html select that handle final results.
     * @param source_cmp
     * @returns {boolean}
     */
    set_native_component(source_cmp) {

        let $source_cmp = $(source_cmp);
        if (!$source_cmp.length > 0) {
            return false;
        }

        this._$native_cmp = $source_cmp;
        this._is_binded = true;

        return true;
    }


    _render() {

        console.log('Component Painted');
    }


    _get_native_name() {

        return this._$native_cmp.attr('data-selector-name');
    }


    get_native_name() {

        return this._get_native_name();
    }


    _get_native_value() {

        return this._$native_cmp.html();
    }


    get_native_value() {

        return this._get_native_value();
    }


    /**
     * Updates native select value
     */
    _update_native_value() {

        let _opts = '';

        let _prev_value = this._$native_cmp.html();

        for (id of this._selectedIds) {
            _opts += '<option value="' + id + '" selected="selected"></option>';
        }

        this._$native_cmp.html(_opts);

        // Fire native select on change event
        if (_opts !== _prev_value) {
            this._$native_cmp.trigger('change');
        }
    }


    update() {


    }


    enable() {

        console.log('enable');
    }


    disable() {

        console.log('disable');
    }
}