'use strict';


import {v4 as uuidv4} from 'uuid';


export class UtilityClass {


	constructor() {

		UtilityClass.request_q = 0;
	}


	static print(msg, result) {

		let _tmpString = '[' + msg + ']';
		_tmpString += result;

		console.log(_tmpString);
	}


	static loadFromFile(path) {

		async function fetchData() {
			let _tmpData = await fetch(path)
				.then(response => response.json())
				.then((value) => {
					return value;
				});

			return _tmpData;
		}

		return fetchData();
	}


	static generateUuid() {

		return uuidv4();
	}
}