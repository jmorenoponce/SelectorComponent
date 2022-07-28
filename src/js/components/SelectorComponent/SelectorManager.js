'use strict';


import {SelectorCore} from './SelectorCore.js';
import {UtilityClass as Util} from '../Util/UtilityClass.js';


export class SelectorManager {


    constructor() {

        this._selectors = {
            observable_items: '.ux-select-observer'
        };

        this._id = undefined;
        this._instancesObj = [];

        this._initialize();
    }


    _initialize() {

        this._id = this._generateId();
    }


    instanceNew() {

        let _tmpId = this._generateId();
        let _tmpObj = new SelectorCore(this._id, _tmpId);

        this._instancesObj.push(_tmpObj);

        return _tmpObj;
    }


    get id() {

        return this._id;
    }


    get instancesAmount() {

        return this._instancesObj.length;
    }


    get instancesObj() {

        return this._instancesObj;
    }


    submitInstanceAction(target, action) {

        // Do stuff...
    }


    _generateId() {

        return Util.generateUuid();
    }
}
