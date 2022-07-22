'use strict'

import { v4 as uuidv4 } from 'uuid';
import { SelectorComponent } from './SelectorComponent';


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

        return this._instancesObj.count();
    }


    sendAction(target, callback) {

        // Do stuff...
    }


    _generateId() { // Todo: Llévalo a una clase utilitaria

        return uuidv4(); // Todo: Wrapear !important
    }
}
