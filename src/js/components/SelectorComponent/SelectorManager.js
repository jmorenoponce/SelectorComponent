'use strict';


import {SelectorCore} from './SelectorCore.js';
import {UtilityClass} from '../Util/UtilityClass.js';


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
     * Create new instance core width new id and passing manager parent id.
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

        return this._getInstanceByProperty('id', targetId);
    }


    /**
     * @param targetName
     */
    getInstanceByName(targetName) {

        return this._getInstanceByProperty('name', targetName);
    }


    /**
     * Returns object instance looking for targetValue in any property as key.
     * @param prop
     * @param targetValue
     * @returns {boolean|number}
     * @private
     */
    _getInstanceByProperty(prop, targetValue) {

        let tmpResponse = this._instancesObj.findIndex((instance) => instance[prop] === targetValue);

        if (tmpResponse < 0) {
            return false;
        }

        return this._instancesObj[tmpResponse];
    }


    /**
     * Sends command action behaviour to managed target component.
     * @param targetId
     * @param action
     * @returns {boolean}
     */
    sendInstanceAction(targetId, action) {

        const ids = typeof (targetId) == 'object' ? targetId : [targetId];

        for (let id of ids) {

            // Do stuff...
            console.log(this.getInstanceById(id), action);
        }

        return true;
    }


    /**
     * Wrap method for getting any Uuid number.
     * @returns {string}
     * @private
     */
    _generateId() {

        return UtilityClass.generateUuid();
    }
}
