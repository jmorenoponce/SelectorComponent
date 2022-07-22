'use strict';


export class selectorInterface {

    constructor(htmlObj) {

        this._htmlObj = htmlObj;
    }

    test() {

        return this._htmlObj;
    }
}