'use strict';


import $ from "jquery";


export class SelectorInterface {


    constructor(htmlObj) {

        this._htmlObj = htmlObj;
        this._error = undefined;
    }


    createElement () {


    }


    render() {

        return this._htmlObj;
    }


    getError(code) {

        this.error = code;
    }
}