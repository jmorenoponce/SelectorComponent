'use strict'


import {SelectorComponent} from './SelectorComponent';
import {UtilityClass} from '../General/UtilityClass';


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


    get id() {

        return this._id;
    }


    instanceNew() {

        let _tmpId = this._generateId();
        let _tmpObj = new SelectorComponent(this._id, _tmpId);

        this._instancesObj.push(_tmpObj);

        return _tmpObj;
    }


    get instancesObj() {

        return this._instancesObj;
    }


    get instancesAmount() {

        return this._instancesObj.length;
    }


    sendInstanceAction(target, callback) {

        // Do stuff...
    }


    _generateId() {

        const _tmpUtil = new UtilityClass();
        return _tmpUtil.generateUuid();
    }
}
