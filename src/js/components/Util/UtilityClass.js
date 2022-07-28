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

		const _properties = this._getClassProperties(_class);
		const _staticMethodsList = _properties[0];
		const _staticMethodsDescriptors = _properties[1];

		for (let item = 0; item < _staticMethodsList.length; item++) {

			let _tmpMethod = _staticMethodsDescriptors._staticMethods

			(function () {
				let _tmpCall = Function.prototype.call;

				Function.prototype.call = function () {

					console.log(this, arguments);

					return _tmpCall.apply(this, arguments);
				};
			}());
		}
	}


	_getClassProperties(instanceOfClass) {

		let _staticMethodsList = [];
		let _staticMethodsDescriptors = Object.getOwnPropertyDescriptors(instanceOfClass);
		let _tmpObj = {};

		for (_tmpObj in _staticMethodsDescriptors) {
			if (typeof (_staticMethodsDescriptors[_tmpObj].value) === 'function')
				_staticMethodsList.push(_tmpObj);
		}

		return [_staticMethodsList, _staticMethodsDescriptors];
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