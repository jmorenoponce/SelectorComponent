'use strict';


import {v4 as uuidv4} from 'uuid';


export class UtilityClass {


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


	testEnumerableDinamicMethod() {

		// This method is created for listing properties comparison
	}
}