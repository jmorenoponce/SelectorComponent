'use strict';


import {SelectorConfig} from "./SelectorConfig";
import {SelectorUi} from './SelectorUi.js';


export class SelectorCore {


	static _STATES = {

		// Informative
		WAITING_FOR_BINDING: 100,

		// Successful
		BINDED: 200,
		RUNNING: 210,
		STOPPED: 220,
		FINISHED: 230,

		// Error
		INVALID_TARGET_COMPONENT: 400,
		UNKNOWN_TARGET_NAME: 410,
		INVALID_CONFIG_OBJECT: 420,
		INVALID_SOURCE_DATA: 430,
		UNKNOWN_SOURCE_DATA: 440,

		// Other
		UNKNOWN_PROBLEM: 900
	};


	/**
	 *
	 * @param managerId
	 * @param instanceId
	 * @returns {number}
	 */
	constructor(managerId, instanceId) {

		this._managerId = managerId;

		this._instanceId = instanceId;
		this._instanceName = null;

		this._config = new SelectorConfig();
		this._interface = null;

		this._state = SelectorCore._STATES.WAITING_FOR_BINDING;
		return this._state;
	}


	/**
	 *
	 * @param targetCmp
	 * @param configObj
	 * @returns {number}
	 */
	bind(targetCmp, configObj) {

		let $targetCmp = $(targetCmp);
		if (!$targetCmp.length > 0) {
			this._state = SelectorCore._STATES.INVALID_TARGET_COMPONENT;
			return this._state;
		}

		this._instanceName = this._interface.name();
		this._interface = new SelectorUi($targetCmp);
		this._config.assign(configObj);

		this._state = this._config.isValid() ?
			SelectorCore._STATES.BINDED :
			SelectorCore._STATES.INVALID_CONFIG_OBJECT;

		return this._state;
	}


	/**
	 *
	 * @returns {number}
	 * @private
	 */
	_init() {

		if (this._state === SelectorCore._STATES.BINDED) {

			this._interface.render();
			this._state = SelectorCore._STATES.RUNNING;
		}

		return this._state;
	}


	init() {

		return this._init();
	}


	get id() {

		return this._instanceId;
	}


	get name() {

		return this._instanceName;
	}


	get state() {

		return this._state;
	}


	get parentManagerId() {

		return this._managerId;
	}


	enable() {


	}


	disable() {


	}


	update() {


	}


	/**
	 *
	 * @param target
	 */
	selectItems(target) {


	}


	/**
	 *
	 * @param target
	 */
	unselectItems(target) {


	}


	clear() {


	}


	destroy() {


	}


	/**
	 *
	 * @param code
	 */
	getErrorMsg(code) {

		// Do stuff
	}


	/**
	 *
	 * @param code
	 * @private
	 */
	_submitInterfaceError(code) {

		// this._interface.error(code);
	}
}