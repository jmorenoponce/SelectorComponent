'use strict';


import {SelectorComponent} from './SelectorComponent';
import {UtilityClass} from '../Util/UtilityClass';


export class SelectorManager {


    constructor() {

        this._selectors = {
            observable_items: '.ux-select-observe'
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
        let _tmpObj = new SelectorComponent(this._id, _tmpId);

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

        const _tmpUtil = new UtilityClass();
        return _tmpUtil.generateUuid();
    }
}
