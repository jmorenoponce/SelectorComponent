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
     * Returns amount of component instances managed for this manager.
     * @returns {number}
     */
    get instancesAmount() {

        return this._instancesObj.length;
    }


    /**
     * Returns object that contains all component instances managed for this manager.
     * @returns {[]}
     */
    get instancesObj() {

        return this._instancesObj;
    }


    /**
     * @param targetId
     */
    getInstanceById(targetId) {

        return this._getInstanceByProp('id', targetId);
    }


    /**
     * @param targetName
     */
    getInstanceByName(targetName) {

        return this._getInstanceByProp('name', targetName);
    }


    /**
     * Returns object instance looking for targetValue in any property as key.
     * @param prop
     * @param targetValue
     * @returns {boolean|number}
     * @private
     */
    _getInstanceByProp(prop, targetValue) {

        let tmpResponse = this._instancesObj.findIndex((instance) => instance[prop] === targetValue);

        if (tmpResponse < 0) {
            return false;
        }

        return this._instancesObj[tmpResponse];
    }


    /**
     *
     * @param targetId
     * @param action
     */
    sendInstanceAction(targetId, action) {

        // Do stuff...
    }


    _generateId() {

        return Util.generateUuid();
    }
}
