'use strict';


import {v4 as uuidv4} from 'uuid';


export class UtilityClass {


	static print(msg, ...result) {

		let _tmpMsg = [];

		_tmpMsg.push('[' + msg + ']');
		_tmpMsg.push(...result);

		console.log(_tmpMsg);
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