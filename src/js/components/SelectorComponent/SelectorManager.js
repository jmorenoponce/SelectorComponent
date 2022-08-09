'use strict';


import {SelectorCore} from './SelectorCore.js';
import {UtilityClass as Util} from '../Util/UtilityClass.js';


export class SelectorManager {


    constructor() {

        this._id = null;
        this._instancesObj = [];

        this._initialize();
    }


    _initialize() {

        this._id = this._generateId();
    }


    /**
     *
     * @returns {SelectorCore}
     */
    instanceNew() {

        let tmpId = this._generateId();
        let tmpObj = new SelectorCore(this._id, tmpId);

        this._instancesObj.push(tmpObj);

        return tmpObj;
    }


    get id() {

        return this._id;
    }


    /**
     *
     * @returns {number}
     */
    get instancesAmount() {

        return this._instancesObj.length;
    }


    /**
     *
     * @returns {[]}
     */
    get instancesObj() {

        return this._instancesObj;
    }


    /**
     *
     * @param target
     * @param action
     */
    submitInstanceAction(target, action) {

        // Do stuff...
    }


    _generateId() {

        return Util.generateUuid();
    }
}
