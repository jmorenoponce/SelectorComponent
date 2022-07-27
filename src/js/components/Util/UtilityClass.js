'use strict';


import {v4 as uuidv4} from 'uuid';


export class UtilityClass {

	static _staticMethods = {};
	static _request_q = 0; // Some extra functionality for my learning process


	constructor() {

		this._requestControl(UtilityClass);
	}


	_requestControl(_class) {

		debugger

		const _tmpProperties = this._getClassProperties(_class);
		const _descriptors = _tmpProperties[0];
		const _staticMethods = _tmpProperties[1];

		for (let item = 0; item < _staticMethods.length; item++) {

			(function() {
				let _tmpCall = Function.prototype.call;

				Function.prototype.call = function () {
					console.log(this, arguments);
					return _tmpCall.apply(this, arguments);
				};
			}());
		}
	}


	_getClassProperties(instanceOfClass) {

		const _descriptors = Object.getOwnPropertyDescriptors(instanceOfClass);
		let _staticMethods = [];
		let _tmpObj = {};

		for (_tmpObj in _descriptors) {
			if (typeof (_descriptors[_tmpObj].value) === 'function')
				_staticMethods.push(_tmpObj);
		}

		return [_descriptors, _staticMethods];
	}


	testEnumerableDinamicMethod() {

		// This method is created for listing properties comparison
	}


	static print(msg, result) {

		let _tmpString = '[' + msg + ']';
		_tmpString += result;

		console.log(_tmpString);
	}


	static loadFromFile(path) {

		async function fetchData() {
			return await fetch(path)
				.then(response => response.json())
				.then((value) => {
					return value;
				});
		}

		return fetchData();
	}


	static generateUuid() {

		return uuidv4();
	}
}