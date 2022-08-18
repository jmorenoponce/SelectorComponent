'use strict';


import {Selector_Core} from './Selector_Core';
import {Util_Class} from '../Util/Util_Class';


export class Selector_Manager {


    constructor() {

        this._id = null;
        this._instances_obj = [];

        this._initialize();
    }


    /**
     * Initialize the manager instance width new id.
     * @private
     */
    _initialize() {

        this._id = this._generate_id();
    }


    /**
     * Create new instance core width new id and passing manager parent id.
     * @returns {Selector_Core}
     */
    instance_create() {

        let tmpId = this._generate_id();
        let tmpObj = new Selector_Core(tmpId, this._id);

        this._instances_obj.push(tmpObj);

        return tmpObj;
    }


    get id() {

        return this._id;
    }


    /**
     * Returns object that contains all component instances managed for this manager.
     * @returns {[]}
     */
    get instances_obj() {

        return this._instances_obj;
    }


    /**
     * Returns amount of component instances managed for this manager.
     * @returns {number}
     */
    get instances_amount() {

        return this._instances_obj.length;
    }


    /**
     * @param targetId
     */
    get_instance_by_id(targetId) {

        return this._get_instance_by_any_property('id', targetId);
    }


    /**
     * @param targetName
     */
    get_instance_by_name(targetName) {

        return this._get_instance_by_any_property('name', targetName);
    }


    /**
     * Returns object instance looking for targetValue in any property as key.
     * @param prop
     * @param targetValue
     * @returns {boolean|number}
     * @private
     */
    _get_instance_by_any_property(prop, targetValue) {

        let tmpResponse = this._instances_obj.findIndex((instance) => instance[prop] === targetValue);

        if (tmpResponse < 0) {
            return false;
        }

        return this._instances_obj[tmpResponse];
    }


    /**
     * Sends command action behaviour to managed target component.
     * @param targetId
     * @param action
     * @returns {boolean}
     */
    send_instance_action(targetId, action) {

        const ids = typeof (targetId) == 'object' ? targetId : [targetId];

        for (let id of ids) {

            // Do stuff...
            console.log(this.get_instance_by_id(id), action);
        }

        return true;
    }


    /**
     * Wrap method for getting any Uuid number.
     * @returns {string}
     * @private
     */
    _generate_id() {

        return Util_Class.generate_uuid();
    }
}
