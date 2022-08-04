'use strict';


export class spyClass {


	static _dinamicMethods = {};
	static _staticMethods = {};
	static _request_q = 0;
	static _arguments = [];


	constructor() {

	}


	_requestControl(_class) {

		const _properties = this._getStaticClassProperties(_class);
		const _staticMethodsList = _properties[0];
		const _staticMethodsDescriptors = _properties[1];

		console.log('Observed object: ', _staticMethodsDescriptors);

		for (let item = 0; item < _staticMethodsList.length; item++) {

			let _tmpObj = _staticMethodsDescriptors[_staticMethodsList[item]];
			let _origCall = Function.prototype.call;

			(function () {
				Function.prototype.call = function () {

					// console.log(_tmpObj, _tmpArgs);
					// return _origCall.apply(this, arguments);
				};
			}());
		}
	}


	_getStaticClassProperties(instanceOfClass) {

		let _staticMethodsList = [];
		let _staticMethodsDescriptors = Object.getOwnPropertyDescriptors(instanceOfClass);
		let _tmpObj = {};

		// La forma de sacar los dos tipos de métodos es con la propiedad "enumerable"!
		// Todo: _getClassProperties

		for (_tmpObj in _staticMethodsDescriptors) {
			if (typeof (_staticMethodsDescriptors[_tmpObj].value) === 'function')
				_staticMethodsList.push(_tmpObj);
		}

		return [_staticMethodsList, _staticMethodsDescriptors];
	}
}
