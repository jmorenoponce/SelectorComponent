'use strict';


export class SelectorUi {


    static _SELECTORS = {

        // General
        SOURCE_HIDDEN: '.ui-selector-source-hidden',

        // Actions
        ENABLE: '.ui-selector-enable',
        DISABLE: '.ui-selector-disable',
        DROPDOWN_EXPANDED: '.ui-selector-dropdown-expanded',
        VIEW_GROUPED: '.ui-selector-view-grouped',
        VIEW_EXTENDED: '.ui-selector-view-extended',

        // States
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


    constructor(htmlObj) {

        this._$sourceHtmlObj = htmlObj;
        this._error = undefined;
    }


    createElement() {

        this._$sourceHtmlObj.addClass(SelectorUi._SELECTORS.SOURCE_HIDDEN);
    }


    name() {

        return $.trim(this._$sourceHtmlObj.attr('data-selector-name'));
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


    }
}