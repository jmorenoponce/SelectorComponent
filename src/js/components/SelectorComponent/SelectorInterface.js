'use strict';


import $ from "jquery";


export class SelectorInterface {


    constructor(htmlObj) {

        this._sourceHtmlObj = htmlObj;
        this._selectors = this._selectorsDefinitions;

        this._error = undefined;

        $(this._sourceHtmlObj).addClass('.hidden'); // Test
    }


    createElement () {




    }


    _selectorsDefinitions() {

        return {

            enable:             '.ui-enable',
            disable:            '.ui-disable',
            dropdownExpanded:   '.ui-expanded',
            dropdownCollapsed:  '.ui-collapsed',
            error:              '.ui-error'
        };
    }


    render() {

        return this._htmlObj;
    }


    getError(code) {

        this.error = code;
    }
}