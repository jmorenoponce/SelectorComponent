'use strict';


import {Selector_Core} from './Selector_Core';
import {Utility} from '../../utils/Utility';


export class Selector_Manager {


	constructor() {

		this._id = null;
		this._instances_obj = [];

		this._initialize();
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
	 * @param target_id
	 */
	get_instance_by_id(target_id) {

		return this._get_instance_by_any_property('id', target_id);
	}


	/**
	 * @param target_name
	 */
	get_instance_by_name(target_name) {

		return this._get_instance_by_any_property('name', target_name);
	}


	/**
	 * Sends command action behaviour to managed target component.
	 * @param target_id
	 * @param action
	 * @returns {boolean}
	 */
	send_instance_action(target_id, action) {

		const ids = typeof (target_id) == 'object' ? target_id : [target_id];

		for (let id of ids) {

			// Do stuff...
			console.log(this.get_instance_by_id(id), action);
		}

		return true;
	}


	get id() {

		return this._id;
	}


	/**
	 * Initialize the manager instance width new id.
	 * @private
	 */
	_initialize() {

		this._id = this._generate_id();
	}


	/**
	 * Returns object instance looking for targetValue in any property as key.
	 * @param property
	 * @param target_value
	 * @returns {boolean|number}
	 * @private
	 */
	_get_instance_by_any_property(property, target_value) {

		let tmpResponse = this._instances_obj.findIndex((instance) => instance[property] === target_value);

		if (tmpResponse < 0) {
			return false;
		}

		return this._instances_obj[tmpResponse];
	}


	/**
	 * Wrap method for getting any Uuid number.
	 * @returns {string}
	 * @private
	 */
	_generate_id() {

		return Utility.generate_uuid();
	}
}
