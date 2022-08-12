'use strict';


import {SelectorCore} from './SelectorCore.js';
import {UtilityClass as Util} from '../Util/UtilityClass.js';


export class SelectorManager {


    constructor() {

        this._id = null;
        this._instancesObj = [];

        this._initialize();
    }


    /**
     * Initialize the manager instance width new id.
     * @private
     */
    _initialize() {

        this._id = this._generateId();
    }


    /**
     * Create new instance core width new id and passing manager parent id
     * @returns {SelectorCore}
     */
    instanceNew() {

        let tmpId = this._generateId();
        let tmpObj = new SelectorCore(tmpId, this._id);

        this._instancesObj.push(tmpObj);

        return tmpObj;
    }


    get id() {

        return this._id;
    }


    /**
     * Returns amount of component instances managed for this manager instance
     * @returns {number}
     */
    get instancesAmount() {

        return this._instancesObj.length;
    }


    /**
     * Returns all component instances managed for this manager instance
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
